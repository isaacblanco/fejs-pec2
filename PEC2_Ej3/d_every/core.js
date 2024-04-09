// Check to see if all elements in an array
// are even numbers.

function allEven(input) {
  // De nuevo usando el resto para determinar si es par
  return input.every((element) => element % 2 === 0);
}

// Check to see if all elements in an array
// are of the same type.
function allSameType(input) {
  // Comprobación  según su typeof
  const baseType = typeof input[0];
  return input.every((element) => typeof element === baseType); //
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.
function positiveMatrix(input) {
  // Revisión del contenido del array si es mayor que cero
  return input.every((row) =>
    row.every((element) => Array.isArray(row) && element > 0)
  );
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.
function allSameVowels(input) {
  // Uso de constante para almacenar las vocales
  const vowels = new Set("aeiou");

  return input.every((word) => {
    let foundVowel; // Variable para almacenar la vocal encontrada
    for (const char of word.toLowerCase()) {
      if (vowels.has(char)) {
        if (!foundVowel) {
          // Si no se ha encontrado una vocal
          foundVowel = char;
        } else if (foundVowel !== char) {
          // Si se ha encontrado una vocal diferente
          return false; //
        }
      }
    }
    return true; // Solo si coincidio las mismas vocales
  });
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels,
};
