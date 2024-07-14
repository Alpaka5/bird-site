from ninja import Router, ModelSchema, Schema
from birds.models import Bird

router = Router()


class BirdSchema(ModelSchema):
    class Meta:
        model = Bird
        exclude=["id"]

class Error(Schema):
    message: str

@router.get("/id/{bird_id}", response={"200": BirdSchema, 404: Error})
def get_bird_by_id(
    request,
    bird_id: int,
):
    try:
        return 200, Bird.objects.get(id=bird_id)
    except Bird.DoesNotExist:
        return 404, {"message": f"Bird with id: {bird_id} doesn't exist"}
