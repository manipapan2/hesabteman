const floorToPersianWord = (number: string | number) => {
  switch (number) {
    case 1:
      return "اول";

    case 2:
      return "دوم";

    case 3:
      return "سوم";

    case 4:
      return "چهارم";

    case 5:
      return "پنجم";

    default:
      break;
  }
};

export default floorToPersianWord;
