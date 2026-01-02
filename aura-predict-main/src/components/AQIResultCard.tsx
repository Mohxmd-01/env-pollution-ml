import { Card, CardContent } from "@/components/ui/card";

interface AQIResult {
  predicted_aqi: number;
  aqi_bucket: string;
}

interface AQIResultCardProps {
  result: AQIResult;
}

function getAQIColor(bucket: string): string {
  const lowerBucket = bucket.toLowerCase();
  
  if (lowerBucket.includes("good")) return "text-aqi-good";
  if (lowerBucket.includes("satisfactory")) return "text-aqi-satisfactory";
  if (lowerBucket.includes("moderate")) return "text-aqi-moderate";
  if (lowerBucket.includes("poor") && !lowerBucket.includes("very")) return "text-aqi-poor";
  if (lowerBucket.includes("very poor")) return "text-aqi-very-poor";
  if (lowerBucket.includes("severe")) return "text-aqi-severe";
  
  return "text-foreground";
}

function getAQIBgColor(bucket: string): string {
  const lowerBucket = bucket.toLowerCase();
  
  if (lowerBucket.includes("good")) return "bg-aqi-good/10";
  if (lowerBucket.includes("satisfactory")) return "bg-aqi-satisfactory/10";
  if (lowerBucket.includes("moderate")) return "bg-aqi-moderate/10";
  if (lowerBucket.includes("poor") && !lowerBucket.includes("very")) return "bg-aqi-poor/10";
  if (lowerBucket.includes("very poor")) return "bg-aqi-very-poor/10";
  if (lowerBucket.includes("severe")) return "bg-aqi-severe/10";
  
  return "bg-muted";
}

export function AQIResultCard({ result }: AQIResultCardProps) {
  const colorClass = getAQIColor(result.aqi_bucket);
  const bgColorClass = getAQIBgColor(result.aqi_bucket);

  return (
    <Card className={`card-glow border-0 ${bgColorClass}`}>
      <CardContent className="pt-6 pb-6">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Predicted AQI
          </p>
          <p className={`text-6xl font-bold ${colorClass}`}>
            {Math.round(result.predicted_aqi)}
          </p>
          <p className={`text-xl font-medium ${colorClass}`}>
            {result.aqi_bucket}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
