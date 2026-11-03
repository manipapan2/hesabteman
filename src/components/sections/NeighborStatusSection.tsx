import { useContext, useEffect } from "react";
import SectionTitle from "../SectionTitle.tsx";
import { Input } from "../ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { motion } from "motion/react";
import { User } from "lucide-react";
import type { NeighborProps } from "@/types/apartmant-data-types.ts";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";
import { clone, isEmpty } from "@fullstacksjs/toolbox";
import InputTitle from "../InputTitle.tsx";
import Section from "../Section.tsx";

const NeighborStatusSection = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;

  useEffect(() => {
    if (apartmantData.unitCount && isEmpty(apartmantData.neighbors)) {
      setApartmantData((prevState) => {
        const neighborArray: NeighborProps[] = [];

        for (
          let index = 0;
          index < (apartmantData.unitCount as number);
          index++
        ) {
          neighborArray.push({
            id: index,
            name: "",
            unit: index + 1,
            hasPaidFee: true,
          });
        }

        return {
          ...prevState,
          neighbors: neighborArray,
        };
      });
    } else if (
      typeof apartmantData.unitCount !== "number" &&
      !isEmpty(apartmantData.neighbors)
    ) {
      setApartmantData((prevState) => {
        return {
          ...prevState,
          neighbors: [],
        };
      });
    }
  }, [apartmantData]);

  if (
    apartmantData?.unitCount &&
    apartmantData?.neighbors &&
    !isEmpty(apartmantData.neighbors)
  )
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Section>
          <SectionTitle>وضعیت همسایه ها</SectionTitle>
          {apartmantData.neighbors.map((neighbor: NeighborProps, index) => (
            <Field
              key={neighbor.id}
              fieldIndex={index}
              neighborId={neighbor.id}
            />
          ))}
        </Section>
      </motion.div>
    );

  return (
    <Section className="bg-secondary flex h-32 flex-col items-center justify-center gap-4 rounded-md p-2">
      <User className="text-foreground/40" size={30} />
      <h2 className="text-foreground/40">طبقه و واحد را وارد کنید</h2>
    </Section>
  );
};

interface FiledProps {
  neighborId: number;
  fieldIndex: number;
}

// oxlint-disable-next-line max-lines-per-function
const Field = ({ neighborId, fieldIndex }: FiledProps) => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;

  const unitItems = Array.from({
    length: apartmantData.unitCount as number,
  }).map((_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  useEffect(() => {
    setApartmantData((prevState) => {
      const clonedObj = clone(prevState);
      clonedObj.neighbors[fieldIndex].unit = unitItems[fieldIndex].value;

      return clonedObj;
    });
  }, [unitItems]);

  return (
    <div key={neighborId} className="bg-secondary rounded-md p-3">
      <div className="flex flex-col gap-5">
        <div>
          <SectionTitle>
            واحد {apartmantData.neighbors[neighborId].unit}
          </SectionTitle>
          <InputTitle>نام همسایه</InputTitle>
          <Input
            type="text"
            placeholder="مثلا: آقای غلامی"
            onValue={(value: string) =>
              setApartmantData((prevState) => {
                const clonedObj = clone(prevState);
                clonedObj.neighbors[fieldIndex].name = value;
                return clonedObj;
              })
            }
          />
        </div>
        <div>
          <InputTitle>وضعیت پرداخت</InputTitle>
          <RadioGroup
            defaultValue
            className="flex"
            onValueChange={(value) =>
              setApartmantData((prevState) => {
                const clonedObj = clone(prevState);
                clonedObj.neighbors[fieldIndex].hasPaidFee = value;
                return clonedObj;
              })
            }
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value id={`option-one-${neighborId}`} />
              <Label
                className={
                  apartmantData.neighbors[fieldIndex].hasPaidFee
                    ? "text-green-500"
                    : "text-gray-500"
                }
                htmlFor={`option-one-${neighborId}`}
              >
                پرداخت شده
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value={false} id={`option-two-${neighborId}`} />
              <Label
                className={
                  !apartmantData.neighbors[fieldIndex].hasPaidFee
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
  );
};

export default NeighborStatusSection;
