import aws_cdk as core
import aws_cdk.assertions as assertions

from src.stacks.frontend_stack import CertificateConfig, FrontendStackContext, FrontendStack
from src.stacks.stack_context import LoggerConfig, AwsEnvConfig

# example tests. To run these tests, uncomment this file along with the example
# resource in src/infra_stack.py


def test_sqs_queue_created():
    app = core.App()
    stack = FrontendStack(app, "infra", FrontendStackContext(
        name="teststack",
        stage="dev",
        variant=None,
        logger_config=LoggerConfig(),
        aws_env_config=AwsEnvConfig(),
        certificate_config=CertificateConfig(
            certificate_arn="arn:aws:acm:us-east-1:123412341234:certificate/12345678-1234-1234-1234-123456781234",
            certificate_domain_name="aa.test.com",
        ),
    ))
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
