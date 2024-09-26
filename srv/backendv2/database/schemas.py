from pydantic import BaseModel


class Bird(BaseModel):
    latin_name: str
    length_min_mm: int
    length_max_mm: int
    weight_min_g: int
    weight_max_g: int
    family: str

    class Config:
        from_attributes = True
