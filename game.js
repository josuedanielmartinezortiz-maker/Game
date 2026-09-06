// =====================================================
// 🎮 GAMERPRO GAME — BASE PRINCIPAL
// =====================================================

import { precargarImagenes } from "./sistemas/precarga.js";
import { iniciarEscena1 } from "./escenas/escena1.js";

const game = document.getElementById("game");

// =====================================================
// 🖼️ RECURSOS ACTUALES
// =====================================================

const recursos = {
    escena1: "./assets/escena1.png",
    mike: "./assets/mike.png",
    micaela: "./assets/micaela.png"
};

// =====================================================
// ⏳ PRECARGA
// =====================================================

precargarImagenes(
    recursos,
    (cargadas, total, nombre, correcta) => {

        if (correcta) {

            console.log(
                `✅ Cargada: ${nombre} (${cargadas}/${total})`
            );

        } else {

            console.error(
                `❌ FALLÓ: ${nombre}`
            );
        }
    }
)
.then((imagenes) => {

    console.log("🎮 ¡ESCENA 1 LISTA!");

    iniciarEscena1(game, imagenes);

})
.catch((error) => {

    console.error(
        "🚨 LA PRECARGA SE DETUVO:",
        error.message
    );
});

2. "sistemas/precarga.js"

:::writing{variant="document" id="92746" title="sistemas/precarga.js"}

// =====================================================
// 🖼️ GAMERPRO GAME — SISTEMA DE PRECARGA
// =====================================================

export function precargarImagenes(recursos, actualizarCarga) {

    const nombres = Object.keys(recursos);

    let cargadas = 0;

    const cargas = nombres.map((nombre) => {

        return new Promise((resolve, reject) => {

            const imagen = new Image();

            imagen.onload = () => {

                cargadas++;

                if (actualizarCarga) {

                    actualizarCarga(
                        cargadas,
                        nombres.length,
                        nombre,
                        true
                    );
                }

                resolve({
                    nombre,
                    imagen
                });
            };

            imagen.onerror = () => {

                console.error(
                    `❌ FALLÓ LA IMAGEN: ${nombre}`
                );

                if (actualizarCarga) {

                    actualizarCarga(
                        cargadas,
                        nombres.length,
                        nombre,
                        false
                    );
                }

                reject(
                    new Error(
                        `No se pudo cargar: ${recursos[nombre]}`
                    )
                );
            };

            imagen.src = recursos[nombre];
        });
    });

    return Promise.all(cargas)
        .then((resultados) => {

            const imagenes = {};

            resultados.forEach((resultado) => {

                imagenes[resultado.nombre] =
                    resultado.imagen;

            });

            return imagenes;
        });
}

3. "escenas/escena1.js"

:::writing{variant="document" id="31574" title="escenas/escena1.js"}

// =====================================================
// 🌾 GAMERPRO GAME — ESCENA 1
// =====================================================

export function iniciarEscena1(game, imagenes) {

    // =================================================
    // 🎨 CANVAS
    // =================================================

    const canvas = document.createElement("canvas");

    canvas.id = "escenaCanvas";

    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // =================================================
    // 📍 POSICIONES INICIALES
    // =================================================

    const MIKE = {
        x: 0.47,
        y: 0.82,
        escala: 1.0
    };

    const MICAELA = {
        x: 0.53,
        y: 0.82,
        escala: 1.0
    };

    // =================================================
    // 📐 TAMAÑO BASE
    // =================================================

    const TAMANO_BASE = 180;

    // =================================================
    // 🧑👩 DIBUJAR PERSONAJE
    // =================================================

    function dibujarPersonaje(imagen, posicion) {

        const x =
            posicion.x * canvas.width;

        const y =
            posicion.y * canvas.height;

        const alto =
            TAMANO_BASE * posicion.escala;

        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;

        const ancho =
            alto * proporcion;

        ctx.drawImage(
            imagen,
            x - ancho / 2,
            y - alto / 2,
            ancho,
            alto
        );
    }

    // =================================================
    // 🎨 DIBUJAR ESCENA
    // =================================================

    function dibujarEscena() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // 🌾 FONDO
        ctx.drawImage(
            imagenes.escena1,
            0,
            0,
            canvas.width,
            canvas.height
        );

        // 🧑 MIKE
        dibujarPersonaje(
            imagenes.mike,
            MIKE
        );

        // 👩 MICAELA
        dibujarPersonaje(
            imagenes.micaela,
            MICAELA
        );
    }

    // =================================================
    // 📱 AJUSTAR CANVAS
    // =================================================

    function ajustarCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

        dibujarEscena();
    }

    // =================================================
    // 🚀 INICIAR
    // =================================================

    ajustarCanvas();

    // =================================================
    // 🔄 REDIMENSIONAR
    // =================================================

    window.addEventListener(
        "resize",
        ajustarCanvas
    );
}

📁 Así queda ahora

Game/
│
├── index.html
├── style.css
├── game.js
│
├── escenas/
│   └── escena1.js
│
├── sistemas/
│   └── precarga.js
│
└── assets/
    ├── escena1.png
    ├── mike.png
    └── micaela.png

Solo estas 3 imágenes se cargan por ahora. 🧑👩🌾

Cuando esto funcione, seguimos con el siguiente módulo sin meter todavía el pollo ni el huevo.
