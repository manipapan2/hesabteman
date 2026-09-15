import separateNumbers from "@/utils/separateNumbers.ts";
import floorToPersianWord from "@/utils/floorToPersianWord.ts";
import { useContext, useEffect, useState, type ReactNode } from "react";
import ApartmantContext from "@/Context/ApartmantData/ApartmantContext.ts";
import { cn } from "@/lib/utils.ts";

export default function Render({ ref }: { ref: React.Ref<HTMLDivElement> }) {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;

  return (
    <div
      ref={ref}
      dir="ltr"
      className="bg-result-background relative p-8 pb-16 w-fit h-fit min-w-210"
    >
      <h2 className="text-xl text-result- mb-5 text-center">
        صورت وضعیت شارژ {apartmantData?.month} {apartmantData?.year}
      </h2>

      <div className="flex gap-10 w-fit m-auto">
        <FeeTable />
        <div className="flex flex-col gap-10">
          <CostsTable />
          <MoneyLeftTable />
        </div>
      </div>

      <span className="absolute right-4 bottom-4 text-[0.7rem]">
        ساخته شده با حسابتمان
      </span>
    </div>
  );
}

const FeeTable = () => {
  return (
    <div className="rounded-md overflow-hidden h-fit">
      <table dir="rtl" className="w-full">
        <Thead>
          <Tr>
            <Th className="px-6 py-4">طبقه</Th>
            <Th className="px-6 py-4">واحد</Th>
            <Th className="px-6 py-4">نام خانوادگی</Th>
            <Th className="px-6 py-4">وضعیت شارژ</Th>
          </Tr>
        </Thead>

        <tbody>
          <FeeTableRows />
        </tbody>
      </table>
    </div>
  );
};

const FeeTableRows = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;

  if (
    apartmantData.neighbors &&
    Object.keys(apartmantData.neighbors).length > 0
  ) {
    return Object.values(apartmantData.neighbors).map(
      (neighbor: any, index: number) => (
        <Tr
          key={index}
          className="bg-result-secondary even:bg-result-secondary/80"
        >
          <Th>{floorToPersianWord(neighbor.floor)}</Th>
          <Th>{neighbor.unit}</Th>
          <Th>{neighbor.name}</Th>
          <Th
            className={cn(
              neighbor.hasPaidFee ? "text-green-500" : "text-gray-500",
            )}
          >
            {neighbor.hasPaidFee ? "پرداخت شده" : "در دست پرداخت"}
          </Th>
        </Tr>
      ),
    );
  }
};

const CostsTable = () => {
  return (
    <div className="rounded-md overflow-hidden">
      <table dir="rtl" className="w-full">
        <Thead>
          <Tr>
            <Th className="px-6 py-4">عنوان هزینه</Th>
            <Th className="px-6 py-4">مبلغ (تومان)</Th>
          </Tr>
        </Thead>

        <tbody>
          <CostsTableRows />
        </tbody>
      </table>
    </div>
  );
};

const CostsTableRows = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;

  if (apartmantData.costs && Object.keys(apartmantData.costs).length > 0) {
    return Object.values(apartmantData.costs).map(
      (element: any, index: number) => {
        if (element.title && element.cost) {
          return (
            <Tr
              key={index}
              className="bg-result-secondary even:bg-result-secondary/80"
            >
              <Th>{element.title}</Th>
              <Th>{separateNumbers(element.cost)}</Th>
            </Tr>
          );
        }
      },
    );
  }
};

const MoneyLeftTable = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;
  const [sumOfPaidFee, setSumOfPaidFee] = useState<number>();
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

    setSumOfPaidFee(paidFeeSum);
    setSumOfCosts(costsSum);
    setSumOfMoneyLeft(moneyLeftSum);
  }, [apartmantData]);

  return (
    <div className="rounded-md overflow-hidden">
      <table dir="rtl" className="w-full">
        <Thead>
          <Tr>
            <Th>عنوان</Th>
            <Th>مبلغ (تومان)</Th>
          </Tr>
        </Thead>

        <tbody className="[&>tr]:bg-result-secondary [&>tr]:even:bg-result-secondary/80">
          {sumOfPaidFee !== undefined && (
            <Tr>
              <Th>جمع کل شارژ ماهایانه</Th>
              <Th>{separateNumbers(sumOfPaidFee)}</Th>
            </Tr>
          )}

          <MoneyLeftTableRows
            sumOfPaidFee={sumOfPaidFee}
            sumOfCosts={sumOfCosts}
            sumOfMoneyLeft={sumOfMoneyLeft}
          />
        </tbody>
      </table>
    </div>
  );
};

interface MoneyLeftTableRowsProps {
  sumOfPaidFee: number | undefined;
  sumOfCosts: number | undefined;
  sumOfMoneyLeft: number | undefined;
}

const MoneyLeftTableRows = ({
  sumOfPaidFee,
  sumOfCosts,
  sumOfMoneyLeft,
}: MoneyLeftTableRowsProps) => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;

  return (
    <>
      {apartmantData.costs && Object.keys(apartmantData.costs).length > 0 && (
        <Tr>
          <Th>جمع کل هزینه ها</Th>
          <Th>{sumOfCosts && separateNumbers(sumOfCosts)}</Th>
        </Tr>
      )}

      {apartmantData.moneyLeft &&
        Object.keys(apartmantData.moneyLeft).length > 0 &&
        Object.values(apartmantData.moneyLeft).map(
          (element: any, index: number) => {
            if (element.title && element.cost) {
              return (
                <Tr key={index}>
                  <Th>{element.title}</Th>
                  <Th>{element.cost}</Th>
                </Tr>
              );
            }
          },
        )}

      {sumOfPaidFee !== undefined &&
        sumOfCosts !== undefined &&
        sumOfMoneyLeft !== undefined && (
          <Tr>
            <Th>مانده صندوق</Th>
            <Th>
              {separateNumbers(sumOfPaidFee + sumOfMoneyLeft - sumOfCosts)}
            </Th>
          </Tr>
        )}
    </>
  );
};

const Thead = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <thead className={cn("bg-result-secondary/60", className)}>
      {children}
    </thead>
  );
};

const Tr = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <tr className={cn(className)}>{children}</tr>;
};

const Th = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <th className={cn("p-4 border-l border-r border-black/5", className)}>
      {children}
    </th>
  );
};
