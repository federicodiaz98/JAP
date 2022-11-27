let Url_cartProduct =
  "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let cart = [];

//fetch y presentacion de los datos del json
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(Url_cartProduct).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cart = resultObj.data;
      showCart(cart);
      costs();
    }
  });
});

function showCart(array) {
  let htmltoprint = "";

  let { articles } = array;

  for (let products of articles) {
    let { name, count, unitCost, currency, image, id } = products;

    htmltoprint += `
        <div class="row p-4">
            <div class="col fw-bolder"><img class="img-thumbnail" src="${image}"></div>
            <div class="col fw-bolder">${name}</div>
            <div class="col fw-bolder">${currency + unitCost}</div>
            <div class="col fw-bolder"><input type="number" min="1" oninput="totalCost(${id}); costs()" id="inp${id}" value=${count}></div>
            <div class="col fw-bolder" id="subTotal${id}">${
      currency + unitCost * count
    }</div>
        </div>

  
  `;
    document.getElementById("cart").innerHTML = htmltoprint;
    // costos
    document.getElementById("sub").innerText = currency + unitCost * count;
    localStorage.setItem("subTotal", unitCost * count);
  }
}

//Funcion que hace el calculo dependiendo del valor del input
function totalCost(id) {
  const input = document.getElementById("inp" + id);
  const cantidad = parseFloat(input.value);
  let { articles } = cart;
  for (let products of articles) {
    let { unitCost, currency } = products;

    console.log(unitCost);

    if (isNaN(cantidad)) {
      document.getElementById("subTotal" + id).innerText = currency + "0";
    } else {
      document.getElementById("subTotal" + id).innerText =
        currency + unitCost * cantidad;
      // costos
      document.getElementById("sub").innerText = currency + unitCost * cantidad;
      localStorage.setItem("subTotal", unitCost * cantidad);
    }
  }
}

function costs() {
  let subTotal = parseFloat(localStorage.getItem("subTotal"));
  let premium = document.getElementById("premium");
  let standard = document.getElementById("standard");
  let express = document.getElementById("express");
  const valEnvio = parseFloat(
    premium.checked
      ? premium.value
      : express.checked
      ? express.value
      : standard.checked
      ? standard.value
      : "0"
  );

  document.getElementById("envio").innerText = "USD" + subTotal * valEnvio;
  document.getElementById("total").innerText =
    "USD" + (valEnvio * subTotal + subTotal);
}

let tarjeta = document.getElementById("tarjeta");
let transfer = document.getElementById("transfer");
let nTarjeta = document.getElementById("nTarjeta");
let codSeg = document.getElementById("codSeg");
let ven = document.getElementById("ven");
let nCuenta = document.getElementById("nCuenta");

function mediosDePago() {
  tarjeta.checked
    ? ((nCuenta.disabled = true),
      (nTarjeta.disabled = false),
      (codSeg.disabled = false),
      (ven.disabled = false))
    : ((nTarjeta.disabled = true),
      (codSeg.disabled = true),
      (ven.disabled = true),
      (nCuenta.disabled = false));
}

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          document.getElementById("noMetod").classList.remove("d-none");
        } else {
          alert("Compra realizada con Exito");
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
