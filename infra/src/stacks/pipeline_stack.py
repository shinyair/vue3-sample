""" moudle of cicd pipeline cdk stack definition """
from aws_cdk import (
    Duration,
    Stack,
    RemovalPolicy,
    CfnCapabilities,
    aws_iam as iam,
    aws_s3 as s3,
    aws_codebuild as codebuild,
    aws_codepipeline as codepipeline,
    aws_codepipeline_actions as actions,
)
from constructs import Construct

from stacks.stack_context import (
    DEFAULT_STAGE,
    LoggerConfig,
    AwsEnvConfig,
    AppStackContext,
)
from logger.app_logger import AppLogger


CDK_VERSION = "2.158.0"


class PipelineSourceConfig():
    """ pipeline source configs """

    def __init__(self, connection_arn: str, owner: str, repository: str, branch: str):
        self.connection_arn = connection_arn
        self.owner = owner
        self.repository = repository
        self.branch = branch

    def __str__(self):
        return (
            "{"
            f"connection arn: {self.connection_arn}"
            f", owner: {self.owner}"
            f", repository: {self.repository}"
            f", branch: {self.branch}"
            "}"
        )


class PipelineStackContext(AppStackContext):
    """ context of pipeline stack """

    def __init__(
        self,
        name: str,
        stage: str,
        variant: str,
        logger_config: LoggerConfig,
        aws_env_config: AwsEnvConfig,
        pipeline_source_config: PipelineSourceConfig,
    ) -> None:
        super().__init__(name, stage, variant, logger_config, aws_env_config)
        self.pipeline_source_config = pipeline_source_config

    def __str__(self) -> str:
        return (
            "{"
            f"app stack context: {super().__str__()}"
            f", pipeline source config: {str(self.pipeline_source_config)}"
            "}"
        )


