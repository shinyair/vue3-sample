""" moudle of logger """
import logging
import traceback

from .sensitive_formatter import SensitiveFormatter


class AppLogger():
    """ logger with levels and trace """

    def __init__(
        self,
        log_name: str,
        min_log_level: str = "info",
        log_format: str = "%(asctime)s - %(name)s - %(levelname)s %(message)s",
        log_file_name: str = None,
    ) -> None:
        self.logger = logging.getLogger(name=log_name)
        if min_log_level == "DEBUG":
            self.logger.setLevel(logging.DEBUG)
        elif min_log_level == "INFO":
            self.logger.setLevel(logging.INFO)
        elif min_log_level == "WARNING":
            self.logger.setLevel(logging.WARNING)
        elif min_log_level == "ERROR":
            self.logger.setLevel(logging.ERROR)
        else:
            self.logger.setLevel(logging.INFO)
        # output formatter
        formatter = SensitiveFormatter(fmt=log_format)
        # stream output
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        self.logger.addHandler(stream_handler)
        # file output
        if log_file_name is not None and len(log_file_name) > 0:
            file_handler = logging.FileHandler(filename=log_file_name, mode="w", encoding="utf-8")
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)

    def debug(self, msg: str):
        """
        Args:
            msg (str): message
        """
        self.logger.debug(msg)

    def info(self, msg: str):
        """
        Args:
            msg (str): message
        """
        self.logger.info(msg)

    def warning(self, msg: str):
        """
        Args:
            msg (str): message
        """
        self.logger.warning(msg)

    def error(self, msg: str):
        """
        Args:
            msg (str): message
        """
        self.logger.error(msg)
        self.logger.error(traceback.format_exc())

    def critial(self, msg: str):
        """
        Args:
            msg (str): message
        """
        self.logger.critical(msg)
        self.logger.error(traceback.format_exc())
