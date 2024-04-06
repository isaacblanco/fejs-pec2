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

// findAllUsers utiliza la sintaxis async/await y Promise.all para ejecutar las llamadas a findOne en paralelo
const findAllUsers = async ({ keys, values }) => {
  try {
    // Convertimos las claves y valores en un array de objetos
    const findToMap = keys.map((key, index) => ({
      key,
      value: values[index],
    }));

    // Usando map, se monta un array de promesas con la petición de findOne
    const arrPromises = findToMap.map((request) => findOne(users, request)); // Array de usuarios, con la petición

    // Había usado Promise.all, pero si falla uno de las promesas se rechaza, lo cambio por allSettled
    const arrResults = await Promise.allSettled(arrPromises);

    console.log(arrResults); // Contenido de todas las respuestas de las promesas

    // Y trato los resultados de forma independiente
    arrResults.forEach((result) => {
      // console.log("reject: ", reject);
      // Mostramos por consola el resultado encontrado
      if (result.status === "fulfilled") {
        console.log(`User '${result.value.name}' found`); // Mostramos por consola el resultado del encontrado
      } else if (result.status === "rejected") {
        console.log(result.reason.msg);
      }
    });
  } catch (error) {
    // Si se produce un error
    console.log(error.msg);
  }
};

// Array de objetos de datos
const users = [
  { name: "Carlos", rol: "Teacher" },
  { name: "Ana", rol: "Boss" },
];

// Búsqueda
const keys = ["name", "name"];
const values = ["Carlos", "Fermin"];

console.log("findAll in parallel"); // Mostramos un literal por la consola
findAllUsers({ keys, values }); // Mandamos los arrays con las busquedas por clave y valor

/*
Habiendo ejecutado el código anterior la salida es la que se representa a continuación:

(2) [{…}, {…}] --> este es el array de resultados, solo por confirmar que todo era ok
ejer1-d.js:46 User 'Carlos' found
ejer1-d.js:48 ERROR: Element Not Found
*/
