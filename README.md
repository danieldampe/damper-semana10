Para la aplicación se utilizo `fetch` para crear una función asíncrona que recibe una url y una cantidad especifica para limitar las cantidad de datos a utilizar en la aplicación.

```js
const getData = async ({ url, length }) => {
try {
const response = await fetch(url)
if (!response.ok) throw new Error('Something happened')
const data = await response.json()
return data.slice(0, length)
} catch (error) {
console.error(error)
}
}
```

Luego se uso una IIFE asíncrona para la ejecución del código usando la función previamente creada.

Se itera cada uno de los posts y los comentarios obtenidos para añadir una cadena de texto a una variable template que luego pasará al DOM.
