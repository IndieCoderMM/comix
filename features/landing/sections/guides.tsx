"use client";
import { cn } from "@/utils/tailwind";
import { useEffect, useState } from "react";
import { content } from "../constants/content";

const data = content.guides.steps;

export function Guides() {
  const [featureOpen, setFeatureOpen] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 10000) {
      setFeatureOpen((prev) => (prev + 1) % data.length);
      setTimer(0);
    }
  }, [timer]);

  return (
    <div className="min-h-screen w-full bg-black py-20">
      <div className="max-container py-20">
        <div className="mb-10">
          <h2 className="text-gradient text-h2 text-neutral-300" id="guides">
            {content.guides.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-6">
            {data.map((item, index) => (
              <button
                className="w-full"
                key={item.title}
                onClick={() => {
                  setFeatureOpen(index);
                  setTimer(0);
                }}
                type="button"
              >
                <TextComponent
                  content={item.content}
                  isOpen={featureOpen === index}
                  loadingWidthPercent={featureOpen === index ? timer / 100 : 0}
                  number={index + 1}
                  title={item.title}
                />
              </button>
            ))}
          </div>
          <div className="h-full">
            <div
              className={cn(
                "relative h-96 w-full overflow-hidden rounded-lg md:h-[500px]",
              )}
            >
              {data.map((item, index) => (
                <img
                  alt={item.title}
                  className={cn(
                    "absolute h-[500px] w-full transform-gpu rounded-lg object-cover transition-all duration-300",
                    featureOpen === index ? "scale-100" : "scale-70",
                    featureOpen > index ? "translate-y-full" : "",
                  )}
                  key={item.title}
                  src={item.srcImage}
                  style={{ zIndex: data.length - index }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guides;

function TextComponent({
  number,
  title,
  content,
  isOpen,
  loadingWidthPercent,
}: Readonly<{
  number: number;
  title: string;
  content: string;
  isOpen: boolean;
  loadingWidthPercent?: number;
}>) {
  return (
    <div
      className={cn(
        "transform-gpu rounded-lg border transition-all",
        isOpen
          ? "border-neutral-500/10 bg-gradient-to-b from-neutral-200/15 to-neutral-200/5 dark:border-neutral-500/15 dark:from-neutral-600/15 dark:to-neutral-600/5 dark:shadow-[2px_4px_25px_0px_rgba(248,248,248,0.06)_inset]"
          : "scale-90 border-transparent opacity-50 saturate-0",
      )}
    >
      <div className="flex w-full items-center gap-4 p-4">
        <p
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-neutral-500/20 text-neutral-300",
          )}
        >
          {number}
        </p>
        <h2
          className={cn(
            "text-left text-xl font-medium text-neutral-300 dark:text-neutral-200",
          )}
        >
          {title}
        </h2>
      </div>
      <div
        className={cn(
          "w-full transform-gpu overflow-hidden text-left text-neutral-300 transition-all duration-500 dark:text-neutral-400",
          isOpen ? "max-h-64" : "max-h-0",
        )}
      >
        <p className="p-4 text-lg">{content}</p>
        <div className="w-full px-4 pb-4">
          <div className="relative h-1 w-full overflow-hidden rounded-full">
            <div
              className={cn("absolute left-0 top-0 h-1 bg-indigo-500")}
              style={{ width: `${loadingWidthPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
