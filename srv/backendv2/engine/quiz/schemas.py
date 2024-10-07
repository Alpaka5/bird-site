from pydantic import BaseModel
from database.schemas import BirdDetailed


class BirdQuizAnswer(BaseModel):
    bird: BirdDetailed
    correct_bird: bool
