from pydantic import BaseModel
from database.schemas import BirdDetailed


class BirdQuizAnswer(BaseModel):
    bird: BirdDetailed
    image: bytes
    sound: bytes
    correct_bird: bool
