export function removeInvisibles(string) {
  const stringMinusChar10 = string.split(String.fromCharCode(10)).join(" ");
  const stringMinusChar12 = stringMinusChar10.split(String.fromCharCode(10)).join(" ");
  return stringMinusChar12;
}