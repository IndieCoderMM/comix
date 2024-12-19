"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { LanguageData } from "@/services/github/helper";
import { useMemo } from "react";

const LanguageChart = ({ data }: { data: LanguageData[] }) => {
  const chartData = useMemo(() => {
    const totalScore = data.reduce((acc, item) => acc + item.score, 0);
    const languages = data.map((item) => ({
      ...item,
      score: (item.score / totalScore) * 100,
      fill: item.color,
    }));

    const topLanguages = languages
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // Reorder from highest to lowest score
    topLanguages.sort((a, b) => a.score - b.score);

    return topLanguages;
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

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="p-4 text-h6">Most Used Languages</CardTitle>
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          {chartData.map((item) => (
            <div
              key={item.language}
              className="grid flex-1 auto-rows-min gap-0.5"
            >
              <div className="text-sm text-muted-foreground">
                {item.language}
              </div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.score.toFixed(1)}
                <span className="text-sm font-normal text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          ))}
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={chartData}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              dataKey="value"
              tick={false}
              domain={[0, 50]}
            />
            <RadialBar dataKey="score" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LanguageChart;
