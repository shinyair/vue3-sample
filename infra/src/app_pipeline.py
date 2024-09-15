#!/usr/bin/env python3
# disable pylint duplicate-code
# pylint: disable=R0801

""" entrypoint of cdk """
import aws_cdk as cdk

from utils.env import get_env_or_default
from stacks.stack_context import build_app_stack_context
from stacks.pipeline_stack import (
    PipelineSourceConfig,
    PipelineStackContext,
    PipelineStack
)


ENV_PIPELINE_CONNECTION_ARN = "PIPELINE_CONNECTION_ARN"
ENV_PIPELINE_CONNECTION_OWNER = "PIPELINE_CONNECTION_OWNER"
ENV_PIPELINE_CONNECTION_REPOSITORY = "PIPELINE_CONNECTION_REPOSITORY"
ENV_PIPELINE_CONNECTION_BRANCH = "PIPELINE_CONNECTION_BRANCH"

app_stack_context = build_app_stack_context()
stack_name = f"{app_stack_context.get_app_prefix().lower()}-pipeline-stack"
stack_context = PipelineStackContext(
    name=app_stack_context.name,
    stage=app_stack_context.stage,
    variant=app_stack_context.variant,
    logger_config=app_stack_context.logger_config,
    aws_env_config=app_stack_context.aws_env_config,
    pipeline_source_config=PipelineSourceConfig(
        connection_arn=get_env_or_default(ENV_PIPELINE_CONNECTION_ARN),
        owner=get_env_or_default(ENV_PIPELINE_CONNECTION_OWNER),
        repository=get_env_or_default(ENV_PIPELINE_CONNECTION_REPOSITORY),
        branch=get_env_or_default(ENV_PIPELINE_CONNECTION_BRANCH),
    ),
)
app = cdk.App()
PipelineStack(
    app,
    stack_name,
    stack_context,
    stack_name=stack_name,
    # For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
    env=cdk.Environment(
        account=stack_context.aws_env_config.account,
        region=stack_context.aws_env_config.region,
    ),
)
app.synth()
