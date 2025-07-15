"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "A simple area chart for tracking how many times have users requested";

const chartData = [
  { hour: "0h", query: 10 },
  { hour: "4h", query: 21 },
  { hour: "8h", query: 11 },
  { hour: "12h", query: 8 },
  { hour: "16h", query: 31 },
  { hour: "20h", query: 9 },
  { hour: "24h", query: 6 },
];

const chartConfig = {
  query: {
    label: "query",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total queries for the last 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="query"
                type="natural"
                fill="var(--color-query)"
                fillOpacity={0.4}
                stroke="var(--color-query)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <p>{new Date().toISOString().slice(0, 16).replace("T", " ")}</p>
      </CardFooter>  
    </Card>
  );
}
