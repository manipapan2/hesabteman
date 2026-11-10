// oxlint-disable max-lines-per-function
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import SheetSettingContext from "@/contexts/SheetSetting/SheetSettingContext";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import InputTitle from "../../InputTitle";
import { clone } from "@fullstacksjs/toolbox";

const persianMonthItems = [
  { label: "فروردین", value: "فروردین" },
  { label: "اردیبهشت", value: "اردیبهشت" },
  { label: "خرداد", value: "خرداد" },
  { label: "تیر", value: "تیر" },
  { label: "مرداد", value: "مرداد" },
  { label: "شهریور", value: "شهریور" },
  { label: "مهر", value: "مهر" },
  { label: "آبان", value: "آبان" },
  { label: "آذر", value: "آذر" },
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

const TitleSetting = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;
  const sheetSettingContext = useContext(SheetSettingContext);
  const { sheetSetting, setSheetSetting } = sheetSettingContext;

  const [lastDate, setLastDate] = useState<{
    year: typeof apartmantData.year;
    month: typeof apartmantData.month;
  }>({
    year: currentPersianYear,
    month: currentPersianMonth,
  });

  const changeYear = (value: typeof apartmantData.year) => {
    setApartmantData((prev) => ({
      ...prev,
      year: value,
    }));
  };

  const changeMonth = (value: typeof apartmantData.month) => {
    setApartmantData((prev) => ({
      ...prev,
      month: value,
    }));
  };

  const isSheetTitleAutomatic = () => {
    return (
      lastDate &&
      apartmantData.sheetTitle ===
        `صورت وضعیت شارژ ${lastDate.month} ${lastDate.year}`
    );
  };

  const handleAutomaticSheetTitle = () => {
    setApartmantData((prevState) => {
      const clonedObj = clone(prevState);
      console.log(clonedObj.month);
      console.log(clonedObj.year);
      clonedObj.sheetTitle = `صورت وضعیت شارژ ${clonedObj.month} ${clonedObj.year}`;

      return clonedObj;
    });
  };

  useEffect(() => {
    setApartmantData((prevState) => ({
      ...prevState,
      year: currentPersianYear,
      month: currentPersianMonth,
    }));
    handleAutomaticSheetTitle();
  }, []);

  useEffect(() => {
    if (isSheetTitleAutomatic()) {
      handleAutomaticSheetTitle();
    }

    // Update last date
    console.log("is", apartmantData.month);
    setLastDate(() => ({
      year: apartmantData.year,
      month: apartmantData.month,
    }));
  }, [apartmantData.year, apartmantData.month]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg">نمایش عنوان کلی</h4>

        <Switch
          dir="ltr"
          checked={sheetSetting.showSheetTitle}
          onCheckedChange={(value) =>
            setSheetSetting((prev) => ({ ...prev, showSheetTitle: value }))
          }
        />
      </div>
      {/* ox */}
      <Input
        hasReset={!isSheetTitleAutomatic()}
        value={apartmantData.sheetTitle}
        disabled={!sheetSetting.showSheetTitle}
        onValue={(value) =>
          setApartmantData((prev) => ({ ...prev, sheetTitle: value }))
        }
        onReset={() => handleAutomaticSheetTitle()}
      />

      <div>
        <InputTitle>تاریخ</InputTitle>
        <div className="flex gap-2">
          <Select
            items={persianMonthItems}
            defaultValue={currentPersianMonth}
            onValueChange={(value) => changeMonth(value)}
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
            onValueChange={(value) => changeYear(value)}
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
    </>
  );
};

export default TitleSetting;
