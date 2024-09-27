import logging
import sys

pod_log_format = "%(asctime)s %(levelname)s - %(funcName)s: %(message)s"

endpoint_log_format = "%(asctime)s %(levelname)s - %(funcName)s: %(message)s"

logger = logging.getLogger(f"main_logger")
logger.setLevel(logging.INFO)

for handler in logger.handlers:
    handler.setFormatter(logging.Formatter(pod_log_format))
    handler.setLevel(logging.INFO)

stream_handler = logging.StreamHandler(sys.stdout)
stream_handler.setLevel(logging.INFO)
stream_handler.setFormatter(logging.Formatter(endpoint_log_format))
logger.addHandler(stream_handler)
logger.info("JAZDA")
