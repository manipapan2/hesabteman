const separateNumbers = (number: number | string): string => {
  const numbersReg = /^-?\d+$/;
  const positiveNumbersReg = /^\d+$/;
  const stringifiedNumber = number.toString();

  if (!numbersReg.test(stringifiedNumber)) {
    return "";
  }

  if (positiveNumbersReg.test(stringifiedNumber)) {
    return formatNumbersBy3(stringifiedNumber);
  }

  const stringifiedPositiveNumber = stringifiedNumber.replace("-", "");
  const formattedNumber = formatNumbersBy3(stringifiedPositiveNumber);
  const negativedFormattedNumber = `-${formattedNumber}`;

  return negativedFormattedNumber;
};

const formatNumbersBy3 = (number: string): string => {
  return number.replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};

export default separateNumbers;
