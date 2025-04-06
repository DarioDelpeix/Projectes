// para que muestra un mensaje de alerta cuando se envia el formulario
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("enviar").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("El formulari s'ha enviat correctament!");
        this.reset(); 
    });
});