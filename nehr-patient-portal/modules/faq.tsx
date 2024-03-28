"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = ({ className }: { className?: string }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={className}
      defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a PHN?</AccordionTrigger>
        <AccordionContent>
          PHN stands for Personal Health Number. It's an identifier unique to
          each patient within NEHR.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why do I need a PHN?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How do I create a PHN?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
