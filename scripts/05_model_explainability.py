import joblib
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "rf_aqi_model.pkl"
FEATURES_PATH = BASE_DIR / "models" / "feature_names.pkl"

# -----------------------------
# Load model & features
# -----------------------------
model = joblib.load(MODEL_PATH)
feature_names = joblib.load(FEATURES_PATH)

# -----------------------------
# Feature Importance
# -----------------------------
importances = model.feature_importances_

importance_df = pd.DataFrame({
    "Feature": feature_names,
    "Importance": importances
}).sort_values(by="Importance", ascending=False)

print("\nTop 10 Important Features:")
print(importance_df.head(10))

# -----------------------------
# Plot
# -----------------------------
plt.figure(figsize=(10, 6))
plt.barh(
    importance_df["Feature"].head(10),
    importance_df["Importance"].head(10)
)
plt.gca().invert_yaxis()
plt.title("Top 10 AQI Influencing Features")
plt.xlabel("Importance Score")
plt.tight_layout()
plt.show()
