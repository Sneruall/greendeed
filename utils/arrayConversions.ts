export const convertCommaSeparatedStringToArray = (stringValue: string[]) => {
  console.log(stringValue);
  if (!stringValue) {
    return;
  }
  if (stringValue.includes(',')) {
    console.log(
      stringValue
        .toString()
        .replace(/\s*,\s*/g, ',')
        .split(',')
        .filter((a: string) => a)
    );
    return stringValue
      .toString()
      .replace(/\s*,\s*/g, ',')
      .split(',')
      .filter((a: string) => a);
  } else {
    return stringValue;
  }
};
