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
    // 🔍 COMPROBAR IMAGEN
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
            background: "#000000",
            zIndex: "10000"
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
    // 📐 ZONA REAL DE LA IMAGEN
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

        let ancho;
        let alto;

        // =============================================
        // 📱 VERTICAL
        // =============================================

        if (
            canvas.height >
            canvas.width
        ) {

            // La imagen ocupa todo el ancho
            ancho =
                canvas.width;

            alto =
                ancho *
                (ih / iw);

        }

        // =============================================
        // 🖥️ HORIZONTAL
        // =============================================

        else {

            // La imagen ocupa toda la altura
            alto =
                canvas.height;

            ancho =
                alto *
                (iw / ih);

            // Seguridad
            if (
                ancho >
                canvas.width
            ) {

                ancho =
                    canvas.width;

                alto =
                    ancho *
                    (ih / iw);

            }

        }

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
        // 🏠 ZONA DEL GALLINERO
        // =============================================

        const zona =
            obtenerZonaGallinero();

        // =============================================
        // 🏠 DIBUJAR GALLINERO
        // =============================================

        ctx.drawImage(

            imagenes.gallinero,

            zona.x,
            zona.y,

            zona.w,
            zona.h

        );

        // =============================================
        // 🐔 DIBUJAR POLLOS
        // =============================================

        pollosColocados.forEach(
            (pollo, indice) => {

                if (!pollo) {
                    return;
                }

                const casilla =
                    CASILLAS[indice];

                // Posición relativa
                // a la imagen real

                const xRel =
                    casilla.x +
                    casilla.w / 2;

                const yRel =
                    casilla.y +
                    casilla.h / 2;

                const x =
                    zona.x +
                    xRel * zona.w;

                const y =
                    zona.y +
                    yRel * zona.h;

                // =====================================
                // TAMAÑO DEL POLLO
                // =====================================

                let alto =
                    zona.h *
                    casilla.h *
                    0.70;

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

                let ancho =
                    alto *
                    proporcion;

                // =====================================
                // SEGURIDAD PARA VERTICAL
                // =====================================

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

                // =====================================
                // DIBUJAR
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
