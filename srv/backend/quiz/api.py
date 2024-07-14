from ninja import Router, Schema

router = Router()

class HelloSchema(Schema):
    name: str = "world"


@router.post("/hello")
def hello(request, data: HelloSchema):
    return f"Hello {data.name}!"


@router.get("/math/{a}and{b}")
def math(request, a: int, b: int):
    return {"add": a + b, "multiply": a * b}


class UserSchema(Schema):
    username: str
    is_authenticated: bool
    email: str = None
    first_name: str = None
    last_name: str = None


class Error(Schema):
    message: str


@router.get("/me", response={"200": UserSchema, 403: Error})
def me(request):
    if not request.user.is_authenticated:
        return 403, {"message": "Not authenticated, sign first!"}
    return request.user
