// =====================================================
// 🎮 GAMERPRO GAME — ESCENA 1
// =====================================================

const game = document.getElementById("game");

// Crear canvas
const canvas = document.createElement("canvas");
canvas.id = "escenaCanvas";
game.appendChild(canvas);

const ctx = canvas.getContext("2d");

// =====================================================
// 🖼️ IMÁGENES
// =====================================================

const escena1 = new Image();
const mike = new Image();
const micaela = new Image();
const pollonoob = new Image();

escena1.src = "./escena1.png";
mike.src = "./mike.jpg";
micaela.src = "./micaela.jpg";
pollonoob.src = "./pollonoob.jpg";

// =====================================================
// 📍 POSICIONES
// =====================================================

// ADELANTE
const MIKE_ADELANTE = {
    x: 0.45,
    y: 0.82,
    escala: 1.0
};

const MICAELA_ADELANTE = {
    x: 0.53,
    y: 0.82,
    escala: 1.0
};

// A LA MITAD
const MIKE_MITAD = {
    x: 0.47,
    y: 0.65,
    escala: 0.7
};

const MICAELA_MITAD = {
    x: 0.53,
    y: 0.65,
    escala: 0.7
};

// ATRÁS
const MIKE_ATRAS = {
    x: 0.49,
    y: 0.48,
    escala: 0.4
};

const MICAELA_ATRAS = {
    x: 0.53,
    y: 0.48,
    escala: 0.4
};

// POLLO NOOB
const POLLO_NOOB = {
    x: 0.50,
    y: 0.42,
    escala: 0.25
};

// =====================================================
// 📐 TAMAÑO DEL CANVAS
// =====================================================

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dibujarEscena();
}

window.addEventListener("resize", ajustarCanvas);

// =====================================================
// 🖼️ DIBUJAR IMAGEN CENTRADA
// =====================================================

function dibujarPersonaje(imagen, posicion) {
    if (!imagen.complete || !imagen.naturalWidth) return;

    const x = posicion.x * canvas.width;
    const y = posicion.y * canvas.height;

    const ancho = imagen.naturalWidth * posicion.escala;
    const alto = imagen.naturalHeight * posicion.escala;

    ctx.drawImage(
        imagen,
        x - ancho / 2,
        y - alto / 2,
        ancho,
        alto
    );
}

// =====================================================
// 🌾 ESCENA 1
// =====================================================

function dibujarEscena() {

    if (!escena1.complete || !escena1.naturalWidth) return;

    // Fondo
    ctx.drawImage(
        escena1,
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Mike
    dibujarPersonaje(mike, MIKE_ADELANTE);

    // Micaela
    dibujarPersonaje(micaela, MICAELA_ADELANTE);

    // El Pollo Noob todavía NO aparece.
}

// =====================================================
// 🚀 CARGAR ESCENA
// =====================================================

let imagenesCargadas = 0;

const imagenes = [
    escena1,
    mike,
    micaela,
    pollonoob
];

imagenes.forEach((imagen) => {

    imagen.onload = () => {

        imagenesCargadas++;

        if (imagenesCargadas === imagenes.length) {
            ajustarCanvas();
        }
    };

    imagen.onerror = () => {
        console.error("No se pudo cargar:", imagen.src);
    };
});
