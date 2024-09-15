""" moudle of sensitive fomatter """
import logging


class SensitiveFormatter(logging.Formatter):
    """ formatter that removes sensitive information in log """

    @staticmethod
    def _filter(msg: str) -> str:
        # TODO:
        return msg

    def format(self, record: logging.LogRecord) -> str:
        original = logging.Formatter.format(self, record)
        return self._filter(original)
