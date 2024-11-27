from database import crud, schemas
from database import users_crud


def test_get_all_birds_names(loaded_db):
    names = crud.get_all_birds_names(loaded_db)
    assert True


def test_get_user_by_id(loaded_db):
    user = users_crud.get_user_by_id(loaded_db, 1)

    assert True


def test_add_bird(loaded_db):
    bird_added = schemas.Bird(
        latin_name="test bird",
        length_min_mm=1,
        length_max_mm=2,
        weight_min_g=1,
        weight_max_g=2,
        family="paridae",
    )

    result = crud.add_bird(loaded_db,
                           bird_added,)