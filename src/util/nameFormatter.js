export function nameFormatter(name) {
  if (!name) return;
  let nameString = "";
  const nameArray = name.split("-");
  console.log(nameArray);
  for (const elem of nameArray) {
    nameString += elem.slice(0,1).toUpperCase() + elem.slice(1) + " ";
  }
  return nameString;
}