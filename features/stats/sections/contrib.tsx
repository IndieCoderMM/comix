"use client";

import { trpc } from "@/utils/trpc";
import ContribChart from "../components/contrib-chart";

const Contributions = () => {
  const { data } = trpc.github.getContributions.useQuery();
  if (!data) {
    return null;
  }

  return <ContribChart data={data.data} total={data.total} />;
};

export default Contributions;
