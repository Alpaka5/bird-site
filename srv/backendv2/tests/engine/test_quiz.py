from unittest import mock
import random


def test_choose_random_bird_returns_proper_bird(quiz_game, monkeypatch):
    def mock_random_choice(birds_list):
        return birds_list[0]

    monkeypatch.setattr(random, "choice", mock_random_choice)
    assert (
        quiz_game.choose_random_correct_bird().bird.latin_name == "aegithalos caudatus"
    )


def test_get_quiz_game(quiz_game):
    quiz_game = quiz_game.get_quiz_game()
    assert True
