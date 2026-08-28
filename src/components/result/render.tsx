import { ApartmantContext } from "@/App";
import SeparateNumbers from "@/utils/separateNumbers";
import floorToPersianWord from "@/utils/floorToPersianWord";
import { useContext, useEffect, useState } from "react";

export default function Render({ ref }: { ref: React.Ref<HTMLDivElement> }) {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;
  const [sumOfPaidFee, setsumOfPaidFee] = useState<number>();
  const [sumOfCosts, setSumOfCosts] = useState<number>();
  const [sumOfMoneyLeft, setSumOfMoneyLeft] = useState<number>();

  useEffect(() => {
    let paidFeeSum = 0;
    let costsSum = 0;
    let moneyLeftSum = 0;

    if (apartmantData.neighbors && apartmantData.fee) {
      for (const element of Object.values(apartmantData.neighbors)) {
        if (element.hasPaidFee) {
          paidFeeSum += apartmantData.fee;
        }
      }
    }
    if (apartmantData.costs) {
      for (const element of Object.values(apartmantData.costs)) {
        if (element.title && element.cost) {
          costsSum += element.cost;
        }
      }
    }
    if (apartmantData.moneyLeft) {
      for (const element of Object.values(apartmantData.moneyLeft)) {
        if (element.title && element.cost) {
          moneyLeftSum += element.cost;
        }
      }
    }

    setsumOfPaidFee(paidFeeSum);
    setSumOfCosts(costsSum);
    setSumOfMoneyLeft(moneyLeftSum);
  }, [apartmantData]);

  return (
    <div
      ref={ref}
      dir="ltr"
      className="bg-result-background p-8 w-fit h-fit min-w-210"
    >
      <>
        <h2 className="text-xl text-result- mb-5 text-center">
          صورت وضعیت شارژ {apartmantData?.month} {apartmantData?.year}
        </h2>

        <div className="flex w-full justify-between gap-7">
          <div className="flex justify-around">
            <div className="rounded-md bg-result-secondary max-h-fit w-fit border-2 border-white border-solid">
              <div className="text-result-secondary-foreground flex">
                <span className="p-4 w-32 h-14 text-center">وضعیت شارژ</span>
                <span className="p-4 w-32 h-14 text-center">نام خانوادگی</span>
                <span className="pt-2 w-16 h-14 pb-2 p-1 flex justify-center items-center">
                  واحد
                </span>
                <span className="pt-2 w-16 h-14 pb-2 p-1 flex justify-center items-center">
                  طبقه
                </span>
              </div>
              <div className="text-result-secondary-foreground w-fit h-fit flex">
                <div>
                  {apartmantData.neighbors &&
                    Object.keys(apartmantData.neighbors).length > 0 &&
                    Object.values(apartmantData.neighbors).map(
                      (element: any, index: number) => (
                        <div className="flex" key={index}>
                          <span
                            className={`w-32 h-10 flex justify-center items-center ${
                              element.hasPaidFee
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          >
                            {element.hasPaidFee
                              ? "پرداخت شده"
                              : "در دست پرداخت"}
                          </span>
                          <span className="w-32 h-10 flex justify-center items-center">
                            {element.name}
                          </span>
                          <span className="flex w-16 h-10 justify-center items-center">
                            {element.unit}
                          </span>
                        </div>
                      ),
                    )}
                </div>
                <div className="flex-col">
                  {apartmantData.neighbors &&
                    Object.keys(apartmantData.neighbors).length > 0 &&
                    Object.values(apartmantData.neighbors).map(
                      (element, index) => (
                        // <span
                        //   key={index}
                        //   className="w-14 h-20 flex justify-center items-center"
                        // >
                        <span
                          key={index}
                          className="w-16 h-10 flex justify-center items-center"
                        >
                          {apartmantData?.neighbors &&
                            Object.keys(apartmantData.neighbors).length > 0 &&
                            floorToPersianWord(
                              Math.ceil(
                                element!.unit! /
                                  (apartmantData.unitCount as number),
                              ),
                            )}
                        </span>
                      ),
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {apartmantData.costs &&
              Object.keys(apartmantData.costs).length > 0 && (
                <div className="rounded-md bg-result-secondary max-h-fit w-fit border-2 border-white border-solid">
                  <div className="text-result-secondary-foreground flex">
                    <span className="p-4 w-36 h-14 text-center">
                      مبلغ (تومان)
                    </span>
                    <span className="p-4 w-40 h-14 text-center">
                      لیست هزینه ها
                    </span>
                    <span className="p-4 w-20 h-14 text-center">شماره</span>
                  </div>
                  <div className="text-result-secondary-foreground w-fit h-fit flex">
                    <div>
                      {apartmantData.costs &&
                        Object.keys(apartmantData.costs).length > 0 &&
                        Object.values(apartmantData.costs).map(
                          (element: any, index: number) => {
                            if (element.title && element.cost) {
                              return (
                                <div className="flex" key={index}>
                                  <span
                                    dir="rtl"
                                    className="w-36 h-14 text-center flex justify-center items-center"
                                  >
                                    {element.cost}
                                  </span>
                                  <span className="w-40 h-14 text-right flex justify-end p-4 items-center">
                                    {element.title}
                                  </span>
                                  <span className="w-20 h-14 flex justify-end p-4 items-center">
                                    {index + 1}
                                  </span>
                                </div>
                              );
                            }
                          },
                        )}
                    </div>
                  </div>
                </div>
              )}

            <div className="rounded-md bg-result-secondary text-result-secondary-foreground max-h-fit ml-auto w-fit border-2 border-white border-solid">
              <div className="flex">
                <span className="min-w-48 flex justify-center items-center min-h-14">
                  {sumOfPaidFee && SeparateNumbers(sumOfPaidFee)}
                </span>
                <span className="min-w-48 flex justify-center items-center min-h-14">
                  جمع کل شارژ ماهایانه
                </span>
              </div>

              {apartmantData.costs &&
                Object.keys(apartmantData.costs).length > 0 && (
                  <div className="flex">
                    <span className="min-w-48 flex justify-center items-center min-h-14">
                      {sumOfCosts && SeparateNumbers(sumOfCosts)}
                    </span>
                    <span className="min-w-48 flex justify-center items-center min-h-14">
                      جمع کل هزینه ها
                    </span>
                  </div>
                )}

              {apartmantData.moneyLeft &&
                Object.keys(apartmantData.moneyLeft).length > 0 &&
                Object.values(apartmantData.moneyLeft).map(
                  (element: any, index: number) => {
                    if (element.title && element.cost) {
                      return (
                        <div className="flex ml-auto" key={index}>
                          <span className="min-w-48 flex justify-center items-center min-h-14">
                            {element.cost}

                            {/* {element.price} */}
                          </span>
                          <span className="min-w-48 flex justify-center items-center min-h-14">
                            {element.title}
                          </span>
                        </div>
                      );
                    }
                  },
                )}

              <div className="flex">
                <span className="min-w-48 flex justify-center items-center min-h-14">
                  {/* {sumOfPaidFee + 0 - sumOfCosts} */}

                  {sumOfPaidFee &&
                    sumOfCosts &&
                    sumOfMoneyLeft &&
                    SeparateNumbers(sumOfPaidFee + sumOfMoneyLeft - sumOfCosts)}
                </span>
                <span className="min-w-48 flex justify-center items-center min-h-14">
                  مانده صندوق
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
