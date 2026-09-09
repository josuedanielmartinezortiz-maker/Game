// =====================================================
// 🎮 GAMERPRO GAME — GALLINERO
// =====================================================

export function iniciarGallinero(
    game,
    imagenes,
    polloGanador
) {

    // =================================================
    // 🐔 CANVAS
    // =================================================

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "gallineroCanvas";

    Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100dvh",
        display: "block",
        background: "#000",
        zIndex: "9999"
    });

    game.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


    // =================================================
    // 🐔 POLLOS DISPONIBLES
    // =================================================

    const POLLOS = {

        "Pollo Noob":
            imagenes.pollonoob,

        "Pollo Zombie":
            imagenes.pollozombie,

        "Pollito Noob":
            imagenes.pollitonoob

    };


    // =================================================
    // 📦 22 CASILLAS
    // =================================================

    const CASILLAS = [

        // FILA 1 — 8
        { x: 0.02, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.14, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.26, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.38, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.50, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.62, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.74, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.04, w: 0.10, h: 0.14 },

        // FILA 2 — 2
        { x: 0.02, y: 0.20, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.20, w: 0.10, h: 0.14 },

        // FILA 3 — 2
        { x: 0.02, y: 0.36, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.36, w: 0.10, h: 0.14 },

        // FILA 4 — 2
        { x: 0.02, y: 0.52, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.52, w: 0.10, h: 0.14 },

        // FILA 5 — 8
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
    // 🐔 POLLO GANADOR
    // =================================================

    const pollo =
        POLLOS[polloGanador];

    if (!pollo) {

        console.error(
            "❌ No se encontró el pollo ganador:",
            polloGanador
        );

        return;
    }


    // =================================================
    // 📐 ZONA REAL DEL GALLINERO
    // =================================================

    function obtenerZonaGallinero() {

        const iw =
            imagenes.gallinero.naturalWidth;

        const ih =
            imagenes.gallinero.naturalHeight;

        if (!iw || !ih) {

            return {
                x: 0,
                y: 0,
                w: canvas.width,
                h: canvas.height
            };
        }


        let ancho =
            canvas.width;

        let alto =
            ancho * (ih / iw);


        // =============================================
        // 📱 VERTICAL
        // =============================================

        if (canvas.height > canvas.width) {

            ancho =
                canvas.width;

            alto =
                ancho * (ih / iw);

            // Un pequeño zoom para aprovechar
            // mejor la pantalla vertical.

            if (alto < canvas.height) {

                const zoom =
                    1.12;

                ancho *= zoom;
                alto *= zoom;
            }

        }


        // =============================================
        // 🖥️ HORIZONTAL
        // =============================================

        else {

            alto =
                canvas.height;

            ancho =
                alto * (iw / ih);

            // Evitar que se salga horizontalmente.

            if (ancho > canvas.width) {

                ancho =
                    canvas.width;

                alto =
                    ancho * (ih / iw);
            }
        }


        return {

            x:
                (canvas.width - ancho) / 2,

            y:
                (canvas.height - alto) / 2,

            w: ancho,

            h: alto
        };
    }


    // =================================================
    // 🥤 BEBEDERO
    // =================================================

    const BEBEDERO = {

        x: 0.365,
        y: 0.585

    };


    // =================================================
    // 🌽 COMEDERO
    // =================================================

    const COMEDERO = {

        x: 0.635,
        y: 0.585

    };


    // =================================================
    // 🐔 TAMAÑO DEL POLLO
    // =================================================

    const MULTIPLICADOR_POLLO =
        3.0;


    // =================================================
    // 🖼️ DIBUJAR FONDO
    // =================================================

    function dibujarFondo(zona) {

        ctx.drawImage(
            imagenes.gallinero,
            zona.x,
            zona.y,
            zona.w,
            zona.h
        );
    }


    // =================================================
    // 🐔 DIBUJAR POLLO
    // =================================================

    function dibujarPollo(
        imagen,
        casilla,
        zona
    ) {

        if (!imagen)
            return;


        const centroX =
            zona.x +
            (
                casilla.x +
                casilla.w / 2
            ) *
            zona.w;


        const centroY =
            zona.y +
            (
                casilla.y +
                casilla.h / 2
            ) *
            zona.h;


        // Tamaño original de la casilla

        let anchoMaximo =
            zona.w *
            casilla.w *
            2.2;

        let altoMaximo =
            zona.h *
            casilla.h *
            2.2;


        // Tamaño natural de la imagen

        const iw =
            imagen.naturalWidth;

        const ih =
            imagen.naturalHeight;

        if (!iw || !ih)
            return;


        const proporcion =
            iw / ih;


        let ancho =
            anchoMaximo;

        let alto =
            ancho / proporcion;


        if (alto > altoMaximo) {

            alto =
                altoMaximo;

            ancho =
                alto * proporcion;
        }


        // Aplicar multiplicador

        ancho *=
            MULTIPLICADOR_POLLO;

        alto *=
            MULTIPLICADOR_POLLO;


        // =============================================
        // LÍMITES PARA QUE NO SE DESBORDE DEMASIADO
        // =============================================

        const limiteAncho =
            zona.w *
            casilla.w *
            3.0;

        const limiteAlto =
            zona.h *
            casilla.h *
            3.0;


        if (ancho > limiteAncho) {

            ancho =
                limiteAncho;

            alto =
                ancho / proporcion;
        }


        if (alto > limiteAlto) {

            alto =
                limiteAlto;

            ancho =
                alto * proporcion;
        }


        ctx.save();

        ctx.drawImage(
            imagen,

            centroX -
                ancho / 2,

            centroY -
                alto / 2,

            ancho,
            alto
        );

        ctx.restore();
    }


    // =================================================
    // 🎮 DIBUJAR GALLINERO
    // =================================================

    function dibujarGallinero() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // Fondo negro

        ctx.fillStyle =
            "#000";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const zona =
            obtenerZonaGallinero();


        // Fondo

        dibujarFondo(zona);


        // =============================================
        // 🐔 POLLO GANADOR EN LA PRIMERA CASILLA
        // =============================================

        dibujarPollo(
            pollo,
            CASILLAS[0],
            zona
        );
    }


    // =================================================
    // 📐 AJUSTAR CANVAS
    // =================================================

    function ajustarCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

        dibujarGallinero();
    }


    ajustarCanvas();


    window.addEventListener(
        "resize",
        ajustarCanvas
    );


    // =================================================
    // 🔄 BUCLE
    // =================================================

    function actualizar() {

        dibujarGallinero();

        requestAnimationFrame(
            actualizar
        );
    }


    requestAnimationFrame(
        actualizar
    );


    // =================================================
    // 🐔 INFORMACIÓN
    // =================================================

    console.log(
        "🏠 GALLINERO ABIERTO"
    );

    console.log(
        "🐔 POLLO GANADOR:",
        polloGanador
    );

    console.log(
        "📦 CASILLAS:",
        CASILLAS.length
    );

            }
