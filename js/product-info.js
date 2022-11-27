let productInfo = [];
let coments = [];
let Json_product_info = localStorage.getItem("prodID");
let Url_product =
  "https://japceibal.github.io/emercado-api/products/" +
  Json_product_info +
  ".json";
let Url_coment =
  "https://japceibal.github.io/emercado-api/products_comments/" +
  Json_product_info +
  ".json";

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(Url_product).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;

      showProductInfo(productInfo);
      console.log(productInfo.name);
    }
  });
});

function showProductInfo(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.images.length; i++) {
    let imageSrc = array.images[i];
    if (i == 0) {
      htmlContentToAppend += `
            <div class="carousel-item active">
              <img class="d-block w-100" src="${array.images[0]}" alt="First slide">
            </div>`;
    } else {
      htmlContentToAppend += `
            <div class="carousel-item">
              <img class="d-block w-100" src="${imageSrc}" alt="">
            </div>           
    `;
    }
  }

  document.getElementById("container_carousel").innerHTML = htmlContentToAppend;

  document.getElementById("container_info").innerHTML = ` 
  <div>
        <h1> ${array.name} </h1>
        <hr>
        <h3 bold> Precio </h3>
        <p> ${array.currency} ${array.currency} ${array.cost}</p>  
        <h3 bold>Descripcion</h3>
        <p> ${array.description}</p>
        <h3 bold>Categoria</h3>
        <p> ${array.category}</p>
        <h3 bold>Cantidad de vendidos</h3>
        <p> ${array.soldCount} </p>
    <h3 bold>Imagenes ilustrativas</h3><br>
  </div>
    `;

  related(array);
}

//Funcion para imprimir los productos relacionados
function related(array) {
  let htmltoprint = "";
  let { relatedProducts } = array;
  for (let products of relatedProducts) {
    let { id, name, image } = products;

    htmltoprint += `
     <div onclick="setProdID(${id})" >
      <div class="col"> 
      <h2 class="title" >${name}</h2>
        <img src="${image}" class="img-thumbnail col-4 img">
        </div>
   </div>

  
  `;
    document.getElementById("related").innerHTML = htmltoprint;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(Url_coment).then(function (resultObj) {
    if (resultObj.status === "ok") {
      coments = resultObj.data;

      showComents();
      console.log(coments);
    }
  });
});

function showComents() {
  for (let coment of coments) {
    document.getElementById("coments").innerHTML += `
        <div class="container-fluid">
            <P><b>${coment.user}</b> ${coment.dateTime} </P>
            ${
              prueba(coment)
              // coment.score === 1
              // ? `<span class="fa fa-star checked"></span>
              // <span class="fa fa-star"></span>
              // <span class="fa fa-star"></span>
              // <span class="fa fa-star"></span>
              // <span class="fa fa-star"></span>`
              // : coment.score === 2
              // ? `<span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star"></span>
              // <span class="fa fa-star"></span>
              // <span class="fa fa-star"></span>`
              // : coment.score === 3
              // ? `<span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star"></span>
              // <span class="fa fa-star"></span>`
              // : coment.score === 4
              // ? `<span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star"></span>`
              // : coment.score === 5
              // ? `<span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>
              // <span class="fa fa-star checked"></span>`
              // : ""
            }
             <p>${coment.description}</p>
            <hr>
        </div>
        `;
  }
}

function prueba(coment) {
  let retorno = "";
  switch (coment.score) {
    case 1:
      retorno = `<span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`;
      break;
    case 2:
      retorno = `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`;
      break;
    case 3:
      retorno = `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`;
      break;
    case 4:
      retorno = `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>`;
      break;
    case 5:
      retorno = `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>`;
      break;
    default:
      retorno = `<span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`;
      break;
  }
  return retorno;
}
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}
