import { useContext, useRef } from "react";
import SectionTitle from "../SectionTitle.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import { CircleDollarSign, CircleMinus, PlusCircle } from "lucide-react";
import { motion } from "motion/react";
import type { CostProps } from "@/types/apartmant-data-types.ts";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";
import { clone, isEmpty } from "@fullstacksjs/toolbox";
import InputTitle from "../InputTitle.tsx";
import Section from "../Section.tsx";

const CostSection = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData, setApartmantData } = apartmantContext;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const addNewCost = () => {
    const newCostId: number = isEmpty(apartmantData.costs)
      ? 0
      : apartmantData.costs[apartmantData.costs.length - 1].id + 1;

    setApartmantData((prevState) => {
      return {
        ...prevState,
        costs: [
          ...prevState.costs,
          {
            id: newCostId,
            title: "",
            cost: null,
          },
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

  if (!isEmpty(apartmantData.costs))
    return (
      <Section ref={wrapperRef}>
        <SectionTitle>هزینه ها</SectionTitle>
        {apartmantData.costs.map((cost: CostProps, costIndex) => (
          <motion.div
            key={cost.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div className="bg-secondary flex flex-col gap-4 rounded-md p-3">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <InputTitle hasDefaultMargin={false}>عنوان هزینه</InputTitle>
                  <button
                    className="text-red-500"
                    onClick={() =>
                      setApartmantData((prevState) => {
                        const clonedObject = clone(prevState);

                        const newCostsValue = clonedObject.costs.filter(
                          (element: CostProps) => element.id !== cost.id,
                        );

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
                    setApartmantData((prevState) => {
                      const clonedObj = clone(prevState);
                      clonedObj.costs[costIndex].title = value;
                      return clonedObj;
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <InputTitle>مبلغ هزینه</InputTitle>
                <Input
                  unit="تومان"
                  isSeparateNumbers
                  onValue={(value) =>
                    setApartmantData((prevState) => {
                      const clonedObj = clone(prevState);
                      clonedObj.costs[costIndex].cost = parseInt(value, 10);
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
      </Section>
    );

  return (
    <Section>
      <CircleDollarSign className="text-foreground/40" size={30} />
      <h2 className="text-foreground/40">هزینه ای وحود ندارد</h2>
      <Button onClick={() => addNewCost()}>
        اضافه کردن هزینه
        <PlusCircle size={30} />
      </Button>
    </Section>
  );
};

export default CostSection;
