export default function separateNumbers(number: string | number): string {
  const numbersReg = /^\d+$/;
  const stringifiedNumber = number.toString();
  if (stringifiedNumber.length > 0 && numbersReg.test(stringifiedNumber)) {
    const seperatedNumbers = stringifiedNumber.replace(
      /\B(?=(?:\d{3})+(?!\d))/g,
      ",",
    );
    return seperatedNumbers;
  }
  return "";
}