class PipelineStack(Stack):
    """
    pipeline stack
    https://docs.aws.amazon.com/cdk/v2/guide/deploy.html
    """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        stack_context: PipelineStackContext,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        if stack_context.stage is None or stack_context.stage == DEFAULT_STAGE:
            raise RuntimeError("not allowed to create pipelines for invalid stage")
        if stack_context.variant is not None and len(stack_context.variant) > 0:
            raise RuntimeError("not allowed to create personal pipelines")

        self.stack_context = stack_context
        self.logger = AppLogger(
            log_name=f"{stack_context.name}-pipeline-logger",
            min_log_level=stack_context.logger_config.min_level,
            log_format=stack_context.logger_config.log_format,
            log_file_name=stack_context.logger_config.output_file_name,
        )
        self.app_prefix = stack_context.get_app_prefix().lower()
        self.logger.info(str(stack_context))

        frontend_stack_name = f"{self.app_prefix}-frotnend-stack"
        pipeline_s3_artifact_bucket = s3.Bucket(
            self,
            f"{self.app_prefix}-s3-pipeline-artifact",
            bucket_name=f"{self.app_prefix}-s3-pipeline-artifact",
            auto_delete_objects=True,
            removal_policy=RemovalPolicy.DESTROY,
        )
        pipeline_role = self._pipeline_role()
        cloudformation_role = self._cloudformation_role()
        source_frontend_artifact, source_stage = self._source_stage(pipeline_role)
        build_frontend_artifact, build_stage = self._build_stage(
            frontend_stack_name,
            source_frontend_artifact,
            pipeline_role,
        )
        deploy_stage = self._deploy_stage(
            frontend_stack_name,
            build_frontend_artifact,
            cloudformation_role,
        )

        codepipeline.Pipeline(
            self,
            f"{self.app_prefix}-pipeline-build-deploy",
            pipeline_name=f"{self.app_prefix}-pipeline-build-deploy",
            pipeline_type=codepipeline.PipelineType.V1,
            restart_execution_on_update=False,
            cross_account_keys=False,
            artifact_bucket=pipeline_s3_artifact_bucket,
            stages=[
                source_stage,
                build_stage,
                deploy_stage,
            ],
            role=pipeline_role,
        )

    def _pipeline_role(self) -> iam.Role:
        role = iam.Role(
            self,
            f"{self.app_prefix}-role-pipeline",
            role_name=f"{self.app_prefix}-role-pipeline",
            assumed_by=iam.CompositePrincipal(
                iam.ServicePrincipal("codepipeline.amazonaws.com"),
                iam.ServicePrincipal("cloudformation.amazonaws.com"),
                iam.ServicePrincipal("codebuild.amazonaws.com"),
                iam.AccountPrincipal(self.stack_context.aws_env_config.account),
            ),
        )
        role.add_to_policy(iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=[
                "logs:*",
                "s3:*",
                "lambda:*",
                "codebuild:*",
                "cloudformation:*",
                "ssm:*",
                "codestar-connections:UseConnection",
                "iam:CreateRole",
                "iam:CreatePolicy",
                "iam:PutRolePolicy",
                "iam:AttachRolePolicy",
                "iam:DetachRolePolicy",
                "iam:DeleteRolePolicy",
                "iam:DeleteRole",
                "iam:PassRole",
                "iam:GetRole",
                "sts:AssumeRole",
            ],
            # TODO: limit resource
            resources=["*"]
        ))
        return role

    def _cloudformation_role(self) -> iam.Role:
        role = iam.Role(
            self,
            f"{self.app_prefix}-role-cloudformation",
            role_name=f"{self.app_prefix}-role-cloudformation",
            assumed_by=iam.CompositePrincipal(
                iam.ServicePrincipal("codepipeline.amazonaws.com"),
                iam.ServicePrincipal("cloudformation.amazonaws.com"),
                iam.AccountPrincipal(self.stack_context.aws_env_config.account),
            ),
        )
        # grant admin permission for cloudformation deployment
        role.add_to_policy(iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=["*"],
            resources=["*"]
        ))
        return role

    def _source_stage(self, pipeline_role: iam.Role) -> tuple[codepipeline.Artifact, codepipeline.StageOptions]:
        source_frontend_artifact = codepipeline.Artifact("SourceFrontendArtf")
        source_frontend_action = actions.CodeStarConnectionsSourceAction(
            action_name="LoadFrontend",
            connection_arn=self.stack_context.pipeline_source_config.connection_arn,
            output=source_frontend_artifact,
            owner=self.stack_context.pipeline_source_config.owner,
            repo=self.stack_context.pipeline_source_config.repository,
            branch=self.stack_context.pipeline_source_config.branch,
            trigger_on_push=False,
            role=pipeline_role,
        )
        source_stage = codepipeline.StageOptions(
            stage_name="Source",
            actions=[source_frontend_action],
        )
        return source_frontend_artifact, source_stage

    def _build_stage(
        self,
        frontend_stack_name: str,
        source_frontend_artifact: codepipeline.Artifact,
        pipeline_role: iam.Role,
    ) -> tuple[codepipeline.Artifact, codepipeline.StageOptions]:
        build_frontend_artifact = codepipeline.Artifact("BuildOutputFrontendArtifact")
        build_project_frontend = codebuild.PipelineProject(
            self,
            f"{self.app_prefix}-build-frontend",
            project_name=f"{self.app_prefix}-build-frontend",
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.STANDARD_5_0,
                compute_type=codebuild.ComputeType.SMALL,
            ),
            build_spec=codebuild.BuildSpec.from_source_filename("infra/buildspecs/build_frontend.yml"),
            timeout=Duration.minutes(20),
            queued_timeout=Duration.minutes(5),
            role=pipeline_role,
        )
        build_frontend_action = actions.CodeBuildAction(
            action_name="BuildFrontend",
            project=build_project_frontend,
            input=source_frontend_artifact,
            outputs=[build_frontend_artifact],
            environment_variables={
                "STAGE": codebuild.BuildEnvironmentVariable(
                    value=self.stack_context.stage,
                    type=codebuild.BuildEnvironmentVariableType.PLAINTEXT,
                ),
                "CDK_VERSION": codebuild.BuildEnvironmentVariable(
                    value=CDK_VERSION,
                    type=codebuild.BuildEnvironmentVariableType.PLAINTEXT,
                ),
                "FRONTEND_STACK_NAME": codebuild.BuildEnvironmentVariable(
                    value=frontend_stack_name,
                    type=codebuild.BuildEnvironmentVariableType.PLAINTEXT,
                ),
            },
            role=pipeline_role,
        )
        build_stage = codepipeline.StageOptions(
            stage_name="Build",
            actions=[build_frontend_action],
        )
        return build_frontend_artifact, build_stage

    def _deploy_stage(
        self,
        frontend_stack_name: str,
        build_frontend_artifact: codepipeline.Artifact,
        cloudformation_role: iam.Role,
    ) -> codepipeline.StageOptions:
        # need to upload assets before deploying the cloudformation stack by template
        # https://github.com/aws/aws-cdk/issues/18534
        # https://github.com/cdklabs/cdk-assets

        # TODO: deployment_role vs role?
        deploy_frontend_action = actions.CloudFormationCreateUpdateStackAction(
            action_name="DeployFrontend",
            stack_name=frontend_stack_name,
            template_path=build_frontend_artifact.at_path(f"infra/cdk.out/{frontend_stack_name}.template.json"),
            admin_permissions=False,
            cfn_capabilities=[CfnCapabilities.NAMED_IAM],
            deployment_role=cloudformation_role,
            role=cloudformation_role,
        )
        # need to delete the frontend stack before removing the frontend deployment action
        # delete_frontend_action = actions.CloudFormationDeleteStackAction(
        #     action_name="DeleteFrontend",
        #     stack_name=frontend_stack_name,
        #     admin_permissions=False,
        #     cfn_capabilities=[CfnCapabilities.NAMED_IAM],
        #     deployment_role=cloudformation_role,
        #     role=cloudformation_role,
        # )
        deploy_stage = codepipeline.StageOptions(
            stage_name="Deploy",
            actions=[deploy_frontend_action],
        )
        return deploy_stage
