  var email = document.getElementById("email");
  var password = document.getElementById("password");
  const boton = document.getElementById("boton");

boton.addEventListener("click", submitCheck);

function submitCheck() {
  if (password.value.length > 0 && email.value.length > 0) {
   alert("exito");
    redirigir()
  } else {
   alert("fail");
  }
  
}

function redirigir() {
  window.location.href = "portada.html";
}

boton.addEventListener("click", (evt) => {
  // es necesario el if?
  if (email.value) localStorage.setItem("email", email.value);
});