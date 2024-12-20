"use client";

import { Bar, BarChart, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { trpc } from "@/utils/trpc";

const DiskUsage = () => {
  const { data, isLoading } = trpc.github.getRepoStats.useQuery();

  const formatMB = (kb: number) => {
    return (kb / 1024).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="aspect-video w-full animate-pulse rounded-lg bg-card" />
    );
  }

  return (
    <Card className="max-w-xs">
      <CardHeader className="p-4 pb-0">
        <CardTitle>Total Disk Usage</CardTitle>
        <CardDescription>
          Overall disk usage by all of your repositories
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
        <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
          {formatMB(data?.totalDiskUsage ?? 0)}
          <span className="text-sm font-normal text-muted-foreground">MB</span>
        </div>
        <ChartContainer
          config={{
            steps: {
              label: "Steps",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="ml-auto w-[72px]"
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            data={[
              {
                date: "2024-01-01",
                steps: 2000,
              },
              {
                date: "2024-01-02",
                steps: 2100,
              },
              {
                date: "2024-01-03",
                steps: 2200,
              },
              {
                date: "2024-01-04",
                steps: 1300,
              },
              {
                date: "2024-01-05",
                steps: 1400,
              },
              {
                date: "2024-01-06",
                steps: 2500,
              },
              {
                date: "2024-01-07",
                steps: 1600,
              },
            ]}
          >
            <Bar
              dataKey="steps"
              fill="var(--color-steps)"
              radius={2}
              fillOpacity={0.2}
              activeIndex={6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              hide
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DiskUsage;
