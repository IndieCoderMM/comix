"use client";
import { trpc } from "@/utils/trpc";
import LanguageChart from "../components/language-chart";

const Languages = () => {
  const { data: languages } = trpc.github.getLanguages.useQuery();

  return (
    <section className="w-full">
      <LanguageChart data={languages ?? []} />
    </section>
  );
};

export default Languages;
