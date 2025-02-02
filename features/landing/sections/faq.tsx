import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShootingStars } from "../components/shooting-stars";
import { content } from "../constants/content";

export const FAQ = () => (
  <div className="relative w-full bg-black py-20">
    <div className="absolute inset-x-0 h-[500px] w-full scale-[0.80] transform rounded-full bg-purple-500 bg-gradient-to-r from-blue-800 to-purple-500 opacity-5 blur-3xl" />
    <ShootingStars />
    <div className="max-container">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 id="faqs" className="text-gradient text-h2">
            {content.faqs.title}
          </h2>
          <p className="max-w-xl text-center text-lg leading-relaxed tracking-tight text-neutral-400">
            {content.faqs.description}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {content.faqs.list.map((item, index) => (
              <AccordionItem
                key={index}
                value={"index-" + index}
                className="mt-2 border-b border-neutral-50/40 px-4"
              >
                <AccordionTrigger>
                  <p className="text-body3 text-neutral-300">{item.question}</p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body3 text-neutral-400">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </div>
);
