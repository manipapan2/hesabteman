import { useContext } from "react";
import Title from "../title";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "@/components/ui/label";
import { ApartmantContext, type ApartmantProps } from "@/App";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";

export default function NeighborsSection() {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;

  const floorItems = Array.from({
    length: apartmantData.floorCount as number,
  }).map((_, index) => {
    return {
      label: index + 1,
      value: index + 1,
    };
  });

  const unitItems = Array.from({
    length:
      (apartmantData.floorCount as number) *
      (apartmantData.unitCount as number),
  }).map((_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  if (
    apartmantData?.unitCount &&
    apartmantData?.floorCount &&
    apartmantData?.neighbors &&
    Object.keys(apartmantData?.neighbors).length > 0
  )
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <section className="rounded-md bg-accent p-2 flex flex-col gap-4">
          {Object.keys(apartmantData.neighbors).map((neighborId, index) => (
            <div key={neighborId} className="p-3 bg-secondary rounded-sm">
              <div className="flex flex-col gap-5">
                <div>
                  <Title>نام همسایه</Title>
                  <Input
                    type="text"
                    placeholder="مثلا: آقای غلامی"
                    onValue={(value: string) =>
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["neighbors"]![neighborId]["name"] = value;
                        return clonedObj;
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    items={floorItems}
                    defaultValue={Math.ceil(
                      unitItems[index].value /
                        (apartmantData.unitCount as number),
                    )}
                    onValueChange={(value: any) =>
                      setApartmantData((prevValue: ApartmantProps) => {
                        const clonedObject = { ...prevValue };
                        clonedObject["neighbors"]![neighborId]["floor"] = value;
                        return clonedObject;
                      })
                    }
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>طبقات</SelectLabel>
                        {floorItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    items={unitItems}
                    defaultValue={() => {
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["neighbors"]![neighborId]["unit"] =
                          unitItems[index].value;
                        clonedObj["neighbors"]![neighborId]["floor"] =
                          Math.ceil(
                            unitItems[index].value /
                              (apartmantData.unitCount as number),
                          );
                        return clonedObj;
                      });
                      return unitItems[index].value;
                    }}
                    onValueChange={(value: any) =>
                      setApartmantData((prevValue: ApartmantProps) => {
                        const clonedObject = { ...prevValue };
                        clonedObject["neighbors"]![neighborId]["unit"] = value;
                        return clonedObject;
                      })
                    }
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>واحد ها</SelectLabel>
                        {unitItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Title>وضعیت پرداخت</Title>
                  <RadioGroup
                    defaultValue={true}
                    className={"flex"}
                    onValueChange={(value) =>
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["neighbors"]![neighborId]["hasPaidFee"] =
                          value;
                        return clonedObj;
                      })
                    }
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={true}
                        id={`option-one-${neighborId}`}
                      />
                      <Label
                        className={
                          apartmantData["neighbors"]![neighborId]["hasPaidFee"]
                            ? "text-green-500"
                            : "text-gray-500"
                        }
                        htmlFor={`option-one-${neighborId}`}
                      >
                        پرداخت شده
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={false}
                        id={`option-two-${neighborId}`}
                      />
                      <Label
                        className={
                          !apartmantData["neighbors"]![neighborId]["hasPaidFee"]
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                        htmlFor={`option-two-${neighborId}`}
                      >
                        پرداخت نشده
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          ))}
        </section>
      </motion.div>
    );

  return (
    <section className="rounded-md bg-secondary p-2 flex flex-col gap-4 h-32 items-center justify-center">
      <User className="text-foreground/40" size={30} />
      <h2 className="text-foreground/40">طبقه و واحد را وارد کنید</h2>
    </section>
  );
}
