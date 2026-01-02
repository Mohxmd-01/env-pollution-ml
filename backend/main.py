from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import AQIInput, AQIOutput
from predict import predict_aqi

app = FastAPI(
    title="AQI Prediction API",
    description="ML-powered Air Quality Index Prediction",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AQI Prediction API is running"}

@app.post("/predict", response_model=AQIOutput)
def predict_endpoint(data: AQIInput):
    return predict_aqi(data.model_dump())
