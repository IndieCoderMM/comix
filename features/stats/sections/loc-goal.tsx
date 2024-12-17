"use client";

import { trpc } from "@/utils/trpc";
import { useMemo } from "react";
import LocChart from "../components/loc-chart";

const LocGoal = () => {
  const { data } = trpc.github.getWeeklyLOC.useQuery();

  const locData = useMemo(() => {
    if (!data) return [];

    const locData = [];
    for (const [date, { additions, deletions }] of data) {
      locData.push({
        date,
        lines: additions, //  + deletions (not accounting for deletions)
      });
    }

    locData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return locData;
  }, [data]);

  console.log("Loc data", data);

  return (
    <div className="max-container">
      <LocChart data={locData} />
    </div>
  );
};

export default LocGoal;
