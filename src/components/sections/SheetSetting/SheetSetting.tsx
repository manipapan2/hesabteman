import SectionTitle from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "@/components/Section";
import TitleSetting from "./TitleSetting";

const SheetSetting = () => {
  return (
    <Section>
      <SectionTitle>تنظیمات</SectionTitle>
      <Accordion multiple>
        <AccordionItem>
          <AccordionTrigger>
            <h3 className="text-xl">عنوان</h3>
          </AccordionTrigger>

          <AccordionContent>
            <TitleSetting />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};

export default SheetSetting;
