from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from database.database import engine
from database import models
from api_routers import birds, quiz, users

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(birds.router)
app.include_router(quiz.router)
app.include_router(users.router)

# Dependency
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}
