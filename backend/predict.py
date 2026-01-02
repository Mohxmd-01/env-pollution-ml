import os
import joblib
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "models", "rf_aqi_model.pkl")
FEATURES_PATH = os.path.join(BASE_DIR, "models", "feature_names.pkl")

model = joblib.load(MODEL_PATH)
feature_names = joblib.load(FEATURES_PATH)

FEATURE_MAP = {
    "PM2_5": "PM2.5",
    "PM10": "PM10",
    "NO2": "NO2",
    "SO2": "SO2",
    "CO": "CO",
    "O3": "O3",
    "Day": "Day",
    "Month": "Month",
    "Year": "Year",
    "DayOfWeek": "DayOfWeek",
    "PIS": "PIS"
}

def predict_aqi(input_data: dict):
    aligned_input = {
        FEATURE_MAP[k]: v
        for k, v in input_data.items()
        if k in FEATURE_MAP
    }

    df = pd.DataFrame([aligned_input], columns=feature_names)

    prediction = model.predict(df)[0]

    if prediction <= 50:
        bucket = "Good"
    elif prediction <= 100:
        bucket = "Satisfactory"
    elif prediction <= 200:
        bucket = "Moderate"
    elif prediction <= 300:
        bucket = "Poor"
    elif prediction <= 400:
        bucket = "Very Poor"
    else:
        bucket = "Severe"

    return {
        "predicted_aqi": round(float(prediction), 2),
        "aqi_bucket": bucket
    }
