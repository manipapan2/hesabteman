import { useContext, useEffect } from "react";
import { Input } from "../ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";
import InputTitle from "@/components/InputTitle.tsx";
import { clone } from "@fullstacksjs/toolbox";
import Section from "../Section.tsx";

const persianMonthItems = [
  { label: "فروردین", value: "فروردین" },
  { label: "اردیبهشت", value: "اردیبهشت" },
  { label: "خرداد", value: "خرداد" },
  { label: "تیر", value: "تیر" },
  { label: "مرداد", value: "مرداد" },
  { label: "شهریور", value: "شهریور" },
  { label: "مهر", value: "مهر" },
  { label: "آیان", value: "آیان" },
  { label: "آذز", value: "آذز" },
  { label: "دی", value: "دی" },
  { label: "بهمن", value: "بهمن" },
  { label: "اسفند", value: "اسفند" },
];
const currentPersianMonth = new Date().toLocaleDateString("fa-IR", {
  month: "long",
});

const convertPersianNumberToEnglish = (s: string) =>
  // oxlint-disable-next-line regexp/no-obscure-range
  s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
const currentPersianYear = convertPersianNumberToEnglish(
  new Date().toLocaleDateString("fa-IR", { year: "numeric" }),
);
const persianYearItems: {
  label: string;
  value: null | string;
}[] = Array.from({ length: 6 }).map((_, index) => {
  const calculatedYear = (parseInt(currentPersianYear, 10) - index).toString();
  return { label: calculatedYear, value: calculatedYear };
});

const BaseInfoSection = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { setApartmantData } = apartmantContext;

  useEffect(() => {
    setApartmantData((prevState) => {
      const clonedObj = clone(prevState);
      clonedObj["year"] = persianYearItems[0].value;
      clonedObj["month"] = currentPersianMonth;
      return clonedObj;
    });
  }, []);

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
        <InputTitle>تاریخ</InputTitle>
        <div className="flex gap-2">
          <Select
            items={persianMonthItems}
            defaultValue={currentPersianMonth}
            onValueChange={(value) =>
              setApartmantData((prevState) => {
                const clonedArray = clone(prevState);
                clonedArray["month"] = value;
                return clonedArray;
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ماه ها</SelectLabel>
                {persianMonthItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            items={persianYearItems}
            defaultValue={persianYearItems[0].value}
            onValueChange={(value) =>
              setApartmantData((prevState) => {
                const clonedObject = clone(prevState);
                clonedObject["year"] = value;
                return clonedObject;
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>سال ها</SelectLabel>
                {persianYearItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
