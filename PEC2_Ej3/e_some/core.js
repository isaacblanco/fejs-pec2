// Check to see if any of the elements in the
// array are numbers greater than 10.

function anyGreaterThan10(input) {
  // Use some to check if any element is greater than 10
  return input.some((element) => element > 10);
}

// Check to see if any of the strings in
// the array is longer than 10 characters.

function longWord(input) {
  // uso de lenght para revisar la longitud
  return input.some((word) => word.length > 10);
}

// Check to see if any of the elements in
// the matrix are true.

function truePossibilities(input) {
  // Usando some para revisar si alguno de los elementos de la matriz es true
  return input.some((row) => row.some((element) => element === true));
}

// Check to see if 'Lost' is in
// the phrase (using some).
function lostCarcosa(input) {
  /*
  // Unimos
  const joinedString = input.join(" ");
  // Iteramos
  for (const word of joinedString.split(" ")) {
    if (word === "Lost") {
      return true;
    }
  }
  // "Lost" no se encontro
  return false;
  */

  const joinedString = input.join(" ");
  // Use reduce to check if "Lost" is present
  return joinedString
    .split(" ")
    .reduce((found, word) => found || word === "Lost", false);
}

module.exports = {
  anyGreaterThan10,
  longWord,
  truePossibilities,
  lostCarcosa,
};
