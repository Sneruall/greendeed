export const convertCommaSeparatedStringToArray = (stringValue: string[]) => {
  if (!stringValue) {
    return;
  }
  if (stringValue.includes(',')) {
    return stringValue
      .toString()
      .replace(/\s*,\s*/g, ',')
      .split(',')
      .filter((a: string) => a);
  } else {
    return stringValue;
  }
};
