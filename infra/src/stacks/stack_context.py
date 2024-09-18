""" moudle of common stack context """
import os

from dotenv import load_dotenv
from utils.env import get_env_or_default


ENV_APP_NAME = "APP_NAME"
ENV_APP_STAGE = "STAGE"
ENV_APP_VARIANT = "VARIANT"
ENV_APP_LOG_FORMAT = "LOGGER_FORMAT"
ENV_APP_LOG_MIN_LEVEL = "LOGGER_MIN_LEVEL"
ENV_APP_LOG_FILE_NAME = "LOGGER_OUTPUT_FILE_NAME"
ENV_AWS_ACCOUNT = "AWS_ACCOUNT"
ENV_AWS_REGION = "AWS_REGION"
ENV_AWS_CDK_DEFAULT_ACCOUNT = "CDK_DEFAULT_ACCOUNT"
ENV_AWS_CDK_DEFAULT_REGION = "CDK_DEFAULT_REGION"

DEFAULT_STAGE = "local"


class LoggerConfig():
    """ logger configs """

    def __init__(
        self,
        log_format: str = None,
        min_level: str = None,
        output_file_name: str = None,
    ) -> None:
        self.log_format = log_format
        self.min_level = min_level
        self.output_file_name = output_file_name

    def __str__(self) -> str:
        return (
            "{"
            f"min level: {self.min_level}"
            f", output file name: {self.output_file_name}"
            "}"
        )


class AwsEnvConfig():
    """ aws environment configs """

    def __init__(self, account: str = None, region: str = None) -> None:
        self.account = account
        self.region = region

    def __str__(self) -> str:
        return (
            "{"
            f"account: {self.account}"
            f", region: {self.region}"
            "}"
        )


class AppStackContext():
    """ Stack Context of Common App """

    def __init__(
        self,
        name: str,
        stage: str,
        variant: str = None,
        logger_config: LoggerConfig = None,
        aws_env_config: AwsEnvConfig = None,
    ) -> None:
        self.name = name
        self.stage = stage
        self.variant = variant if variant is not None else ""
        self.logger_config = logger_config if logger_config is not None else LoggerConfig()
        self.aws_env_config = aws_env_config if aws_env_config is not None else AwsEnvConfig()

    def __str__(self) -> str:
        return (
            "{"
            f"name: {self.name}"
            f", stage: {self.stage}"
            f", variant: {self.variant}"
            f", log config: {str(self.logger_config)}"
            f", aws env config: {str(self.aws_env_config)}"
            "}"
        )

    def get_app_prefix(self) -> str:
        """ get app context prefix

        Returns:
            str: app context prefix
        """
        return f"{self.name}-{self.stage}-{self.variant}"


def build_app_stack_context() -> AppStackContext:
    """ build common app stack context """
    # load .env file by stage
    env_file_path = os.path.abspath(os.path.join(__file__, "../../../"))
    env_file_name = ".env"
    app_stage = get_env_or_default(ENV_APP_STAGE, DEFAULT_STAGE)
    if app_stage == DEFAULT_STAGE:
        env_file_fullname = f"{env_file_path}/{env_file_name}"
    else:
        env_file_fullname = f"{env_file_path}/{env_file_name}.{app_stage}"
    env_local_file_fullname = f"{env_file_fullname}.local"
    has_env_file = os.path.isfile(env_file_fullname)
    has_env_local_file = os.path.isfile(env_local_file_fullname)
    if not has_env_file and not has_env_local_file:
        raise RuntimeError(f".env file not found for stage: {app_stage}")
    if has_env_file:
        load_dotenv(env_file_fullname)
    if has_env_local_file:
        load_dotenv(env_local_file_fullname, override=True)
    # build context
    logger_config = LoggerConfig(
        log_format=get_env_or_default(ENV_APP_LOG_FORMAT),
        min_level=get_env_or_default(ENV_APP_LOG_MIN_LEVEL),
        output_file_name=get_env_or_default(ENV_APP_LOG_FILE_NAME),
    )
    aws_cli_account = get_env_or_default(ENV_AWS_CDK_DEFAULT_ACCOUNT)
    aws_cli_region = get_env_or_default(ENV_AWS_CDK_DEFAULT_REGION)
    aws_env_config = AwsEnvConfig(
        account=get_env_or_default(ENV_AWS_ACCOUNT, aws_cli_account),
        region=get_env_or_default(ENV_AWS_REGION, aws_cli_region),
    )
    return AppStackContext(
        name=get_env_or_default(ENV_APP_NAME),
        stage=get_env_or_default(ENV_APP_STAGE, app_stage),
        variant=get_env_or_default(ENV_APP_VARIANT),
        logger_config=logger_config,
        aws_env_config=aws_env_config,
    )
