from pytest import fixture

from engine.quiz.quiz import QuizGame


@fixture(scope="session")
def quiz_game(loaded_db):
    return QuizGame(db=loaded_db)
