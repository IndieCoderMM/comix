"use client";

import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

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
import { LanguageData } from "@/services/github/helper";
import { useMemo } from "react";

const LanguageChart = ({ data }: { data: LanguageData[] }) => {
  const chartData = useMemo(() => {
    const chart = data.map((item) => ({
      ...item,
      fill: item.color,
    }));

    chart.sort((a, b) => b.score - a.score);

    return chart.slice(0, 5);
  }, [data]);

  const chartConfig = useMemo(() => {
    const languages = chartData
      ?.map((item) => ({
        [item.language]: {
          label: item.language,
          color: item.color,
        },
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    return {
      ...languages,
    } as ChartConfig;
  }, [chartData]);

  console.log(chartConfig);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Most Used Languages</CardTitle>
        <CardDescription>Your primary languages from all repos</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={20} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="language" />}
            />
            <PolarGrid gridType="circle" />
            <RadialBar dataKey="score" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LanguageChart;
