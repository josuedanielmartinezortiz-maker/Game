// =====================================================
// 🌾 GAMERPRO GAME — ESCENA 1
// =====================================================

import { moverPersonajes } from "../mecanicas/movimiento.js";

export function iniciarEscena1(game, imagenes) {

    const canvas = document.createElement("canvas");

    canvas.id = "escenaCanvas";

    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // =================================================
    // 📍 POSICIONES INICIALES
    // =================================================

    const MIKE = {
        x: 0.44,
        y: 0.82,
        escala: 1.0
    };

    const MICAELA = {
        x: 0.56,
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

        // 🌾 Fondo
        ctx.drawImage(
            imagenes.escena1,
            0,
            0,
            canvas.width,
            canvas.height
        );

        // 🧑 Mike
        dibujarPersonaje(
            imagenes.mike,
            MIKE
        );

        // 👩 Micaela
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

    ajustarCanvas();

    window.addEventListener(
        "resize",
        ajustarCanvas
    );

    // =================================================
    // ⏸️ PAUSA INICIAL
    // =================================================

    setTimeout(() => {

        // =================================================
        // 🚶 AVANZAR HACIA LA MITAD
        // 📉 Y HACERSE MÁS PEQUEÑOS
        // =================================================

        moverPersonajes(
            [MIKE, MICAELA],

            [
                {
                    x: MIKE.x,
                    y: 0.65,
                    escala: 0.7
                },
                {
                    x: MICAELA.x,
                    y: 0.65,
                    escala: 0.7
                }
            ],

            1800
        );

    }, 2000);

    // =================================================
    // 🎬 BUCLE DE RENDER
    // =================================================

    function actualizar() {

        dibujarEscena();

        requestAnimationFrame(actualizar);
    }

    actualizar();
            }
