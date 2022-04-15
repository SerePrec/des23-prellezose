# Desafío 22 - Programación Backend

### CoderHouse

## REFORMAR PARA USAR GRAPHQL

Refactoricemos el código del proyecto que venimos trabajando para cambiar de API RESTful a GraphQL API.

### Consigna

En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.

Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.

Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

### Deploy en Heroku (Temporal):

https://des22-prellezose.herokuapp.com/

### Ejecución

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm run dev`. De lo contrario, para ejecutarlo en "modo producción", utilizar `npm start`.

Se puede pasar por parámetros de argumento dos opciones:
| Opción | Valor | Defecto |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-p --port --PORT` | Número de puerto de escucha del servidor | 8080 |
| `-m --mode --MODE` | Módo de ejecución del servidor. `FORK` o `CLUSTER` | FORK |

Se puede seleccionar entre cuatro métodos de **persistencia de datos** a través de la variable de entorno `PERS`.

| Key             | Descripción                                               |
| --------------- | --------------------------------------------------------- |
| `mem`           | Persistencia en memoria del servidor (Opción por defecto) |
| `file`          | Persistencia usando el sistema de archivos                |
| `mongodb`       | Persistencia en base de datos MongoDB local               |
| `mongodb_atlas` | Persistencia en base de datos MongoDB Atlas               |

Esta selección se hace pasando el valor correspondiente de la key en la variable de entorno `PERS` a la hora de levantar el servidor.
La forma de hacerlo depende de la terminal que se esté ejecutando. Un ejemplo desde linux sería:

```sh
$ PERS=mongodb_atlas node .
```

### Vistas

Existen las siguientes vistas que proveen una manera amena de probar el desafío.
Estas vistas se encuentran en las rutas:

- **/** : es la vista principal en donde se encuentra el formulario de carga de productos y el centro de mensajes (chat). Utiliza **websockets**. Requiere autenticación.

- **/login** : formulario de login.

- **/login-error** : vista a la que redirige tras un error en el login.

- **/register** : formulario de registro.

- **/register-error** : vista a la que redirige tras un error en el login.

- **/logout** : vista a la que se accede tras hacer el logout y luego de 5 segundos redirige a home.

- **/productos-mock** : es donde se muestra en una tabla el mock de productos devueltos por la llamada a la API en la ruta de test. Requiere autenticación

- **/info**: muestra información relativa a la app

### API

Se montó la **API GraphQL** sobre la ruta `/api`.
En su router encontramos la definición del schema de graphql, como se muestra a continuación:

```js
// GraphQL schema
const schema = buildSchema(`
  type Query {
    products: [Product!]!
    product(id:ID!): Product!
    productsMock: [Product!]!
    randoms(cant: Int): [RandomPair!]!
  }
  type Mutation {
    createProduct(data: ProductCreateInput!): Product!
    updateProduct(id:ID!, data: ProductUpdateInput!): Product!
    deleteProduct(id: ID!): ID!
  }
  type Product {
    id: ID!
    title: String!
    price: Float!
    thumbnail: String!
    timestamp: String!
  }
  type RandomPair {
    number: String!
    occurrency: Int!
  }
  input ProductCreateInput {
    title: String!
    price: Float!
    thumbnail: String!
  }
  input ProductUpdateInput {
    title: String
    price: Float
    thumbnail: String
  }
`);
```

Cuando nos encontramos en el ambiente de **desarrollo**, en esta misma ruta se ofrece el IDE de **GraphiQL**, el cuál es muy útil para explorar la API y obtener documentación de la misma.

### Detalles y comentarios

Se migró toda la API REST a una **API GraphQL**. Por lo que los endpoints de productos, productos-mock y números randoms, fueron fusionados en la ruta `/api` cuyo esquema se mostró más arriba.

Los cambios principales se centraron en el router y controladores.  
Los routers individuales fueron reemplazados por un único router que reúne toda la funcionalidad.  
Los controladores fueron modificados para tomar por parámetro los datos como GraphQL los provee y devolver las respuestas adecuadas también para que GraphQL las procese y exponga. Es decir, no están más presentes en ellos los objetos **req y res**.

A fin de no introducir cambios en como se pensó la API originalmente (según se fue pidiendo en algún desafío), mantuve la autenticación requerida sobre la misma para poder operar. Por lo que antes de llegar al middleware de `graphqlHTTP`, permanece el middleware `isAuth` que comprueba que nos encontremos autenticados. De no ser así se devuelve un mensaje de error indicando esto.

Por el lado del front, el home continúa como fue pedido en desafíos anteriores, en donde la carga de productos y mensajes se hace utilizando **websockets**, por lo que no fueron necesarios cambios para continuar operando.  
Los cambios fueron se realizaron sobre la vista **/productos-mock**, en donde se hacía una llamada a la api respectiva para generar el listado. En este caso las peticiones **fetch** fueron re adecuadas incluyendo el query respectivo para GraphQL.

Hice algunas pruebas sobre la api GraphQL que muestro a continuación. Utilicé GraphiQL y postman a tal fin.

Query products

<div align="center">
  <img src="docs/query-products.png" alt="Resultados del query"/>
</div>
<br/>

Query product por id 6238c664082cb0424fa197a4

<div align="center">
  <img src="docs/query-product.png" alt="Resultados del query"/>
</div>
<br/>

Query randoms con cantidad = 5

<div align="center">
  <img src="docs/query-randoms.png" alt="Resultados del query"/>
</div>
<br/>

Mutation createProduct

<div align="center">
  <img src="docs/mutation-create.png" alt="Resultados del query"/>
</div>
<br/>

Mutation updateProduct

<div align="center">
  <img src="docs/mutation-update.png" alt="Resultados del query"/>
</div>
<br/>

Mutation deleteProduct

<div align="center">
  <img src="docs/mutation-delete.png" alt="Resultados del query"/>
</div>
