//function to replace dashes by whitespaces
export const replaceDashByWhitespace = (input: string) => {
  return input.replace(/-/g, ' ');
};

//function to replace whitespaces by dashes for url generation
export const replaceWhitespaceByDash = (input: string) => {
  return input.replace(/\s+/g, '-');
};
