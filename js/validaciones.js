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

// function redirigir() {
//   location.replace("https://www.google.com/search?q=pinwilly&oq=pinwilly&aqs=chrome..69i57.5512j0j4&sourceid=chrome&ie=UTF-8");
// }

  function redirigir() {
  window.location.href = "https://www.google.com/search?q=pinwilly&oq=pinwilly&aqs=chrome..69i57.5512j0j4&sourceid=chrome&ie=UTF-8"; 
}
