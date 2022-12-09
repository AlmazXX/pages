export const makeSlug = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/[^a-z0-9]+/g, "-");
  return str;
};

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1)
}