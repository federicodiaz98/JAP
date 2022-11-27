let nombre = document.getElementById("nombre");
let nombre2 = document.getElementById("nombre2");
let apellido = document.getElementById("apellido");
let apellido2 = document.getElementById("apellido2");
let correo = document.getElementById("correo");
let tel = document.getElementById("tel");

const img = document.getElementById("photo");
const file = document.getElementById("file");

document.addEventListener("DOMContentLoaded", function (e) {
  email = localStorage.getItem("email");
  correo.value = email;
  n1 = localStorage.getItem("Nombre");
  nombre.value = n1;
  n2 = localStorage.getItem("Nombre2");
  nombre2.value = n2;
  a1 = localStorage.getItem("Apellido");
  apellido.value = a1;
  a2 = localStorage.getItem("Apellido2");
  apellido2.value = a2;
  telefono = localStorage.getItem("Tel");
  tel.value = telefono;

  const profilePhoto = localStorage.getItem("image");
  if (profilePhoto) {
    img.setAttribute("src", profilePhoto);
  }
});

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
        }
        guardar();
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function guardar() {
  localStorage.setItem("Nombre", nombre.value);
  localStorage.setItem("Nombre2", nombre2.value);
  localStorage.setItem("Apellido", apellido.value);
  localStorage.setItem("Apellido2", apellido2.value);
  localStorage.setItem("Tel", tel.value);
}

//DESAFIATE FOTO DE PERFIL

file.addEventListener("change", function () {
  const choosedFile = this.files[0];

  if (choosedFile) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      localStorage.setItem("image", reader.result);
      img.setAttribute("src", reader.result);
    });
    reader.readAsDataURL(choosedFile);
  }
});
