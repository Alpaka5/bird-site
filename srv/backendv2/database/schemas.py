from pydantic import BaseModel


class Bird(BaseModel):
    latin_name: str
    length_min_mm: int
    length_max_mm: int
    weight_min_g: float
    weight_max_g: float
    family: str

    class Config:
        from_attributes = True


class BirdTextField(BaseModel):
    bird: str
    language: str
    description: str

    class Config:
        from_attributes = True
