"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";

export const description = "An interactive bar chart";

const chartConfig = {
  contributionCount: {
    label: "Contributions",
  },
} satisfies ChartConfig;

const ContribChart = ({
  data,
  total,
}: {
  data: { date: string; contributionCount: number }[];
  total: number;
}) => {
  const [activeYear, setActiveYear] = useState("2024");
  const [activeMonthRange, setActiveMonthRange] = useState(3); // Number of months to display

  const years = useMemo(() => {
    const years = data.map((item) => item.date.slice(0, 4));
    return Array.from(new Set(years));
  }, [data]);

  const chartData = useMemo(() => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      const year = itemDate.getFullYear();

      if (year !== Number(activeYear)) {
        return false;
      }

      const month = itemDate.getMonth();
      const currentMonth = new Date().getMonth();

      return month >= currentMonth - activeMonthRange;
    });

    return filteredData;
  }, [data, activeYear, activeMonthRange]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total Contributions {total}</CardTitle>
          <CardDescription>
            Visual representation of your contributions
          </CardDescription>
        </div>
        <div className="flex">
          {years.map((y) => {
            return (
              <button
                key={y}
                data-active={activeYear === y}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveYear(y)}
              >
                <span className="text-xs text-muted-foreground">{y}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="contributionCount"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              type="natural"
              dataKey={"contributionCount"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ContribChart;
