import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  PM2_5: z.coerce.number().min(0, "Min 0").max(500, "Max 500"),
  PM10: z.coerce.number().min(0, "Min 0").max(600, "Max 600"),
  NO2: z.coerce.number().min(0, "Min 0").max(400, "Max 400"),
  SO2: z.coerce.number().min(0, "Min 0").max(500, "Max 500"),
  CO: z.coerce.number().min(0, "Min 0").max(50, "Max 50"),
  O3: z.coerce.number().min(0, "Min 0").max(500, "Max 500"),
  Day: z.coerce.number().min(1, "Min 1").max(31, "Max 31"),
  Month: z.coerce.number().min(1, "Min 1").max(12, "Max 12"),
  Year: z.coerce.number().min(2000, "Min 2000").max(2100, "Max 2100"),
  DayOfWeek: z.coerce.number().min(0, "Min 0").max(6, "Max 6"),
  PIS: z.coerce.number().min(0, "Min 0"),
});

export type AQIFormData = z.infer<typeof formSchema>;

interface AQIPredictionFormProps {
  onSubmit: (data: AQIFormData) => void;
  isLoading: boolean;
}

export function AQIPredictionForm({ onSubmit, isLoading }: AQIPredictionFormProps) {
  const form = useForm<AQIFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PM2_5: 0,
      PM10: 0,
      NO2: 0,
      SO2: 0,
      CO: 0,
      O3: 0,
      Day: 1,
      Month: 1,
      Year: 2024,
      DayOfWeek: 0,
      PIS: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Pollutants Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pollutants
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="PM2_5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PM2.5</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-500"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PM10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PM10</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-600"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="NO2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NO2</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-400"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SO2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SO2</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-500"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CO"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CO</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0-50"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="O3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>O3</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-500"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Date Information Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Date Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="Day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1-31"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1-12"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2000-2100"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="DayOfWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day of Week</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-6"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Index Feature Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Index Feature
          </h3>
          <div className="max-w-xs">
            <FormField
              control={form.control}
              name="PIS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIS</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      className="focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-3 text-base font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            "Predict AQI"
          )}
        </Button>
      </form>
    </Form>
  );
}
