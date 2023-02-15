export const allTypes = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];
export const allGenerations = [1,2,3,4,5,6,7,8,9];
export const allGenerationsNumerals = ["I","II","III","IV","V","VI","VII","VIII","IX"];
export const convertNumeralToNumber = (numeral) => {
  return allGenerationsNumerals.indexOf(numeral) + 1;
}