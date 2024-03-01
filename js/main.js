var quiereJugar = prompt("Bienvenido, ¿queres jugar si o no?");
var nombre = prompt("Ingrese su nombre:");
alert("Suerte Rey");

const palabras = ["computadora", "loro", "perro", "", "microfono", "dinosaurio", "desodorante"];


function seleccionarPalabra() {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function reiniciarJuego() {
    palabraSeleccionada = seleccionarPalabra();
    palabraOculta = "";
    fallos = 0;

    for (let i = 0; i < palabraSeleccionada.length; i++) {
        palabraOculta += "_ ";
    }

    contenedorPalabra.textContent = palabraOculta;

    const botones = document.querySelectorAll("#Containerdeletras button");
    botones.forEach(boton => {
        boton.disabled = false;
    });


    const canvas = document.getElementById("ahorcadoCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let palabraSeleccionada = seleccionarPalabra();
let palabraOculta = "";
let fallos = 0;


const contenedorPalabra = document.getElementById("Containerdepalabras");
for (let i = 0; i < palabraSeleccionada.length; i++) {
    palabraOculta += "_ ";
}
contenedorPalabra.textContent = palabraOculta;


const alfabeto = "abcdefghijklmnñopqrstuvwxyz";
const contenedorLetras = document.getElementById("Containerdeletras");
for (let letra of alfabeto) {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.addEventListener("click", () => {
        comprobarLetra(letra);
        boton.disabled = true;
    });
    contenedorLetras.appendChild(boton);
}


function comprobarLetra(letra) {
    let nuevaPalabraOculta = "";
    let letraEncontrada = false;
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra) {
            nuevaPalabraOculta += letra + " ";
            letraEncontrada = true;
        } else {
            nuevaPalabraOculta += palabraOculta[2 * i] + " ";
        }
    }
    palabraOculta = nuevaPalabraOculta.trim();
    contenedorPalabra.textContent = palabraOculta;

    if (!palabraOculta.includes("_")) {
        alert("¡Felicidades! ¡Has adivinado la palabra!");
        reiniciarJuego();
    } else if (!letraEncontrada) {
        fallos++;
        dibujarAhorcado();
        if (fallos >= 8) {
            alert("¡la quedo! La palabra era: " + palabraSeleccionada);
            reiniciarJuego();
        }
    }
}


function dibujarAhorcado() {
    const canvas = document.getElementById("ahorcadoCanvas");
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#000";

    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.stroke();

    // Travesaño
    if (fallos > 0) {
        ctx.beginPath();
        ctx.moveTo(100, 50);
        ctx.lineTo(250, 50);
        ctx.stroke();
    }

    // Cuerda
    if (fallos > 1) {
        ctx.beginPath();
        ctx.moveTo(250, 50);
        ctx.lineTo(250, 100);
        ctx.stroke();
    }

    // Cabeza
    if (fallos > 2) {
        ctx.beginPath();
        ctx.arc(250, 125, 25, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Cuerpo
    if (fallos > 3) {
        ctx.beginPath();
        ctx.moveTo(250, 150);
        ctx.lineTo(250, 250);
        ctx.stroke();
    }

    // Brazos
    if (fallos > 4) {
        ctx.beginPath();
        ctx.moveTo(250, 175);
        ctx.lineTo(200, 200);
        ctx.stroke();
    }

    if (fallos > 5) {
        ctx.beginPath();
        ctx.moveTo(250, 175);
        ctx.lineTo(300, 200);
        ctx.stroke();
    }

    // Piernas
    if (fallos > 6) {
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.lineTo(200, 300);
        ctx.stroke();
    }

    if (fallos > 7) {
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.lineTo(300, 300);
        ctx.stroke();
    }
}