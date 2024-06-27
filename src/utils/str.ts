export const replaceParams = (
  format: string,
  params: { [key: string]: string | string[] },
) => {
  const names = Object.keys(params);
  if (names.length === 0) {
    return format;
  }
  const regex = new RegExp(":(" + names.join("|") + ")", "g");
  return format.replace(regex, (m, $1) => params[$1].toString() || m);
};
