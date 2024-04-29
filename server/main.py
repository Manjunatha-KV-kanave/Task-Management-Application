from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import task_routes
from utils.database import init_db

app = FastAPI()

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin (you can specify specific origins if needed)
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Specify the HTTP methods allowed
    allow_headers=["*"],  # Allow any headers
)

app.include_router(task_routes.router)

@app.on_event("startup")
async def startup_db():
    init_db()
