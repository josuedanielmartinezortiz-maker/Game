// =====================================================
// 🐔 GAMERPRO GAME — GALLINERO
// =====================================================

export function iniciarGallinero(game, imagenes) {

    const canvas = document.createElement("canvas");

    canvas.id = "gallineroCanvas";

    Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "100"
    });

    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");


    // =================================================
    // 📦 CASILLAS
    // =================================================

    const CASILLAS = [

        // Fila 1
        { x: 0.02, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.14, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.26, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.38, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.50, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.62, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.74, y: 0.04, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.04, w: 0.10, h: 0.14 },

        // Fila 2
        { x: 0.02, y: 0.20, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.20, w: 0.10, h: 0.14 },

        // Fila 3
        { x: 0.02, y: 0.36, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.36, w: 0.10, h: 0.14 },

        // Fila 4
        { x: 0.02, y: 0.52, w: 0.10, h: 0.14 },
        { x: 0.86, y: 0.52, w: 0.10, h: 0.14 },

        // Fila 5
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
    // 🐔 INVENTARIO DEL GALLINERO
    // =================================================

    const pollosColocados =
        new Array(CASILLAS.length).fill(null);


    // =================================================
    // ⭐ POLLO GANADOR
    // =================================================

    const nombreGanador =
        window.gamerproPolloObtenido;


    const POLLOS = {

        "Pollo Noob":
            imagenes.pollonoob,

        "Pollo Zombie":
            imagenes.pollozombie,

        "Pollito Noob":
            imagenes.pollitonoob

    };


    const imagenGanador =
        POLLOS[nombreGanador];


    // =================================================
    // 🐔 COLOCAR GANADOR
    // =================================================

    if (imagenGanador) {

        pollosColocados[0] = {

            nombre:
                nombreGanador,

            imagen:
                imagenGanador

        };

        console.log(
            "🐔 POLLO GANADOR EN GALLINERO:",
            nombreGanador
        );

    } else {

        console.warn(
            "⚠️ No se encontró pollo ganador."
        );

    }


    // =================================================
    // 📐 CANVAS
    // =================================================

    function ajustarCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

        dibujar();

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


        // 🌾 GALLINERO

        ctx.drawImage(

            imagenes.escena2,

            0,
            0,

            canvas.width,
            canvas.height

        );


        // 🐔 POLLOS

        pollosColocados.forEach(
            (pollo, indice) => {

                if (!pollo)
                    return;


                const casilla =
                    CASILLAS[indice];


                const x =
                    (
                        casilla.x +
                        casilla.w / 2
                    ) * canvas.width;


                const y =
                    (
                        casilla.y +
                        casilla.h / 2
                    ) * canvas.height;


                const alto =
                    canvas.height *
                    casilla.h *
                    0.85;


                const imagen =
                    pollo.imagen;


                if (!imagen)
                    return;


                const proporcion =
                    imagen.naturalWidth /
                    imagen.naturalHeight;


                const ancho =
                    alto *
                    proporcion;


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
    // 👆 TOCAR CASILLA
    // =================================================

    function tocarCasilla(x, y) {

        const rx =
            x / canvas.width;

        const ry =
            y / canvas.height;


        for (
            let i = 0;
            i < CASILLAS.length;
            i++
        ) {

            const casilla =
                CASILLAS[i];


            if (
                rx >= casilla.x &&
                rx <= casilla.x + casilla.w &&
                ry >= casilla.y &&
                ry <= casilla.y + casilla.h
            ) {

                console.log(
                    "🐔 Casilla tocada:",
                    i + 1
                );

                return;

            }

        }

    }


    // =================================================
    // 📱 CONTROL TÁCTIL
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
    // ▶️ INICIO
    // =================================================

    window.addEventListener(
        "resize",
        ajustarCanvas
    );

    ajustarCanvas();


    console.log(
        "🐔 GALLINERO INICIADO"
    );


    return {

        CASILLAS,

        pollosColocados

    };

        }
