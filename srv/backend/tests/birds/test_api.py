from unittest import mock

import openpyxl
import pytest
from birds.api import update_db_with_birds, UpdateResponse


@pytest.mark.django_db
def test_update_db_with_birds_proper_excel_file():
    with open("tests/birds/test_birds_data.xlsx", "rb") as test_bird_data:
        workbook: openpyxl.Workbook = openpyxl.load_workbook(test_bird_data)
        response = update_db_with_birds(request=mock.MagicMock(), file=test_bird_data)

    assert response == (
        200,
        UpdateResponse(message="Excel file was uploaded successfully!"),
    )
