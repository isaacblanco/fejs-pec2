function multiplyBy10(array) {
  // Mapeo por elementos del array multiplicando por 10
  return array.map((element) => element * 10);
}

function shiftRight(array) {
  if (array.length <= 1) return array;

  // Mapeo por cada elemento del array y agregando el primer elemento al final del array
  const lastElement = array.pop();
  array.unshift(lastElement);
  return array;
}

function onlyVowels(array) {
  // Usando el metodo replace() para eliminar los caracteres que no sean vocales con regExp
  return array.map((word) => word.replace(/[^aeiou]/gi, ""));
}

function doubleMatrix(array) {
  return array.map((row) => row.map((element) => element * 2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix,
};
