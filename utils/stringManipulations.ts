//function to replace dashes by whitespaces
export const replaceDashAndSlashByWhitespace = (input: string) => {
  const noDash = input.replace(/-/g, ' ');
  const noDashandSlash = noDash.replace(/\//g, ' ');
  return noDashandSlash;
};

//function to replace whitespaces by dashes for url generation
export const replaceWhitespaceAndSlashesByDash = (input: string) => {
  const noSpaces = input.replace(/\s/g, '-');
  const noSpacesandSlashes = noSpaces.replace(/\//g, '-');
  return noSpacesandSlashes;
};
