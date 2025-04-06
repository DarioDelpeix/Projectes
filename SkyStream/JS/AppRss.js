// botó de mode fosc de la pàgina principal
let isDarkMode = localStorage.getItem('isDarkMode') === 'true';

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon"); 

    if (isDarkMode) {
        // Mode clar
        body.style.backgroundColor = "white";
        themeIcon.src = "../IMG/luna.png";  
        themeIcon.alt = "Modo Oscuro";
    } else {
        // Mode fosc
        body.style.backgroundColor = "black";
        themeIcon.src = "../IMG/sol.png";  
        themeIcon.alt = "Modo Claro";
    }
    isDarkMode = !isDarkMode;
    localStorage.setItem('isDarkMode', isDarkMode);
}

function loadTheme() {
    if (isDarkMode) {
        document.body.style.backgroundColor = "black";
        document.getElementById("theme-icon").src = "../IMG/sol.png";
        document.getElementById("theme-icon").alt = "Modo Claro";
    } else {
        document.body.style.backgroundColor = "white";
        document.getElementById("theme-icon").src = "../IMG/luna.png";
        document.getElementById("theme-icon").alt = "Modo Oscuro";
    }
}

window.onload = loadTheme;