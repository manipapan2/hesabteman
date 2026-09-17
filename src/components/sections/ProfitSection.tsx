import { CircleMinus, PlusCircle, TrendingUp } from "lucide-react";
import { Button } from "../ui/button/button.tsx";
import { useContext, useRef } from "react";

import { motion } from "motion/react";
import Title from "../Title.tsx";
import { Input } from "../ui/input.tsx";
import type { ProfitProps } from "@/types/apartmant-data-types.ts";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";
import { clone, isEmpty } from "@fullstacksjs/toolbox";

const ProfitSection = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addNewProfit = () => {
    const newProfitId: number = isEmpty(apartmantData.profit)
      ? 0
      : apartmantData.profit[apartmantData.profit.length - 1].id + 1;

    setApartmantData((prevState) => {
      return {
        ...prevState,
        profit: [
          ...prevState.profit,
          { id: newProfitId, title: "", cost: null },
        ],
      };
    });

    setTimeout(() => {
      wrapperRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 400);
  };

  if (!isEmpty(apartmantData.profit))
    return (
      <section
        ref={wrapperRef}
        className="bg-accent flex flex-col gap-4 rounded-md p-3"
      >
        <Title>سود ها</Title>
        {apartmantData.profit.map((profit: ProfitProps, profitIndex) => (
          <motion.div
            key={profit.id}
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
                      setApartmantData((prevState) => {
                        const clonedObject = clone(prevState);

                        const newprofitValue = clonedObject.profit.filter(
                          (element: ProfitProps) => element.id !== profit.id,
                        );

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
                    setApartmantData((prevState) => {
                      const clonedObj = clone(prevState);
                      clonedObj.profit[profitIndex].title = value;
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
                    setApartmantData((prevState) => {
                      const clonedObj = clone(prevState);
                      clonedObj.profit[profitIndex].cost = parseInt(
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
};

export default ProfitSection;
