import { faqData } from "../data/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQList = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="space-y-4"
    >
      {faqData.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-white/5 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden transition-all duration-200 hover:bg-white/10 hover:border-gray-700 data-[state=open]:bg-white/10"
        >
          <AccordionTrigger className="px-6 py-5 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
            <h3 className="text-lg font-semibold text-white pr-4">
              {faq.question}
            </h3>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5 text-gray-400 leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
