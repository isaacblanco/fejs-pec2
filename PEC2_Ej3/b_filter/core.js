function onlyEven(array) {
  // Usando el filtro si el resultado de la división es cero
  return array.filter((element) => element % 2 === 0);
}

function onlyOneWord(array) {
  // Usando la horribles funciones de regex
  return array.filter((word) => !/\s/.test(word));
}

function positiveRowsOnly(array) {
  //
  return array.filter((row) => row.every((element) => element > 0));
}

function allSameVowels(array) {
  const vowels = new Set("aeiou");

  return array.filter((word) => {
    let foundVowel;
    for (const char of word.toLowerCase()) {
      if (vowels.has(char)) {
        if (!foundVowel) {
          foundVowel = char;
        } else if (foundVowel !== char) {
          return false; //
        }
      }
    }
    return true; // donde coincide
  });
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels,
};
