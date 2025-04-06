// hace que se resalte el boton del header de la pagina en la que estás
document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.href;

    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(function(link) {
        if (link.href === currentUrl) {
            link.classList.add('active');
            link.style.color = "red";
        } else {
            link.classList.remove('active');
        }
    });
});