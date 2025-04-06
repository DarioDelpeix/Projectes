// botó de mode fosc de la pàgina principal
let isDarkMode = localStorage.getItem('isDarkMode') === 'true';

function applyTheme() {
    const body = document.body;
    const peliculasPopulares = document.querySelector('.Peliculas_populares');
    const themeIcon = document.getElementById("theme-icon"); 

    if (isDarkMode) {
        // Mode fosc
        body.style.backgroundColor = "black";
        body.style.color = "white";
        peliculasPopulares.style.color = "white";
        themeIcon.src = "../IMG/sol.png";  
        themeIcon.alt = "Modo Claro";
    } else {
        // Mode clar
        body.style.backgroundColor = "white";
        body.style.color = "black";
        peliculasPopulares.style.color = "black";
        themeIcon.src = "../IMG/luna.png";  
        themeIcon.alt = "Modo Oscuro";
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('isDarkMode', isDarkMode);
    applyTheme();
}

document.addEventListener('DOMContentLoaded', (event) => {
    applyTheme();
});