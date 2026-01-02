from pydantic import BaseModel

class AQIInput(BaseModel):
    PM2_5: float
    PM10: float
    NO2: float
    SO2: float
    CO: float
    O3: float
    Day: int
    Month: int
    Year: int
    DayOfWeek: int
    PIS: float


class AQIOutput(BaseModel):
    predicted_aqi: float
    aqi_bucket: str
