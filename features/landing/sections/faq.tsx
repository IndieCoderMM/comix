import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShootingStars } from "../components/shooting-stars";

export const FAQ = () => (
  <div className="relative w-full bg-black py-20">
    <div className="absolute inset-x-0 h-[700px] w-full scale-[0.80] transform rounded-full bg-purple-500 bg-gradient-to-r from-blue-800 to-purple-500 opacity-5 blur-3xl" />
    <ShootingStars />
    <div className="max-container">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-gradient text-h2">FAQ</h2>
          <div className="flex flex-col gap-2">
            <h4 className="text-h4 text-neutral-300">
              This is the start of something new
            </h4>
            <p className="max-w-xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <AccordionItem
                key={index}
                value={"index-" + index}
                className="mt-2 border-b border-neutral-50/40 px-4"
              >
                <AccordionTrigger>
                  <p className="text-body3 text-neutral-300">
                    This is the start of something new
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body3 text-neutral-400">
                    Managing a small business today is already tough. Avoid
                    further complications by ditching outdated, tedious trade
                    methods. Our goal is to streamline SMB trade, making it
                    easier and faster than ever.
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </div>
);
