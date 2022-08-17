  var email = document.getElementById("email");
  var password = document.getElementById("password");
  const boton = document.getElementById("boton");
  boton.addEventListener("click", submitCheck);

function submitCheck() {
  if (password.value.length > 0 && email.value.length > 0) {
    alert("exito");
  } else {
   alert("fail");
  }
  redirigir();
}

function redirigir() {
  location.replace("https://federicodiaz98.github.io/JAP/portada.html");
}