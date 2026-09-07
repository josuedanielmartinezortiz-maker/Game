// =====================================================
// 🌲 GAMERPRO GAME — ESCENA 1
// =====================================================

import { moverPersonajes } from "../mecanicas/movimiento.js";

export function iniciarEscena1(game, imagenes, alTerminar) {

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
    // 💬 SISTEMA DE DIÁLOGO
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

        setTimeout(
            siguienteDialogo,
            2500
        );
    }

    // =================================================
    // 🚶 CAMINATA HACIA LA GRANJA
    // =================================================

    function iniciarCaminata() {

        console.log(
            "🚶 Mike y Micaela comienzan a caminar."
        );

        // 🔄 Cambiar a vista de espalda
        setTimeout(() => {

            imagenMike =
                imagenes.mikeespalda;

            imagenMicaela =
                imagenes.micaelaespalda;

            console.log(
                "🔄 Mike y Micaela ahora caminan de espaldas."
            );

        }, 2500);

        // =================================================
        // 📍 DESTINO — SALIDA DEL BOSQUE
        // =================================================

        moverPersonajes(
            [MIKE, MICAELA],

            [
                {
                    x: 0.49,
                    y: 0.70,
                    escala: 0.65
                },
                {
                    x: 0.51,
                    y: 0.70,
                    escala: 0.65
                }
            ],

            10000
        );

        // =================================================
        // 🌑 TRANSICIÓN A ESCENA 2
        // =================================================

        setTimeout(() => {

            const fundido =
                document.createElement("div");

            fundido.style.position = "fixed";
            fundido.style.top = "0";
            fundido.style.left = "0";
            fundido.style.width = "100vw";
            fundido.style.height = "100vh";
            fundido.style.background = "black";
            fundido.style.opacity = "0";
            fundido.style.transition =
                "opacity 1s ease";
            fundido.style.zIndex = "9999";
            fundido.style.pointerEvents = "none";

            document.body.appendChild(fundido);

            // 🌑 Fundido a negro
            requestAnimationFrame(() => {
                fundido.style.opacity = "1";
            });

            // 🏡 Cambiar a Escena 2
            setTimeout(() => {

                game.innerHTML = "";

                alTerminar();

                // 🌅 Fundido de entrada
                fundido.style.opacity = "0";

                setTimeout(() => {
                    fundido.remove();
                }, 1000);

            }, 1000);

        }, 10000);
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
    // ⏸️ INICIO
    // =================================================

    setTimeout(() => {

        siguienteDialogo();

    }, 2000);
}

