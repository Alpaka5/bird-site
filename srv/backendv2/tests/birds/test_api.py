def test_update_db_with_birds_proper_excel_file(api_test_client):
    with open("tests/birds/test_birds_data.xlsx", "rb") as test_bird_data:

        response = api_test_client.post(
            "/birds/db/update",
            files={"file": ("test_birds_data.xlsx", test_bird_data, "xlsx")},
        )
    assert response.json() == {"message": "WORKED HELLA FINE"}
