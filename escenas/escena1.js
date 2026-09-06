// =====================================================
// 🌲 GAMERPRO GAME — ESCENA 1
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
    // 🔄 DIRECCIÓN DE LOS PERSONAJES
    // =================================================

    let imagenMike = imagenes.mike;
    let imagenMicaela = imagenes.micaela;

    // =================================================
    // 💬 DIÁLOGOS
    // =================================================

    const DIALOGOS = [
        {
            personaje: "MICAELA",
            texto: "¿Qué hacemos aquí, Mike?"
        },
        {
            personaje: "MIKE",
            texto: "No sé..."
        },
        {
            personaje: "SONIDO",
            texto: "Pío... pío..."
        },
        {
            personaje: "MICAELA",
            texto: "¿Qué es eso?"
        },
        {
            personaje: "MIKE",
            texto: "No sé, vamos a averiguarlo."
        }
    ];

    let dialogoActual = 0;

    // =================================================
    // 🧑👩 DIBUJAR PERSONAJE
    // =================================================

    function dibujarPersonaje(imagen, posicion) {

        if (!imagen) return;

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

        // 🌲 Fondo
        ctx.drawImage(
            imagenes.escena1,
            0,
            0,
            canvas.width,
            canvas.height
        );

        // 🧑 Mike
        dibujarPersonaje(
            imagenMike,
            MIKE
        );

        // 👩 Micaela
        dibujarPersonaje(
            imagenMicaela,
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
    // 🎬 MOSTRAR DIÁLOGO
    // =================================================

    function siguienteDialogo() {

        if (dialogoActual >= DIALOGOS.length) {
            iniciarCaminata();
            return;
        }

        const dialogo =
            DIALOGOS[dialogoActual];

        console.log(
            `${dialogo.personaje}: ${dialogo.texto}`
        );

        dialogoActual++;

        // ⏱️ Tiempo para leer el diálogo
        setTimeout(
            siguienteDialogo,
            2500
        );
    }

    // =================================================
    // 🚶 CAMINATA
    // =================================================

    function iniciarCaminata() {

        console.log(
            "🚶 Mike y Micaela comienzan a caminar."
        );

        // Después de un momento,
        // pasan de frente a espalda.
        setTimeout(() => {

            imagenMike =
                imagenes.mikeespalda;

            imagenMicaela =
                imagenes.micaelaespalda;

            console.log(
                "🔄 Ahora caminan de espaldas."
            );

        }, 2500);

        moverPersonajes(
            [MIKE, MICAELA],

            [
                {
                    x: 0.49,
                    y: 0.48,
                    escala: 0.35
                },
                {
                    x: 0.51,
                    y: 0.48,
                    escala: 0.35
                }
            ],

            10000
        );
    }

    // =================================================
    // 🎬 BUCLE DE RENDER
    // =================================================

    function actualizar() {

        dibujarEscena();

        requestAnimationFrame(
            actualizar
        );
    }

    actualizar();

    // =================================================
    // ⏸️ PAUSA INICIAL
    // =================================================

    setTimeout(() => {

        siguienteDialogo();

    }, 2000);
    }
