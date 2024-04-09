function sum(array) {
  // Con reduce podemo sumar todos los elementos
  return array.reduce((accumulator, element) => accumulator + element, 0);
}

function productAll(array) {
  // flat es una forma de concatenar arrays
  const flatArray = array.flat(); // Solo si tiene multiple dimensiones
  return flatArray.reduce((accumulator, element) => accumulator * element, 1);
}

function objectify(array) {
  // De nuevo usando reduce para transformar un array en un objeto
  return array.reduce((object, keyValue) => {
    object[keyValue[0]] = keyValue[1]; // [key, value]
    return object;
  }, {});
}

function luckyNumbers(array) {
  // Nota: si solo hay un número deberismos controlarlo
  if (array.length === 1) {
    return `Your lucky numbers are: ${array[0]}`;
  }
  // Obtenemos todos los elementos menos el último unidos por coma
  const numbersWithoutLast = array.slice(0, -1).join(", ");
  // Controlamos el último para agregar ", and" al resto, ajustándose a la expectativa del test
  return `Your lucky numbers are: ${numbersWithoutLast}, and ${
    array[array.length - 1]
  }`;
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers,
};
