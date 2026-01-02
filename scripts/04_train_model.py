import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# -------------------------------------------------
# Paths
# -------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "city_day_features.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_PATH = MODEL_DIR / "rf_aqi_model.pkl"
FEATURES_PATH = MODEL_DIR / "feature_names.pkl"

# Create models folder if it doesn't exist
MODEL_DIR.mkdir(exist_ok=True)

# -------------------------------------------------
# Load dataset
# -------------------------------------------------
df = pd.read_csv(DATA_PATH)

# -------------------------------------------------
# Feature selection (EXPLICIT & FIXED)
# -------------------------------------------------
FEATURES = [
    'PM2.5',
    'PM10',
    'NO2',
    'SO2',
    'CO',
    'O3',
    'Day',
    'Month',
    'Year',
    'DayOfWeek',
    'PIS'
]

X = df[FEATURES]
y = df['AQI']

# -------------------------------------------------
# Train-test split
# -------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -------------------------------------------------
# Train Random Forest Model
# -------------------------------------------------
model = RandomForestRegressor(
    n_estimators=200,
    max_depth=20,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# -------------------------------------------------
# Model Evaluation
# -------------------------------------------------
y_pred = model.predict(X_test)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("\nModel Evaluation:")
print(f"RMSE: {rmse:.4f}")
print(f"R2 Score: {r2:.4f}")

# -------------------------------------------------
# Save model & feature metadata
# -------------------------------------------------
joblib.dump(model, MODEL_PATH)
joblib.dump(FEATURES, FEATURES_PATH)

print("\nArtifacts Saved Successfully:")
print("Model path:", MODEL_PATH)
print("Feature names path:", FEATURES_PATH)
