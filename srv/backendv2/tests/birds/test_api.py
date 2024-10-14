def test_update_db_with_birds_proper_excel_file(api_test_client):
    with open("tests/birds/test_birds_data.xlsx", "rb") as test_bird_data:

        response = api_test_client.post(
            "/birds/db/update",
            files={"file": ("test_birds_data.xlsx", test_bird_data, "xlsx")},
        )
    assert response.json() == {"message": "WORKED HELLA FINE"}


def test_get_bird_description_bird_exists(loaded_api_test_client):
    response = loaded_api_test_client.get("/birds/description/parus major/eng")
    assert True


def test_get_bird_description_bird_dont_exist(loaded_api_test_client):
    response = loaded_api_test_client.get("/birds/description/not existing bird/eng")
    assert True
