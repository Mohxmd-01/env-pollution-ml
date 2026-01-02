import { useState } from "react";
import type { AQIFormData } from "@/components/AQIPredictionForm";

interface AQIResult {
  predicted_aqi: number;
  aqi_bucket: string;
}

interface UseAQIPredictionReturn {
  result: AQIResult | null;
  isLoading: boolean;
  error: string | null;
  predict: (data: AQIFormData) => Promise<void>;
  reset: () => void;
}

const API_URL = "http://localhost:8000/predict";


export function useAQIPrediction(): UseAQIPredictionReturn {
  const [result, setResult] = useState<AQIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = async (data: AQIFormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.status} ${response.statusText}`);
      }

      const responseData: AQIResult = await response.json();
      setResult(responseData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { result, isLoading, error, predict, reset };
}
