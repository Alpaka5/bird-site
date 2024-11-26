from database import crud
from database import users_crud


def test_get_all_birds_names(loaded_db):
    names = crud.get_all_birds_names(loaded_db)
    assert True


def test_get_user_by_id(loaded_db):
    user = users_crud.get_user_by_id(loaded_db, 1)

    assert True
