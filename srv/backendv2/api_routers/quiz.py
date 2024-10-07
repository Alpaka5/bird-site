from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database.database import get_db

from engine.quiz.quiz import QuizGame


router = APIRouter(prefix="/quiz")


@router.get("/game")
def get_quiz_game(db: Session = Depends(get_db)):
    quiz_game = QuizGame(db=db)
    return quiz_game.get_quiz_game()
