//function to replace dashes by whitespaces
export const replaceCharactersByWhitespace = (input: string) => {
  let dashAndSlashToWhitespace = input.replace(/[-\/]/g, ' ');
  dashAndSlashToWhitespace = removeRepeatingSpaces(dashAndSlashToWhitespace);
  dashAndSlashToWhitespace = removePercentageSign(dashAndSlashToWhitespace);
  dashAndSlashToWhitespace = removeHashtagSign(dashAndSlashToWhitespace);

  return removeCommas(dashAndSlashToWhitespace);
};

//function to replace whitespaces by dashes for url generation
export const replaceCharactersByDash = (input: string) => {
  let noSpacesandSlashes = input.replace(/[\s\/]/g, '-');
  noSpacesandSlashes = removeRepeatingDashes(noSpacesandSlashes);
  noSpacesandSlashes = removePercentageSign(noSpacesandSlashes);
  noSpacesandSlashes = removeHashtagSign(noSpacesandSlashes);
  return removeCommas(noSpacesandSlashes);
};

const removePercentageSign = (input: string) => {
  return input.replace(/%/g, '');
};

const removeHashtagSign = (input: string) => {
  return input.replace(/#/g, '');
};

const removeCommas = (input: string) => {
  return input.replace(/,/g, '');
};

const removeRepeatingDashes = (input: string) => {
  return input.replace(/-{2,}/g, '-');
};

const removeRepeatingSpaces = (input: string) => {
  return input.replace(/  +/g, ' ');
};
