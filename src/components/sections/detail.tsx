import { useContext, useEffect } from "react";
import { Input } from "../ui/input";
import Title from "../title";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApartmantContext, type ApartmantProps } from "@/App";

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
  s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
const currentPersianYear = convertPersianNumberToEnglish(
  new Date().toLocaleDateString("fa-IR", { year: "numeric" }),
);
let persianYearItems: {
  label: string;
  value: null | string;
  // change
}[] = Array.from({ length: 6 }).map((_, index) => {
  const calculatedYear = (parseInt(currentPersianYear) - index).toString();
  return { label: calculatedYear, value: calculatedYear };
});
// persianYearItems.unshift({ label: "انتخاب ماه", value: null });

export default function DetailSection() {
  const apartmantContext = useContext(ApartmantContext);
  const { setApartmantData } = apartmantContext;

  useEffect(() => {
    setApartmantData((prevState: ApartmantProps) => {
      const clonedObj = { ...prevState };
      clonedObj["year"] = persianYearItems[0].value;
      clonedObj["month"] = currentPersianMonth;
      return clonedObj;
    });
  }, []);

  return (
    <section className="rounded-md bg-secondary p-3 flex flex-col gap-5">
      <div>
        <Title>مبلغ شارژ</Title>
        <Input
          unit="تومان"
          isSeparateNumbers
          onValue={(value) =>
            setApartmantData((prevState: ApartmantProps) => {
              const clonedObj = { ...prevState };
              clonedObj["fee"] = parseInt(value);
              return clonedObj;
            })
          }
          placeholder="مثلا: 400,000"
        />
        {/* <input type="text" onChange={() => console.log('ttttt')} value={''} /> */}
      </div>
      <div>
        <Title>تاریخ</Title>
        <div className="flex gap-2">
          <Select
            items={persianMonthItems}
            defaultValue={currentPersianMonth}
            onValueChange={(value) =>
              setApartmantData((prevValue: ApartmantProps) => {
                const clonedArray = { ...prevValue };
                clonedArray["month"] = value;
                return clonedArray;
              })
            }
          >
            <SelectTrigger className="w-full max-w-48">
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
              setApartmantData((prevValue: ApartmantProps) => {
                const clonedObject = { ...prevValue };
                clonedObject["year"] = value;
                return clonedObject;
              })
            }
          >
            <SelectTrigger className="w-full max-w-48">
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
        <Title>طبقات</Title>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="تعداد طبقه ها"
            maxLength={1}
            onValue={(value) =>
              setApartmantData((prevState: ApartmantProps) => {
                const clonedObj = { ...prevState };
                clonedObj["floorCount"] = parseInt(value);
                return clonedObj;
              })
            }
          />
          <Input
            type="number"
            placeholder="تعداد واحد ها"
            maxLength={1}
            onValue={(value) =>
              setApartmantData((prevState: ApartmantProps) => {
                const clonedObj = { ...prevState };
                clonedObj["unitCount"] = parseInt(value);
                return clonedObj;
              })
            }
          />
        </div>
      </div>
    </section>
  );
}
