import { useContext } from "react";
import { Input } from "../ui/input.tsx";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";
import InputTitle from "@/components/InputTitle.tsx";
import { clone } from "@fullstacksjs/toolbox";
import Section from "../Section.tsx";

const BaseInfoSection = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { setApartmantData } = apartmantContext;

  return (
    <Section className="bg-secondary">
      <div>
        <InputTitle>مبلغ شارژ</InputTitle>
        <Input
          unit="تومان"
          isSeparateNumbers
          onValue={(value) =>
            setApartmantData((prevState) => {
              const clonedObj = clone(prevState);
              clonedObj["fee"] = parseInt(value, 10);
              return clonedObj;
            })
          }
          placeholder="مثلا: 400,000"
        />
      </div>
      <div>
        <InputTitle>واحدها</InputTitle>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="تعداد واحد ها"
            maxLength={1}
            onValue={(value) =>
              setApartmantData((prevState) => {
                const clonedObj = clone(prevState);
                const isValidNumber = parseInt(value, 10);
                clonedObj["unitCount"] = isValidNumber
                  ? parseInt(value, 10)
                  : undefined;
                return clonedObj;
              })
            }
          />
        </div>
      </div>
    </Section>
  );
};

export default BaseInfoSection;
