"use client";
import { trpc } from "@/utils/trpc";
import LanguageChart from "../components/language-chart";

const Languages = () => {
  const { data: languages, isLoading } = trpc.github.getLanguages.useQuery();

  return (
    <section className="w-full">
      {isLoading ? (
        <div className="aspect-square w-full rounded-lg bg-card" />
      ) : (
        <LanguageChart data={languages ?? []} />
      )}
    </section>
  );
};

export default Languages;
