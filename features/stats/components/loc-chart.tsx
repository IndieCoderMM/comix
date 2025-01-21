"use client";

import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dayjs from "dayjs";
import { useMemo } from "react";

type DailyLoc = {
  date: string;
  lines: number;
};

const LocChart = ({ data }: { data: DailyLoc[] }) => {
  const { totalLines, averageLines, todayLines, plotData } = useMemo(() => {
    const startDate = dayjs().subtract(7, "day");

    const plotData = [];

    for (let i = 0; i < 7; i++) {
      const date = dayjs(startDate).add(i, "day");

      const dataByDay = data.find((item) =>
        date.isSame(dayjs(item.date), "day"),
      );
      if (dataByDay) {
        plotData.push(dataByDay);
      } else {
        plotData.push({
          date: date.toISOString(),
          lines: 0,
        });
      }
    }

    console.log("plotData", JSON.stringify(plotData, null, 2));

    const totalLines = data.reduce((acc, item) => acc + item.lines, 0);
    const averageLines = totalLines / data.length;

    const todayData = data.find(
      (item) => item.date === new Date().toISOString().split("T")[0],
    );
    return {
      totalLines,
      averageLines,
      todayLines: todayData?.lines ?? 0,
      plotData,
    };
  }, [data]);

  console.log("loc-chart", JSON.stringify(data, null, 2));

  return (
    <Card className="shadow-none">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Today</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {todayLines}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            Lines of Code
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            lines: {
              label: "Lines",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={plotData}
          >
            <Bar
              dataKey="lines"
              radius={5}
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={averageLines}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Lines"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={averageLines.toFixed(1)}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have written{" "}
          <span className="font-medium text-foreground">{totalLines}</span>{" "}
          lines of code.
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default LocChart;
