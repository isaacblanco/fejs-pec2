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
/*
const findOne = (list, { key, value }, { onSuccess, onError }) => {
    setTimeout(() => {
      const element = list.find((element) => element[key] === value); // Se busca el elemento en la lista usando el metodo find
      element ? onSuccess(element) : onError({ msg: "ERROR: Element Not Found" }); // Respuesta terniaria en función del resultado
    }, 2000); // 2 segundos para establecer el tiempo de espera
  };
  */

const findOne = (list, { key, value }) => {
  // Podemos reducir los argumentos, sin los callbacks, como se pide
  return new Promise((resolve, reject) => {
    // Incluimos la función Promise, con
    setTimeout(() => {
      const element = list.find((element) => element[key] === value);
      element ? resolve(element) : reject({ msg: "ERROR: Element Not Found" });
    }, 2000);
  });
};

/*
YA NO SON NECESARIAS, dado que se incluyen en las promesas
const onSuccess = ({ name }) => console.log(`user: ${name}`); // Definciíon de la función de respuesta onSuccess
const onError = ({ msg }) => console.log(msg); // Definición de la función de respuesta onError
*/

// Array de objetos de datos
const users = [
  { name: "Carlos", rol: "Teacher" },
  { name: "Ana", rol: "Boss" },
];

console.log("findOne success"); // Mostramos un literal por la consola
findOne(users, { key: "name", value: "Carlos" })
  .then((user) => console.log(`user: ${user.name}`)) // En caso de éxito
  .catch((error) => console.log(error)); // Cuando ocurre el error

// findOne(users, { key: "name", value: "Carlos" }, { onSuccess, onError }); // En este caso se devuelve 'Carlos' con retraso, al llamar a la función find pasando los datos y las funciones

console.log("findOne error"); // Mostramos un literal por la consola, aparece antes que 'Carlos'
findOne(users, { key: "name", value: "Fermin" })
  .then((user) => console.log(`user: ${user.name}`)) // En caso de éxito
  .catch((error) => console.log(error)); // Cuando se produce un error
// findOne(users, { key: "name", value: "Fermin" }, { onSuccess, onError }); // En este caso se devuelve 'Element not found' al llamar a la función find pasando los datos y las funciones

/*
  
  Habiendo ejecutado el código anterior la salida es la que se representa a continuación:
  
"findOne success"
"findOne error"
"user: Carlos"

  // [object Object] 
{
  "msg": "ERROR: Element Not Found"
}

La diferencia esta en el objeto que se devuelve si se produce un error, de devuelve objeto
    */
