/* 

findOne define una constante que recibe tres argumentos:

- list: es una lista de objetos
- criteria: es un objeto con dos propiedades: key y value
    - key: es la clave del objeto a buscar
    - value: es el valor del objeto a buscar
- Promise: define una función que recibe dos argumentos:
    - resolve --> función que se ejecuta cuando la promesa se resuelve
    - reject --> función que se ejecuta cuando la promesa se rechaza
*/

// findOne sigue utilizandose para buscar un elemento en una lista de objetos
// He reducido el código con las arrow functions para que la complejidad sea menor
const findOne = (list, { key, value }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const element = list.find((element) => element[key] === value);
      element ? resolve(element) : reject({ msg: "ERROR: Element Not Found" });
    }, 2000);
  });

// findUser utiliza la sintaxis async/await para manejar la asincronía
//
const findUser = async ({ key, value }) => {
  try {
    // Aquí esperamos a que la promesa de findOne se resuelva y deja el resultado en la variable user
    const user = await findOne(users, { key, value }); // reenviamos a findOne con await
    console.log(`User : ${user.name}`); // Mostramos por consola el resultado
  } catch (error) {
    // Si se produce un error
    console.log(error.msg); // Lo mismo de antes
  }
};

// Array de objetos de datos
const users = [
  { name: "Carlos", rol: "Teacher" },
  { name: "Ana", rol: "Boss" },
];

console.log("findOne success"); // Mostramos un literal por la consola
findUser({ key: "name", value: "Carlos" }); // Sustituimos la función findOne por la función findUser

console.log("findOne error"); // Mostramos un literal por la consola, aparece antes que 'Carlos'
findUser({ key: "name", value: "Fermin" }); // Sustituimos la función findOne por la función findUser

/*
Habiendo ejecutado el código anterior la salida es la que se representa a continuación:
    
"findOne success"
"findOne error"
"User : Carlos"
"ERROR: Element Not Found"
*/
