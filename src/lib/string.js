export const toTitleCase = (str) =>
  str.replace(
    /\w*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
