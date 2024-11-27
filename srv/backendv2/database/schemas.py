import json

from fastapi import UploadFile
from pydantic import BaseModel, model_validator
import datetime as dt


class Bird(BaseModel):
    latin_name: str
    length_min_mm: int
    length_max_mm: int
    weight_min_g: float
    weight_max_g: float
    family: str

    class Config:
        from_attributes = True


class BirdUpload(Bird):
    @model_validator(mode="before")
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class BirdDetailed(Bird):
    order: str
    suborder: str
    tags: list[str]
    winning_bird: bool

    class Config:
        from_attributes = True


class BirdTextField(BaseModel):
    bird: str
    language: str
    description: str

    class Config:
        from_attributes = True


class _UserBase(BaseModel):
    email: str
    username: str


class UserCreate(_UserBase):

    hashed_password: str

    class Config:
        from_attributes = True


class User(_UserBase):
    id: int

    class Config:
        from_attributes = True


class UserWithRoles(User):
    user_roles: list[dict]


class _LeadBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    company: str
    note: str


class LeadCreate(_LeadBase):
    pass


class Lead(_LeadBase):
    id: int
    owner_id: int
    date_created: dt.datetime
    date_last_updated: dt.datetime

    class Config:
        from_attributes = True
