import separateNumbers from "@/utils/separateNumbers.ts";
import floorToPersianWord from "@/utils/floorToPersianWord.ts";
import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import ApartmantContext from "@/contexts/ApartmantData/ApartmantContext.ts";
import { cn } from "@/lib/utils.ts";
import * as htmlToImage from "html-to-image";
import { Download } from "lucide-react";

export default function Sheet() {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;

  const sheetRef = useRef<HTMLDivElement>(null);

  const convertToImage = () => {
    htmlToImage.toPng(sheetRef.current!).then((imageURL: string) => {
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = `فاکتور ساختمان ${apartmantData.month} ${apartmantData.year}`;
      link.click();
    });
  };

  return (
    <div className="relative h-full">
      <div
        ref={sheetRef}
        dir="ltr"
        className="bg-result-background relative m-auto h-fit max-h-full w-fit min-w-210 zoom-40 overflow-y-auto p-8 lg:zoom-70 xl:zoom-90"
      >
        <h2 className="text-result- mb-5 text-center text-xl">
          صورت وضعیت شارژ {apartmantData?.month} {apartmantData?.year}
        </h2>

        <div className="m-auto flex w-fit gap-10">
          <FeeTable />
          <div className="flex flex-col gap-10">
            <CostsTable />
            <ProfitTable />
          </div>
        </div>

        <span className="mt-4 mb-2 flex w-full justify-end text-[0.7rem]">
          ساخته شده با حسابتمان
        </span>
      </div>

      <button
        onClick={() => convertToImage()}
        className="bg-primary text-primary-foreground absolute -top-4 -right-4 rounded-full p-3 hover:cursor-pointer"
      >
        <Download />
      </button>
    </div>
  );
}

const FeeTable = () => {
  return (
    <div className="h-fit overflow-hidden rounded-md">
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
    <div className="overflow-hidden rounded-md">
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

const ProfitTable = () => {
  const apartmantContext = useContext(ApartmantContext);
  const { apartmantData } = apartmantContext;
  const [sumOfPaidFee, setSumOfPaidFee] = useState<number>();
  const [sumOfCosts, setSumOfCosts] = useState<number>();
  const [sumOfProfit, setSumOfProfit] = useState<number>();

  useEffect(() => {
    let paidFeeSum = 0;
    let costsSum = 0;
    let profitSum = 0;

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

    if (apartmantData.profit) {
      for (const element of Object.values(apartmantData.profit)) {
        if (element.title && element.cost) {
          profitSum += element.cost;
        }
      }
    }

    setSumOfPaidFee(paidFeeSum);
    setSumOfCosts(costsSum);
    setSumOfProfit(profitSum);
  }, [apartmantData]);

  return (
    <div className="overflow-hidden rounded-md">
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

          <ProfitTableRows
            sumOfPaidFee={sumOfPaidFee}
            sumOfCosts={sumOfCosts}
            sumOfProfit={sumOfProfit}
          />
        </tbody>
      </table>
    </div>
  );
};

interface ProfitTableRowsProps {
  sumOfPaidFee: number | undefined;
  sumOfCosts: number | undefined;
  sumOfProfit: number | undefined;
}

const ProfitTableRows = ({
  sumOfPaidFee,
  sumOfCosts,
  sumOfProfit,
}: ProfitTableRowsProps) => {
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

      {apartmantData.profit &&
        Object.keys(apartmantData.profit).length > 0 &&
        Object.values(apartmantData.profit).map(
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
        sumOfProfit !== undefined && (
          <Tr>
            <Th>مانده صندوق</Th>
            <Th>{separateNumbers(sumOfPaidFee + sumOfProfit - sumOfCosts)}</Th>
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
    <th className={cn("border-r border-l border-black/5 p-4", className)}>
      {children}
    </th>
  );
};
