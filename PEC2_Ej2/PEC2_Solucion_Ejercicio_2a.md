# PEC 2. Preguntas ejercicio 2

## A. Sustitución linea

En JavaScript, "this" es una palabra clave que se refiere al objeto actual. Pero su comportamiento puede ser confuso, ya que cambia según cómo se llama a una función.

Ejemplo:

Imaginemos que tenemos un objeto service con un método addTodo. Si lo llamamos así:

```
service.addTodo();
```

"this" dentro de addTodo se referirá al objeto service.

**Problema:**

Sin embargo, si asignamos addTodo a una variable y luego la llamamos:

```
const addTodo = service.addTodo;
addTodo();
```

"this" dentro de addTodo ya no será el objeto service, sino que será undefined.

**Solución:**

Para evitar esto, podemos usar dos técnicas:

_Funciones de flecha:_

```
const addTodo = () => {
  // "this" aquí sí es el objeto "service"
  this.addTodo();
};
```

Las funciones de flecha no tienen su propio "this". En su lugar, heredan el "this" del contexto donde se definen. En este caso, "this" es el objeto service.

_Método .bind():_

```
const addTodo = service.addTodo.bind(service);
addTodo();
```

El método .bind() nos permite "atar" una función a un contexto específico. En este caso, atamos addTodo al objeto service.

Debemos escoger, entre usar la funciones flecha que heredan el _this_ o usar _.blind()_ que emparejan la función a un contexto concreto.
