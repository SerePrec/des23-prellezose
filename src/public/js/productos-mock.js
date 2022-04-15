const query = `
  query {
    productsMock{
      id
      title
      price
      thumbnail
    }
  }
`;

async function fetchProducts() {
  return fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ query })
  }).then(res => res.json());
}

function renderProducts(list) {
  let htmlCode = "";
  if (list.length) {
    htmlCode += `
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Título</th>
                <th scope="col">Precio</th>
                <th scope="col">Imágen</th>
              </tr>
            </thead>
            <tbody>`;
    list.forEach(product => {
      htmlCode += ` 
              <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td><img class="table__image" src="${product.thumbnail}" alt="producto" /></td>
              </tr>`;
    });
    htmlCode += `      
            </tbody >
          </table >`;
  } else {
    htmlCode += `
          <div class="container p-5 mb-4 bg-warning rounded-3">
            <div class="py-5">
              <h3 class="display-6 fw-bold">¡Oops!, listado vacío</h1>
              <p>No se encontraron productos cargados.</p>
            </div>
          </div >`;
  }
  return htmlCode;
}

fetchProducts()
  .then(({ data }) => renderProducts(data.productsMock))
  .then(htmlCode => {
    document.getElementById("contenido").innerHTML = htmlCode;
  })
  .catch(err => console.log("Error al obtener productos: ", err));
