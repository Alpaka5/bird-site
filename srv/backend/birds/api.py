from urllib.request import Request

from ninja import Router, ModelSchema, Schema, File
from ninja.files import UploadedFile

import openpyxl

from birds.models import Bird


router = Router()


class BirdSchema(ModelSchema):
    class Meta:
        model = Bird
        fields="__all__"

class Error(Schema):
    message: str


@router.get("/id/{bird_id}", response={200: BirdSchema, 404: Error})
def get_bird_by_id(
    request,
    bird_id: int,
):
    try:
        return 200, Bird.objects.get(id=bird_id)
    except Bird.DoesNotExist:
        return 404, {"message": f"Bird with id: {bird_id} doesn't exist"}


class TempResponse(Schema):
    message: str


@router.post("/db/update")
def update_db_with_birds(
    request: Request,
    file: UploadedFile = File(...),
    response={200: TempResponse, 422: Error},
):
    if not file.name.endswith(".xlsx"):
        return 422, Error(message="Unsupported file format. Please upload a .xlsx file")

    workbook = openpyxl.load_workbook(file)

    return 200, TempResponse(message=f"{workbook.sheetnames}")
