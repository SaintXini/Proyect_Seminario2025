from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Habilitar CORS para que React pueda acceder
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # O el puerto donde corre tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users/")
def get_users():
    return [
        {"id": 1, "name": "Ana", "email": "ana@mail.com"},
        {"id": 2, "name": "Luis", "email": "luis@mail.com"},
    ]

@app.get("/projects/")
def get_projects():
    return [
        {
            "title": "New Short Film",
            "date": "August 2025",
            "excerpt": "Shot in Iceland. Directed by Alex.",
            "image": "https://source.unsplash.com/800x450/?cinema"
        },
        {
            "title": "Commercial Campaign",
            "date": "July 2025",
            "excerpt": "Award-winning advertisement film.",
            "image": "https://source.unsplash.com/800x450/?fim"
        }
    ]
