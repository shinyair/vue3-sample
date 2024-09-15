""" moudle of env var utils """
import os


def get_env_or_default(env_name: str, default_value: str = None) -> str:
    """ get environment variable or default value

    Args:
        env_name (str): environment variable name
        default_value (str, optional): default value of environment variable. Defaults to "".

    Returns:
        str: environment variable value or default value
    """
    env_value = os.getenv(env_name)
    if env_value is None or len(env_value) == 0:
        return default_value
    return env_value
