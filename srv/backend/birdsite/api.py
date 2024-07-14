from ninja import NinjaAPI
from quiz.api import router as quiz_router
from birds.api import router as bird_router

api = NinjaAPI(version="1.0.0")

api.add_router("/quiz/", quiz_router)
api.add_router("/birds/", bird_router)
