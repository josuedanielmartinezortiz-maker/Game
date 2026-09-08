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
    // 🧹 ELIMINAR ESCENAS ANTERIORES
    // =================================================

    const escena3Anterior =
        document.getElementById("escena3Canvas");

    if (escena3Anterior) {
        escena3Anterior.remove();
        console.log("🧹 ESCENA 3 ELIMINADA");
    }

    const escenaAnterior =
        document.getElementById("escenaCanvas");

    if (escenaAnterior) {
        escenaAnterior.remove();
        console.log("🧹 ESCENA ANTERIOR ELIMINADA");
    }

    // =================================================
    // 🔍 COMPROBAR IMÁGENES
    // =================================================

    if (!imagenes) {
        console.error(
            "❌ NO EXISTEN LAS IMÁGENES"
        );
        return;
    }

    if (!imagenes.gallinero) {

        console.error(
            "❌ NO EXISTE imagenes.gallinero"
        );

        console.log(
            "📦 IMÁGENES DISPONIBLES:",
            Object.keys(imagenes)
        );

        return;
    }

    // =================================================
    // 🖼️ CANVAS
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
            height: "100vh",
            display: "block",
            zIndex: "10000",
            background: "#000000"
        }
    );

    game.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");

    // =================================================
    // 📦 CASILLAS — 22
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
    // 🐔 INVENTARIO
    // =================================================

    const pollosColocados =
        new Array(
            CASILLAS.length
        ).fill(null);

    // =================================================
    // ⭐ GANADOR
    // =================================================

    const ganadorFinal =
        nombreGanador ||
        window.gamerproPolloObtenido;

    console.log(
        "🏆 POLLO RECIBIDO:",
        ganadorFinal
    );

    // =================================================
    // 🐔 POLLOS
    // =================================================

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

    // =================================================
    // 🐔 COLOCAR GANADOR
    // =================================================

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
    // 📐 RECTÁNGULO REAL DEL GALLINERO
    // =================================================

    function obtenerRectanguloGallinero() {

        const imagen =
            imagenes.gallinero;

        const anchoImagen =
            imagen.naturalWidth;

        const altoImagen =
            imagen.naturalHeight;

        if (
            !anchoImagen ||
            !altoImagen
        ) {
            return {
                x: 0,
                y: 0,
                w: canvas.width,
                h: canvas.height
            };
        }

        // =============================================
        // CONTAIN
        // =============================================

        const escala =
            Math.min(
                canvas.width / anchoImagen,
                canvas.height / altoImagen
            );

        const ancho =
            anchoImagen * escala;

        const alto =
            altoImagen * escala;

        const x =
            (canvas.width - ancho) / 2;

        const y =
            (canvas.height - alto) / 2;

        return {
            x,
            y,
            w: ancho,
            h: alto
        };
    }

    // =================================================
    // 📐 AJUSTAR CANVAS
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

        // =============================================
        // 🖤 FONDO
        // =============================================

        ctx.fillStyle =
            "#000000";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // =============================================
        // 🏠 RECTÁNGULO DEL GALLINERO
        // =============================================

        const zona =
            obtenerRectanguloGallinero();

        // =============================================
        // 🏠 GALLINERO SIN DEFORMAR
        // =============================================

        ctx.drawImage(

            imagenes.gallinero,

            zona.x,
            zona.y,

            zona.w,
            zona.h

        );

        // =============================================
        // 🐔 POLLOS
        // =============================================

        pollosColocados.forEach(
            (pollo, indice) => {

                if (!pollo) {
                    return;
                }

                const casilla =
                    CASILLAS[indice];

                // =====================================
                // POSICIÓN DENTRO DEL GALLINERO
                // =====================================

                const x =
                    zona.x +
                    (
                        casilla.x +
                        casilla.w / 2
                    ) *
                    zona.w;

                const y =
                    zona.y +
                    (
                        casilla.y +
                        casilla.h / 2
                    ) *
                    zona.h;

                // =====================================
                // TAMAÑO DEL POLLO
                // =====================================

                const alto =
                    zona.h *
                    casilla.h *
                    0.85;

                const imagen =
                    pollo.imagen;

                if (!imagen) {
                    return;
                }

                const anchoBase =
                    imagen.naturalWidth;

                const altoBase =
                    imagen.naturalHeight;

                if (
                    !anchoBase ||
                    !altoBase
                ) {
                    return;
                }

                const proporcion =
                    anchoBase /
                    altoBase;

                const ancho =
                    alto *
                    proporcion;

                // =====================================
                // DIBUJAR POLLO
                // =====================================

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

    function tocarCasilla(
        x,
        y
    ) {

        const zona =
            obtenerRectanguloGallinero();

        // Convertir toque a coordenadas
        // relativas al gallinero

        const rx =
            (x - zona.x) /
            zona.w;

        const ry =
            (y - zona.y) /
            zona.h;

        // Fuera del gallinero
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
    // 🔄 RESIZE
    // =================================================

    window.addEventListener(
        "resize",
        ajustarCanvas
    );

    // =================================================
    // ▶️ INICIAR
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
