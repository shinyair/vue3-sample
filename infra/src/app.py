#!/usr/bin/env python3
# disable pylint duplicate-code
# pylint: disable=R0801

""" entrypoint of cdk """
import aws_cdk as cdk

from utils.env import get_env_or_default
from stacks.stack_context import build_app_stack_context
from stacks.frontend_stack import (
    CertificateConfig,
    FrontendStackContext,
    FrontendStack
)

ENV_SSL_CERTIFICATE_ARN = "SSL_CERTIFICATE_ARN"
ENV_SSL_CERTIFICATE_DOMAIN_NAME = "SSL_CERTIFICATE_DOMAIN_NAME"


app_context = build_app_stack_context()
stack_name = f"{app_context.get_app_prefix().lower()}-frotnend-stack"
stack_context = FrontendStackContext(
    name=app_context.name,
    stage=app_context.stage,
    variant=app_context.variant,
    logger_config=app_context.logger_config,
    aws_env_config=app_context.aws_env_config,
    certificate_config=CertificateConfig(
        certificate_arn=get_env_or_default(ENV_SSL_CERTIFICATE_ARN),
        certificate_domain_name=get_env_or_default(ENV_SSL_CERTIFICATE_DOMAIN_NAME),
    )
)
app = cdk.App()
FrontendStack(
    app,
    stack_name,
    stack_context,
    stack_name=stack_name,
    # For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
    env=cdk.Environment(
        account=app_context.aws_env_config.account,
        region=app_context.aws_env_config.region,
    ),
)
app.synth()
