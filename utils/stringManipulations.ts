//function to replace dashes by whitespaces
export const replaceCharactersByWhitespace = (input: string) => {
  const dashAndSlashToWhitespace = input.replace(/[-\/]/g, ' ');
  return removeCommas(dashAndSlashToWhitespace);
};

//function to replace whitespaces by dashes for url generation
export const replaceCharactersByDash = (input: string) => {
  const noSpacesandSlashes = input.replace(/[\s\/]/g, '-');
  return removeCommas(noSpacesandSlashes);
};

const removeCommas = (input: string) => {
  return input.replace(/,/g, '');
};
