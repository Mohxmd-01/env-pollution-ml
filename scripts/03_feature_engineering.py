import pandas as pd
from pathlib import Path
from sklearn.preprocessing import MinMaxScaler

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "city_day_clean.csv"
OUTPUT_PATH = BASE_DIR / "data" / "city_day_features.csv"

# Load cleaned data
df = pd.read_csv(DATA_PATH)

print("Loaded cleaned data:", df.shape)

# -----------------------------
# Pollution Impact Score (PIS)
# -----------------------------
pollutants = ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3']
weights = {
    'PM2.5': 0.30,
    'PM10': 0.20,
    'NO2': 0.15,
    'SO2': 0.10,
    'CO': 0.15,
    'O3': 0.10
}

# Normalize pollutant values
scaler = MinMaxScaler()
df[pollutants] = scaler.fit_transform(df[pollutants])

# Compute Pollution Impact Score
df["PIS"] = sum(df[p] * weights[p] for p in pollutants)

# Save feature-engineered data
df.to_csv(OUTPUT_PATH, index=False)

print("Feature engineering completed")
print("Final dataset shape:", df.shape)
print("Saved at:", OUTPUT_PATH)
