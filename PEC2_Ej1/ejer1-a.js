/* 

findOne define una constante que recibe tres argumentos:

- list: es una lista de objetos
- criteria: es un objeto con dos propiedades: key y value
    - key: es la clave del objeto a buscar
    - value: es el valor del objeto a buscar
- callbacks: es un objeto con dos funciones: 
    onSuccess --> encuentra el argumento
    y onError --> si no encuentra ningún argumento
*/
const findOne = (list, { key, value }, { onSuccess, onError }) => {
  setTimeout(() => {
    const element = list.find((element) => element[key] === value); // Se busca el elemento en la lista usando el metodo find
    element ? onSuccess(element) : onError({ msg: "ERROR: Element Not Found" }); // Respuesta terniaria en función del resultado
  }, 2000); // 2 segundos para establecer el tiempo de espera
};

const onSuccess = ({ name }) => console.log(`user: ${name}`); // Definciíon de la función de respuesta onSuccess
const onError = ({ msg }) => console.log(msg); // Definición de la función de respuesta onError

// Array de objetos de datos
const users = [
  { name: "Carlos", rol: "Teacher" },
  { name: "Ana", rol: "Boss" },
];

console.log("findOne success"); // Mostramos un literal por la consola
findOne(users, { key: "name", value: "Carlos" }, { onSuccess, onError }); // En este caso se devuelve error al llamar a la función find pasando los datos y las funciones

console.log("findOne error"); // Mostramos un literal por la consola
findOne(users, { key: "name", value: "Fermin" }, { onSuccess, onError }); // En este caso se devuelve 'Element not found' al llamar a la función find pasando los datos y las funciones

/*

Habiendo ejecutado el código anterior confirmo que 
la salida es la que se representa a continuación:

  findOne success
  findOne error
   //wait 2 seconds
  user: Carlos
  ERROR: Element Not Found

  */
