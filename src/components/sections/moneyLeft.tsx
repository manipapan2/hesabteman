import { CircleMinus, PlusCircle, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { useContext, useRef } from "react";
import {
  ApartmantContext,
  type ApartmantProps,
  type MoneyLeftProps,
} from "@/App";
import { motion } from "motion/react";
import Title from "../title";
import { Input } from "../ui/input";

export default function MoneyLeftSection() {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addNewMoneyLeft = () => {
    const lastmoneyLeftId =
      apartmantData.moneyLeft &&
      parseInt(
        Object.keys(apartmantData.moneyLeft)[
          Object.keys(apartmantData.moneyLeft).length - 1
        ],
      );
    const newMoneyLeftId =
      lastmoneyLeftId || lastmoneyLeftId == 0 ? lastmoneyLeftId + 1 : 0;

    if (!apartmantData?.moneyLeft) {
      setApartmantData((prevState) => {
        const clonedObj = { ...prevState };
        clonedObj["moneyLeft"] = {};
        return clonedObj;
      });
    }

    setApartmantData((prevState) => {
      const clonedObj = { ...prevState };

      clonedObj!["moneyLeft"]![newMoneyLeftId] = { title: "", cost: null };

      return clonedObj;
    });

    setTimeout(() => {
      wrapperRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 400);
  };

  if (
    apartmantData?.moneyLeft &&
    Object.keys(apartmantData.moneyLeft).length > 0
  )
    return (
      <section
        ref={wrapperRef}
        className="rounded-md p-3 bg-accent flex flex-col gap-4"
      >
        {apartmantData?.moneyLeft &&
          Object.keys(apartmantData.moneyLeft).map((moneyLeftId) => (
            <motion.div
              key={moneyLeftId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="bg-secondary p-3 flex flex-col gap-2 rounded-md">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Title>عنوان سود</Title>
                    <button
                      className="text-red-500"
                      onClick={() =>
                        setApartmantData((prevState: ApartmantProps) => {
                          const clonedObject = { ...prevState };

                          const newMoneyleftValue = Object.keys(
                            clonedObject.moneyLeft!,
                          ).reduce((obj: MoneyLeftProps, key) => {
                            if (key != moneyLeftId) {
                              obj[key] = clonedObject["moneyLeft"]![key];
                            }
                            return obj;
                          }, {});
                          // clonedObject.costs.filter(value => value != moneyLeftId)
                          clonedObject.moneyLeft = newMoneyleftValue;
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
                        clonedObj["moneyLeft"]![moneyLeftId]["title"] = value;
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
                    separateNumbers
                    onValue={(value) =>
                      setApartmantData((prevState: ApartmantProps) => {
                        const clonedObj = { ...prevState };
                        clonedObj["moneyLeft"]![moneyLeftId]["cost"] = parseInt(
                          value.replace(",", ""),
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

        <Button onClick={() => addNewMoneyLeft()}>
          اضافه کردن سود
          <PlusCircle size={40} />
        </Button>
      </section>
    );

  return (
    <section className="rounded-md bg-secondary p-4 flex flex-col gap-4 items-center justify-center">
      <TrendingUp className="text-foreground/40" size={30} />
      <h2 className="text-foreground/40">سودی وجود ندارد</h2>
      <Button onClick={() => addNewMoneyLeft()}>
        اضافه کردن سود
        <PlusCircle size={30} />
      </Button>
    </section>
  );
}
