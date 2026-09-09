// =====================================================
// 🐔 GAMERPRO GAME — GALLINERO
// =====================================================

export function iniciarGallinero(
    game,
    imagenes,
    nombreGanador = null
) {

    console.log("🐔 INICIANDO GALLINERO...");

    // =================================================
    // 🧹 LIMPIAR ESCENAS ANTERIORES
    // =================================================

    const escena3 =
        document.getElementById("escena3Canvas");

    if (escena3) {
        escena3.remove();
        console.log("🧹 ESCENA 3 ELIMINADA");
    }

    const escena =
        document.getElementById("escenaCanvas");

    if (escena) {
        escena.remove();
        console.log("🧹 ESCENA ANTERIOR ELIMINADA");
    }

    // =================================================
    // ❌ COMPROBACIONES
    // =================================================

    if (!imagenes) {
        console.error("❌ NO EXISTEN LAS IMÁGENES");
        return;
    }

    if (!imagenes.gallinero) {
        console.error("❌ NO EXISTE imagenes.gallinero");
        return;
    }

    // =================================================
    // 🎨 CANVAS
    // =================================================

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "gallineroCanvas";

    Object.assign(
        canvas.style,
        {
            position: "fixed",
            left: "0",
            top: "0",
            width: "100vw",
            height: "100dvh",
            display: "block",
            background: "#000000",
            zIndex: "10000"
        }
    );

    game.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");

    // =================================================
    // 🐔 22 CASILLAS
    // =================================================

    const CASILLAS = [

        // FILA 1
        { x: 0.02, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.14, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.26, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.38, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.50, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.62, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.74, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.04, w: 0.10, h: 0.14 },

        // FILA 2
        { x: 0.02, y: 0.20, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.20, w: 0.10, h: 0.14 },

        // FILA 3
        { x: 0.02, y: 0.36, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.36, w: 0.10, h: 0.14 },

        // FILA 4
        { x: 0.02, y: 0.52, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.52, w: 0.10, h: 0.14 },

        // FILA 5
        { x: 0.02, y: 0.68, w: 0.10, h: 0.14 },
        { x: 0.14, y: 0.68, w: 0.10, h: 0.14 },
        { x: 0.26, y: 0.68, w: 0.10, h: 0.14 },
        { x: 0.38, y: 0.68, w: 0.10, h: 0.14 },
        { x: 0.50, y: 0.68, w: 0.10, h: 0.14 },
        { x: 0.62, y: 0.68, w: 0.10, h: 0.14 },
        { x: 0.74, y: 0.68, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.68, w: 0.10, h: 0.14 }
    ];

    // =================================================
    // 🐔 POLLOS COLOCADOS
    // =================================================

    const pollosColocados =
        new Array(
            CASILLAS.length
        ).fill(null);

    // =================================================
    // 🏆 GANADOR
    // =================================================

    const ganadorFinal =
        nombreGanador ||
        window.gamerproPolloObtenido;

    console.log(
        "🏆 POLLO RECIBIDO:",
        ganadorFinal
    );

    const POLLOS = {

        "Pollo Noob":
            imagenes.pollonoob,

        "Pollo Zombie":
            imagenes.pollozombie,

        "Pollito Noob":
            imagenes.pollitonoob
    };

    const imagenGanador =
        POLLOS[ganadorFinal];

    if (imagenGanador) {

        pollosColocados[0] = {

            nombre:
                ganadorFinal,

            imagen:
                imagenGanador
        };

        console.log(
            "🐔✅ GANADOR EN CASILLA 1:",
            ganadorFinal
        );

    } else {

        console.error(
            "❌ NO SE ENCONTRÓ EL POLLO:",
            ganadorFinal
        );
    }

    // =================================================
    // 🏠 ENCUADRE DEL GALLINERO
    // =================================================

    function obtenerZonaGallinero() {

        const imagen =
            imagenes.gallinero;

        const iw =
            imagen.naturalWidth;

        const ih =
            imagen.naturalHeight;

        if (!iw || !ih) {

            return {
                x: 0,
                y: 0,
                w: canvas.width,
                h: canvas.height
            };
        }

        const proporcionImagen =
            iw / ih;

        const proporcionPantalla =
            canvas.width /
            canvas.height;

        let ancho;
        let alto;

        // =================================================
        // 📱 VERTICAL
        // =================================================

        if (
            proporcionPantalla < 1
        ) {

            /*
             * En vertical aumentamos
             * ligeramente el tamaño.
             */

            const zoomVertical = 1.12;

            ancho =
                canvas.width *
                zoomVertical;

            alto =
                ancho /
                proporcionImagen;

            /*
             * Si el zoom hace que el
             * alto sea insuficiente,
             * usamos el alto como referencia.
             */

            if (
                alto <
                canvas.height
            ) {

                alto =
                    canvas.height *
                    zoomVertical;

                ancho =
                    alto *
                    proporcionImagen;
            }

        }

        // =================================================
        // 🖥️ HORIZONTAL
        // =================================================

        else {

            /*
             * En horizontal hacemos que
             * TODO el gallinero entre
             * dentro de la pantalla.
             */

            const escala =
                Math.min(
                    canvas.width / iw,
                    canvas.height / ih
                );

            ancho =
                iw * escala;

            alto =
                ih * escala;
        }

        // =================================================
        // 📍 CENTRAR
        // =================================================

        return {

            x:
                (canvas.width - ancho) / 2,

            y:
                (canvas.height - alto) / 2,

            w:
                ancho,

            h:
                alto
        };
    }

    // =================================================
    // 🎨 DIBUJAR
    // =================================================

    function dibujar() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Fondo negro
        ctx.fillStyle =
            "#000000";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // =================================================
        // 🏠 FONDO
        // =================================================

        const zona =
            obtenerZonaGallinero();

        ctx.drawImage(
            imagenes.gallinero,
            zona.x,
            zona.y,
            zona.w,
            zona.h
        );

        // =================================================
        // 🐔 POLLOS
        // =================================================

        pollosColocados.forEach(
            (pollo, indice) => {

                if (!pollo) {
                    return;
                }

                const casilla =
                    CASILLAS[indice];

                // Centro de casilla
                const xRel =
                    casilla.x +
                    casilla.w / 2;

                const yRel =
                    casilla.y +
                    casilla.h / 2;

                // Posición real
                const x =
                    zona.x +
                    xRel * zona.w;

                const y =
                    zona.y +
                    yRel * zona.h;

                const imagen =
                    pollo.imagen;

                if (!imagen) {
                    return;
                }

                const iw =
                    imagen.naturalWidth;

                const ih =
                    imagen.naturalHeight;

                if (!iw || !ih) {
                    return;
                }

                const proporcion =
                    iw / ih;

                // Tamaño del pollo
                let alto =
                    zona.h *
                    casilla.h *
                    0.70;

                let ancho =
                    alto *
                    proporcion;

                // No permitir que salga
                // de su casilla
                const anchoMaximo =
                    zona.w *
                    casilla.w *
                    0.90;

                if (
                    ancho >
                    anchoMaximo
                ) {

                    ancho =
                        anchoMaximo;

                    alto =
                        ancho /
                        proporcion;
                }

                ctx.drawImage(
                    imagen,
                    x - ancho / 2,
                    y - alto / 2,
                    ancho,
                    alto
                );
            }
        );
    }

    // =================================================
    // 📐 AJUSTAR CANVAS
    // =================================================

    function ajustarCanvas() {

        const ancho =
            window.visualViewport
                ? window.visualViewport.width
                : window.innerWidth;

        const alto =
            window.visualViewport
                ? window.visualViewport.height
                : window.innerHeight;

        canvas.width =
            Math.round(ancho);

        canvas.height =
            Math.round(alto);

        dibujar();
    }

    // =================================================
    // 👆 TOCAR CASILLA
    // =================================================

    function tocarCasilla(
        x,
        y
    ) {

        const zona =
            obtenerZonaGallinero();

        const rx =
            (x - zona.x) /
            zona.w;

        const ry =
            (y - zona.y) /
            zona.h;

        if (
            rx < 0 ||
            rx > 1 ||
            ry < 0 ||
            ry > 1
        ) {
            return;
        }

        for (
            let i = 0;
            i < CASILLAS.length;
            i++
        ) {

            const casilla =
                CASILLAS[i];

            if (
                rx >= casilla.x &&
                rx <=
                    casilla.x +
                    casilla.w &&
                ry >= casilla.y &&
                ry <=
                    casilla.y +
                    casilla.h
            ) {

                console.log(
                    "🐔 CASILLA TOCADA:",
                    i + 1
                );

                return;
            }
        }
    }

    // =================================================
    // 👆 TOUCH / POINTER
    // =================================================

    canvas.addEventListener(
        "pointerdown",
        evento => {

            tocarCasilla(
                evento.clientX,
                evento.clientY
            );
        }
    );

    // =================================================
    // 🔄 ROTACIÓN / RESIZE
    // =================================================

    window.addEventListener(
        "resize",
        ajustarCanvas
    );

    if (window.visualViewport) {

        window.visualViewport.addEventListener(
            "resize",
            ajustarCanvas
        );
    }

    // =================================================
    // 🚀 INICIAR
    // =================================================

    ajustarCanvas();

    console.log(
        "🐔🏠 GALLINERO INICIADO CORRECTAMENTE"
    );

    return {

        CASILLAS,

        pollosColocados
    };
        }
