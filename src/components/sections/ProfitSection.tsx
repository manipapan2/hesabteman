import { CircleMinus, PlusCircle, TrendingUp } from "lucide-react";
import { Button } from "../ui/button/button.tsx";
import { useContext, useRef } from "react";

import { motion } from "motion/react";
import Title from "../Title.tsx";
import { Input } from "../ui/input.tsx";
import type {
  ApartmantProps,
  ProfitProps,
} from "@/types/apartmant-data-types.ts";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";

export default function ProfitSection() {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addNewProfit = () => {
    const lastProfitId =
      apartmantData.profit &&
      parseInt(
        Object.keys(apartmantData.profit)[
          Object.keys(apartmantData.profit).length - 1
        ],
        10,
      );
    const newprofitId =
      lastProfitId || lastProfitId === 0 ? lastProfitId + 1 : 0;

    if (!apartmantData?.profit) {
      setApartmantData((prevState: ApartmantProps) => {
        const clonedObj = { ...prevState };
        clonedObj["profit"] = {};
        return clonedObj;
      });
    }

    setApartmantData((prevState) => {
      const clonedObj = { ...prevState };

      clonedObj!["profit"]![newprofitId] = { title: "", cost: null };

      return clonedObj;
    });

    setTimeout(() => {
      wrapperRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 400);
  };

  if (apartmantData?.profit && Object.keys(apartmantData.profit).length > 0)
    return (
      <section
        ref={wrapperRef}
        className="bg-accent flex flex-col gap-4 rounded-md p-3"
      >
        {apartmantData?.profit &&
          Object.keys(apartmantData.profit).map((profitId) => (
            <motion.div
              key={profitId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="bg-secondary flex flex-col gap-2 rounded-md p-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Title>عنوان سود</Title>
                    <button
                      className="text-red-500"
                      onClick={() =>
                        setApartmantData((prevState: ApartmantProps) => {
                          const clonedObject = { ...prevState };

                          const newprofitValue = Object.keys(
                            clonedObject.profit!,
                          ).reduce((obj: ProfitProps, key) => {
                            if (key !== profitId) {
                              obj[key] = clonedObject["profit"]![key];
                            }
                            return obj;
                          }, {});
                          // clonedObject.costs.filter(value => value != profitId)
                          clonedObject.profit = newprofitValue;
                          return clonedObject;
                        })
                      }
                    >
                      <CircleMinus />
                    </button>
                  </div>
                  <Input
                    type="text"
                    placeholder="مثلا: مانده صندوق از ماه قبل"
                    onValue={(value) =>
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["profit"]![profitId]["title"] = value;
                        return clonedObj;
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Title>مبلغ سود</Title>
                  <Input
                    type="number"
                    unit="تومان"
                    isSeparateNumbers
                    onValue={(value) =>
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["profit"]![profitId]["cost"] = parseInt(
                          value.replace(",", ""),
                          10,
                        );
                        return clonedObj;
                      })
                    }
                    placeholder="مثلا: 20,000"
                  />
                </div>
              </div>
            </motion.div>
          ))}

        <Button onClick={() => addNewProfit()}>
          اضافه کردن سود
          <PlusCircle size={40} />
        </Button>
      </section>
    );

  return (
    <section className="bg-secondary flex flex-col items-center justify-center gap-4 rounded-md p-4">
      <TrendingUp className="text-foreground/40" size={30} />
      <h2 className="text-foreground/40">سودی وجود ندارد</h2>
      <Button onClick={() => addNewProfit()}>
        اضافه کردن سود
        <PlusCircle size={30} />
      </Button>
    </section>
  );
}
