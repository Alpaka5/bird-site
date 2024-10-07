from database import crud


def test_get_all_birds_names(loaded_db):
    names = crud.get_all_birds_names(loaded_db)
    assert True
