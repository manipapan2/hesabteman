import { useContext, useRef } from "react";
import Title from "../Title.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button/button.tsx";
import { CircleDollarSign, CircleMinus, PlusCircle } from "lucide-react";
import { motion } from "motion/react";
import type {
  ApartmantProps,
  CostProps,
} from "@/types/apartmant-data-types.ts";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";

export default function CostSection() {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addNewCost = () => {
    const lastCostId =
      apartmantData.costs &&
      parseInt(
        Object.keys(apartmantData.costs)[
          Object.keys(apartmantData.costs).length - 1
        ],
        10,
      );
    const newCostId = lastCostId || lastCostId === 0 ? lastCostId + 1 : 0;

    if (!apartmantData?.costs) {
      setApartmantData((prevState) => {
        const clonedObj = { ...prevState };
        clonedObj["costs"] = {};
        return clonedObj;
      });
    }

    setApartmantData((prevState) => {
      const clonedObj = { ...prevState };

      clonedObj!["costs"]![newCostId] = { title: "", cost: null };

      return clonedObj;
    });
    setTimeout(() => {
      wrapperRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 400);
  };

  if (apartmantData?.costs && Object.keys(apartmantData.costs).length > 0)
    return (
      <section
        ref={wrapperRef}
        className="rounded-md p-3 bg-accent flex flex-col gap-4"
      >
        {apartmantData?.costs &&
          Object.keys(apartmantData.costs).map((costId) => (
            <motion.div
              key={costId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="bg-secondary p-3 border-b border-foreground/40 flex flex-col gap-2 rounded-md">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Title>عنوان هزینه</Title>
                    <button
                      className="text-red-500"
                      onClick={() =>
                        setApartmantData((prevState: ApartmantProps) => {
                          const clonedObject = { ...prevState };

                          const newCostsValue = Object.keys(
                            clonedObject.costs!,
                          ).reduce((obj: CostProps, key) => {
                            if (key !== costId) {
                              obj[key] = clonedObject["costs"]![key];
                            }
                            return obj;
                          }, {});
                          clonedObject.costs = newCostsValue;
                          return clonedObject;
                        })
                      }
                    >
                      <CircleMinus />
                    </button>
                  </div>
                  <Input
                    type="text"
                    placeholder="مثلا: آسانسور"
                    onValue={(value) =>
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["costs"]![costId]["title"] = value;
                        return clonedObj;
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Title>مبلغ هزینه</Title>
                  <Input
                    unit="تومان"
                    isSeparateNumbers
                    onValue={(value) =>
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["costs"]![costId]["cost"] = parseInt(
                          value,
                          10,
                        );
                        return clonedObj;
                      })
                    }
                    placeholder="مثلا: 100,000"
                  />
                </div>
              </div>
            </motion.div>
          ))}

        <Button onClick={() => addNewCost()}>
          اضافه کردن هزینه
          <PlusCircle size={40} />
        </Button>
      </section>
    );

  return (
    <section className="rounded-md bg-secondary p-4 flex flex-col gap-4 items-center justify-center">
      <CircleDollarSign className="text-foreground/40" size={30} />
      <h2 className="text-foreground/40">هزینه ای وحود ندارد</h2>
      <Button onClick={() => addNewCost()}>
        اضافه کردن هزینه
        <PlusCircle size={30} />
      </Button>
    </section>
  );
}
