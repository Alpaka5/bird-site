"""
Contains decorator that enables model class to be registered in dictionary containing mapping of all models
"""

from django.db import models


def map_model_to_dict(mapping_dict: dict):
    def decorator(model: models.Model):

        mapping_dict.update({model.__name__.lower(): model})
        return model

    return decorator
