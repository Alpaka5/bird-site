from pydantic import BaseModel
from database.schemas import BirdDetailed


class BirdQuizAnswer(BaseModel):
    birds: list[BirdDetailed]
    correct_bird: str
