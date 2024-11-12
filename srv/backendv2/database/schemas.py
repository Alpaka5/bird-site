from pydantic import BaseModel
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
