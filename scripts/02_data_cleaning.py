import pandas as pd
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "city_day.csv"
OUTPUT_PATH = BASE_DIR / "data" / "city_day_clean.csv"

# Load dataset
df = pd.read_csv(DATA_PATH)

print("Original shape:", df.shape)

# -----------------------------
# 1. Drop rows where AQI is missing
# -----------------------------
df = df.dropna(subset=["AQI"])

# -----------------------------
# 2. Fill missing pollutant values with median
# -----------------------------
pollutants = [
    'PM2.5','PM10','NO','NO2','NOx','NH3',
    'CO','SO2','O3','Benzene','Toluene','Xylene'
]

for col in pollutants:
    if col in df.columns:
        df[col] = df[col].fillna(df[col].median())

# -----------------------------
# 3. Convert Date to datetime
# -----------------------------
df["Date"] = pd.to_datetime(df["Date"])

# -----------------------------
# 4. Create time-based features
# -----------------------------
df["Day"] = df["Date"].dt.day
df["Month"] = df["Date"].dt.month
df["Year"] = df["Date"].dt.year
df["DayOfWeek"] = df["Date"].dt.dayofweek

# -----------------------------
# 5. Drop unused columns
# -----------------------------
df = df.drop(columns=["AQI_Bucket"])

print("Cleaned shape:", df.shape)

# -----------------------------
# 6. Save cleaned dataset
# -----------------------------
df.to_csv(OUTPUT_PATH, index=False)

print("Cleaned dataset saved at:", OUTPUT_PATH)
