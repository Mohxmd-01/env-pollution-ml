import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "city_day.csv"

print("Looking for file at:", DATA_PATH)

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully")
print("Shape:", df.shape)
print("\nColumns:")
print(df.columns)
print("\nMissing values:")
print(df.isna().sum())
print("\nFirst 5 rows:")
print(df.head())
