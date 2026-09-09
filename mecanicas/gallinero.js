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
    }

    const escena =
        document.getElementById("escenaCanvas");

    if (escena) {
        escena.remove();
    }

    if (!imagenes || !imagenes.gallinero) {
        console.error("❌ NO EXISTE EL GALLINERO");
        return;
    }

    // =================================================
    // 🎨 CANVAS
    // =================================================

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "gallineroCanvas";

    Object.assign(canvas.style, {
        position: "fixed",
        left: "0",
        top: "0",
        width: "100vw",
        height: "100dvh",
        display: "block",
        background: "#000",
        zIndex: "10000",
        touchAction: "none"
    });

    game.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");

    // =================================================
    // 🔒 SISTEMA DE BLOQUEO
    // =================================================

    let pantallaBloqueada = false;

    let zonaBloqueada = null;

    // =================================================
    // 🔘 BOTÓN DE BLOQUEO
    // =================================================

    const botonBloqueo =
        document.createElement("button");

    botonBloqueo.id =
        "botonBloquearPantalla";

    botonBloqueo.textContent =
        "🔒 BLOQUEAR PANTALLA";

    Object.assign(botonBloqueo.style, {
        position: "fixed",
        right: "15px",
        bottom: "15px",
        zIndex: "20000",

        padding: "12px 18px",

        border: "3px solid #000",
        borderRadius: "12px",

        background: "#ffffff",
        color: "#000000",

        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        fontWeight: "bold",

        cursor: "pointer",

        boxShadow:
            "0 4px 10px rgba(0,0,0,0.5)"
    });

    game.appendChild(botonBloqueo);

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
        new Array(CASILLAS.length).fill(null);

    // =================================================
    // 🏆 POLLO GANADOR
    // =================================================

    const ganadorFinal =
        nombreGanador ||
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
        POLLOS[ganadorFinal];

    if (imagenGanador) {

        pollosColocados[0] = {
            nombre: ganadorFinal,
            imagen: imagenGanador
        };

        console.log(
            "🐔🏆 GANADOR:",
            ganadorFinal
        );

    } else {

        console.error(
            "❌ NO SE ENCONTRÓ EL POLLO:",
            ganadorFinal
        );
    }

    // =================================================
    // 🏠 OBTENER ZONA DEL GALLINERO
    // =================================================

    function calcularZonaGallinero() {

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

        const proporcion =
            iw / ih;

        const pantalla =
            canvas.width /
            canvas.height;

        let ancho;
        let alto;

        // =================================================
        // 📱 VERTICAL
        // =================================================

        if (pantalla < 1) {

            const zoomVertical = 1.12;

            ancho =
                canvas.width *
                zoomVertical;

            alto =
                ancho /
                proporcion;

            if (alto < canvas.height) {

                alto =
                    canvas.height *
                    zoomVertical;

                ancho =
                    alto *
                    proporcion;
            }

        }

        // =================================================
        // 🖥️ HORIZONTAL
        // =================================================

        else {

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
    // 📐 ZONA ACTUAL
    // =================================================

    function obtenerZonaGallinero() {

        if (
            pantallaBloqueada &&
            zonaBloqueada
        ) {

            return zonaBloqueada;
        }

        return calcularZonaGallinero();
    }

    // =================================================
    // 🐔 DIBUJAR POLLO GRANDE
    // =================================================

    function dibujarPollo(
        pollo,
        casilla,
        zona
    ) {

        if (!pollo || !pollo.imagen) {
            return;
        }

        const imagen =
            pollo.imagen;

        const iw =
            imagen.naturalWidth;

        const ih =
            imagen.naturalHeight;

        if (!iw || !ih) {
            return;
        }

        // Centro de la casilla
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

        // =================================================
        // 🐔 TAMAÑO DEL POLLO
        // =================================================

        /*
         * Antes:
         *
         * zona.h * casilla.h * 0.70
         *
         * Eso hacía que el pollo terminara
         * demasiado pequeño.
         *
         * Ahora usamos un tamaño mayor.
         */

        const MULTIPLICADOR_POLLO =
            1.45;

        let alto =
            zona.h *
            casilla.h *
            MULTIPLICADOR_POLLO;

        let ancho =
            alto *
            (iw / ih);

        // =================================================
        // 🚧 LÍMITE DE SEGURIDAD
        // =================================================

        /*
         * El pollo puede ser grande,
         * pero nunca debe salirse
         * demasiado de su casilla.
         */

        const anchoMaximo =
            zona.w *
            casilla.w *
            1.35;

        const altoMaximo =
            zona.h *
            casilla.h *
            1.35;

        if (ancho > anchoMaximo) {

            ancho =
                anchoMaximo;

            alto =
                ancho *
                (ih / iw);
        }

        if (alto > altoMaximo) {

            alto =
                altoMaximo;

            ancho =
                alto *
                (iw / ih);
        }

        // =================================================
        // 🎨 DIBUJAR
        // =================================================

        ctx.drawImage(
            imagen,
            x - ancho / 2,
            y - alto / 2,
            ancho,
            alto
        );
    }

    // =================================================
    // 🎨 DIBUJAR TODO
    // =================================================

    function dibujar() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle =
            "#000000";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const zona =
            obtenerZonaGallinero();

        // =================================================
        // 🏠 GALLINERO
        // =================================================

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

                dibujarPollo(
                    pollo,
                    CASILLAS[indice],
                    zona
                );
            }
        );
    }

    // =================================================
    // 📐 AJUSTAR CANVAS
    // =================================================

    function ajustarCanvas() {

        if (pantallaBloqueada) {
            return;
        }

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
    // 🔒 BLOQUEAR / DESBLOQUEAR
    // =================================================

    botonBloqueo.addEventListener(
        "click",
        function() {

            if (!pantallaBloqueada) {

                // Guardamos exactamente
                // el encuadre actual.
                zonaBloqueada = {
                    x: obtenerZonaGallinero().x,
                    y: obtenerZonaGallinero().y,
                    w: obtenerZonaGallinero().w,
                    h: obtenerZonaGallinero().h
                };

                pantallaBloqueada = true;

                botonBloqueo.textContent =
                    "🔓 DESBLOQUEAR PANTALLA";

                botonBloqueo.style.background =
                    "#222";

                botonBloqueo.style.color =
                    "#fff";

                console.log(
                    "🔒 PANTALLA BLOQUEADA"
                );

            } else {

                pantallaBloqueada = false;

                zonaBloqueada = null;

                botonBloqueo.textContent =
                    "🔒 BLOQUEAR PANTALLA";

                botonBloqueo.style.background =
                    "#fff";

                botonBloqueo.style.color =
                    "#000";

                ajustarCanvas();

                console.log(
                    "🔓 PANTALLA DESBLOQUEADA"
                );
            }
        }
    );

    // =================================================
    // 👆 TOCAR CASILLA
    // =================================================

    function tocarCasilla(x, y) {

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
                rx <= casilla.x + casilla.w &&
                ry >= casilla.y &&
                ry <= casilla.y + casilla.h
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
    // 👆 TOUCH
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
