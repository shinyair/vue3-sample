""" moudle of frontend cdk stack definition """
import os
from aws_cdk import (
    Stack,
    RemovalPolicy,
    aws_s3 as s3,
    aws_s3_deployment as s3deploy,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_certificatemanager as certificate,
)
from constructs import Construct

from stacks.stack_context import (
    LoggerConfig,
    AwsEnvConfig,
    AppStackContext,
)
from logger.app_logger import AppLogger


class CertificateConfig():
    """ SSL Certificate Configs """

    def __init__(self, certificate_arn: str, certificate_domain_name: str):
        self.certificate_arn = certificate_arn
        self.certificate_domain_name = certificate_domain_name

    def __str__(self) -> str:
        return (
            "{"
            f"certificate arn: {self.certificate_arn}"
            f", certificate domain name: {self.certificate_domain_name}"
            "}"
        )


class FrontendStackContext(AppStackContext):
    """ Context of Frontend Stack """

    def __init__(
        self,
        name: str,
        stage: str,
        variant: str,
        logger_config: LoggerConfig,
        aws_env_config: AwsEnvConfig,
        certificate_config: CertificateConfig,
    ) -> None:
        super().__init__(name, stage, variant, logger_config, aws_env_config)
        self.certificate_config = certificate_config
        self.working_dir = os.getcwd()

    def __str__(self) -> str:
        return (
            "{"
            f"app stack context: {super().__str__()}"
            f", ssl certificate config: {str(self.certificate_config)}"
            "}"
        )

    def get_infra_project_dir(self) -> str:
        """ get the root folder path of the infra project

        Raises:
            RuntimeError: infra project not found

        Returns:
            str: path of infra project root folder
        """
        current_dir = self.working_dir
        current_dir_name = os.path.basename(current_dir)
        while current_dir_name != "infra":
            parent_dir = os.path.dirname(current_dir)
            if parent_dir == current_dir:
                raise RuntimeError("cannot find infra project folder")
            current_dir = parent_dir
            current_dir_name = os.path.basename(current_dir)
        return current_dir


class FrontendStack(Stack):
    """ Frontend Stack """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        stack_context: FrontendStackContext,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        logger = AppLogger(
            log_name=f"{stack_context.name}-frontend-logger",
            min_log_level=stack_context.logger_config.min_level,
            log_format=stack_context.logger_config.log_format,
            log_file_name=stack_context.logger_config.output_file_name,
        )

        logger.info(str(stack_context))

        app_prefix = stack_context.get_app_prefix().lower()
        infra_dir = stack_context.get_infra_project_dir()
        root_dir = os.path.dirname(infra_dir)

        ssl_certificate_arn = stack_context.certificate_config.certificate_arn
        ssl_certificate_domain_name = stack_context.certificate_config.certificate_domain_name

        if ssl_certificate_arn is None \
                or len(ssl_certificate_arn) == 0 \
                or ssl_certificate_domain_name is None \
                or len(ssl_certificate_domain_name) == 0:
            raise RuntimeError("invalid ssl certificate values")

        # will auto create a role for deleting files in the s3 bucket and s3 bucket itself
        website_bucket = s3.Bucket(
            self,
            f"{app_prefix}-s3-website",
            bucket_name=f"{app_prefix}-v3s",
            website_index_document="index.html",
            website_error_document="index.html",
            public_read_access=True,
            block_public_access=s3.BlockPublicAccess(
                block_public_acls=False,
                block_public_policy=False,
                ignore_public_acls=False,
                restrict_public_buckets=False,
            ),
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True,
        )
        # will auto create a role to manage s3 website bucket deployment
        s3deploy.BucketDeployment(
            self,
            f"{app_prefix}-s3deploy-website",
            sources=[s3deploy.Source.asset(f"{root_dir}/dist")],
            destination_bucket=website_bucket,
        )

        cloudfront.Distribution(
            self,
            f"{app_prefix}-distribution",
            certificate=certificate.Certificate.from_certificate_arn(
                self,
                f"{app_prefix}-distribution-certificate",
                certificate_arn=ssl_certificate_arn,
            ),
            domain_names=[ssl_certificate_domain_name],
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.HttpOrigin(
                    domain_name=website_bucket.bucket_domain_name,
                    origin_id="s3staticwebsite",
                    protocol_policy=cloudfront.OriginProtocolPolicy.HTTP_ONLY,
                ),
                allowed_methods=cloudfront.AllowedMethods.ALLOW_ALL,
                cache_policy=cloudfront.CachePolicy.CACHING_DISABLED,
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            ),
        )
