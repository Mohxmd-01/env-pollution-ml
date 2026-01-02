import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AQIPredictionForm } from "@/components/AQIPredictionForm";
import { AQIResultCard } from "@/components/AQIResultCard";
import { useAQIPrediction } from "@/hooks/useAQIPrediction";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const { result, isLoading, error, predict } = useAQIPrediction();

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Card */}
        <Card className="card-glow border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-foreground">
              Air Quality Index Predictor
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <AQIPredictionForm onSubmit={predict} isLoading={isLoading} />
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="border-destructive/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Result Card */}
        {result && <AQIResultCard result={result} />}
      </div>
    </div>
  );
};

export default Index;
