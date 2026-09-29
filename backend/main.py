from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.analysis import router as analysis_router
from config import settings

app = FastAPI(title="GRAMSATHI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)

@app.on_event("startup")
async def startup_event():
    if settings.DEMO_MODE:
        print("Starting in DEMO MODE")
    else:
        print("Starting in LIVE MODE")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
