// =====================================================
// 🐔 GAMERPRO GAME — ESCENA 3
// 🥚 HUEVO GIGANTE + 🎰 RULETA + 🐔 GANADOR
// =====================================================

export function iniciarEscena3(game, imagenes, alTerminar) {

    const canvas = document.createElement("canvas");

    canvas.id = "escena3Canvas";

    Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        background: "#000",
        zIndex: "9999"
    });

    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");


    // =================================================
    // 🐔 POLLOS
    // =================================================

    const POLLOS = [
        {
            nombre: "Pollo Noob",
            imagen: imagenes.pollonoob,
            probabilidad: 98
        },
        {
            nombre: "Pollo Zombie",
            imagen: imagenes.pollozombie,
            probabilidad: 1
        },
        {
            nombre: "Pollito Noob",
            imagen: imagenes.pollitonoob,
            probabilidad: 1
        }
    ];


    // =================================================
    // 🎲 ELEGIR GANADOR
    // =================================================

    function elegirGanador() {

        const numero =
            Math.random() * 100;

        if (numero < 98) {
            return POLLOS[0];
        }

        if (numero < 99) {
            return POLLOS[1];
        }

        return POLLOS[2];
    }

    const ganador =
        elegirGanador();


    window.gamerproPolloObtenido =
        ganador.nombre;


    console.log(
        "🎰 GANADOR:",
        ganador.nombre
    );


    // =================================================
    // 🔄 ESTADO
    // =================================================

    let estado = "HUEVO";

    let tiempoEstado =
        performance.now();

    let velocidad =
        0;

    let indiceRuleta = 0;

    let ganadorMostrado =
        false;


    // =================================================
    // 📐 CANVAS
    // =================================================

    function ajustarCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    ajustarCanvas();


    window.addEventListener(
        "resize",
        ajustarCanvas
    );


    // =================================================
    // 🥚 HUEVO GIGANTE
    // =================================================

    function dibujarHuevo() {

        const imagen =
            imagenes.noob;

        if (!imagen)
            return;


        const maximo =
            Math.min(
                canvas.width,
                canvas.height
            ) * 0.92;


        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;


        let alto =
            maximo;

        let ancho =
            alto * proporcion;


        if (ancho > canvas.width * 0.92) {

            ancho =
                canvas.width * 0.92;

            alto =
                ancho / proporcion;

        }


        ctx.drawImage(

            imagen,

            canvas.width / 2 - ancho / 2,

            canvas.height / 2 - alto / 2,

            ancho,

            alto

        );

    }


    // =================================================
    // 🐔 DIBUJAR POLLO GRANDE
    // =================================================

    function dibujarPolloGrande(
        pollo,
        escala = 1
    ) {

        if (!pollo || !pollo.imagen)
            return;


        const imagen =
            pollo.imagen;


        const maximo =
            Math.min(
                canvas.width,
                canvas.height
            ) * 0.88 * escala;


        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;


        let alto =
            maximo;

        let ancho =
            alto * proporcion;


        if (ancho > canvas.width * 0.92) {

            ancho =
                canvas.width * 0.92;

            alto =
                ancho / proporcion;

        }


        ctx.drawImage(

            imagen,

            canvas.width / 2 - ancho / 2,

            canvas.height / 2 - alto / 2,

            ancho,

            alto

        );

    }


    // =================================================
    // 🎰 POLLO QUE PASA
    // =================================================

    function dibujarPolloRuleta() {

        const pollo =
            POLLOS[indiceRuleta];


        if (!pollo || !pollo.imagen)
            return;


        const imagen =
            pollo.imagen;


        const alto =
            Math.min(
                canvas.width,
                canvas.height
            ) * 0.70;


        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;


        const ancho =
            alto * proporcion;


        const centroX =
            canvas.width / 2;


        const centroY =
            canvas.height / 2;


        ctx.save();


        ctx.translate(
            centroX,
            centroY
        );


        // Pequeña rotación
        ctx.rotate(
            Math.sin(
                performance.now() * 0.02
            ) * 0.10
        );


        ctx.drawImage(

            imagen,

            -ancho / 2,

            -alto / 2,

            ancho,

            alto

        );


        ctx.restore();

    }


    // =================================================
    // 💥 POM
    // =================================================

    function dibujarPOM() {

        ctx.save();


        const tamano =
            Math.min(
                canvas.width,
                canvas.height
            ) * 0.16;


        ctx.font =
            "bold " +
            tamano +
            "px Arial";


        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";


        ctx.lineWidth =
            tamano * 0.08;


        ctx.strokeStyle =
            "#000";


        ctx.fillStyle =
            "#fff";


        ctx.strokeText(
            "💥 POM!",
            canvas.width / 2,
            canvas.height * 0.86
        );


        ctx.fillText(
            "💥 POM!",
            canvas.width / 2,
            canvas.height * 0.86
        );


        ctx.restore();

    }


    // =================================================
    // 🎨 DIBUJAR
    // =================================================

    function dibujar() {

        // ⬛ SIEMPRE NEGRO

        ctx.fillStyle =
            "#000";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // 🥚 HUEVO

        if (estado === "HUEVO") {

            dibujarHuevo();

        }


        // 🎰 RULETA

        if (estado === "RULETA") {

            dibujarPolloRuleta();

        }


        // 🐔 GANADOR

        if (estado === "GANADOR") {

            dibujarPolloGrande(
                ganador,
                1
            );

            dibujarPOM();

        }

    }


    // =================================================
    // 🔄 ANIMACIÓN
    // =================================================

    function actualizar() {

        const ahora =
            performance.now();


        const tiempo =
            ahora -
            tiempoEstado;


        // =============================================
        // 🥚 HUEVO
        // =============================================

        if (
            estado === "HUEVO" &&
            tiempo >= 1800
        ) {

            estado =
                "RULETA";

            tiempoEstado =
                ahora;

            velocidad =
                0.12;

            console.log(
                "💥🥚 ¡EL HUEVO SE ABRE!"
            );

        }


        // =============================================
        // 🎰 RULETA
        // =============================================

        if (estado === "RULETA") {

            // Cambiar pollo rápidamente

            if (tiempo > 70) {

                indiceRuleta =
                    (indiceRuleta + 1)
                    % POLLOS.length;

                tiempoEstado =
                    ahora;

            }


            // Después de cierto tiempo
            // comenzamos a frenar

            if (
                performance.now() -
                tiempoInicioRuleta >
                3000
            ) {

                velocidad *= 0.96;

            }

        }


        dibujar();

        requestAnimationFrame(
            actualizar
        );

    }
 
    // =================================================
    // ⏱️ CONTROL DE RULETA
    // =================================================

    let tiempoInicioRuleta =
        0;


    // Iniciar animación

    function comenzarRuleta() {

        tiempoInicioRuleta =
            performance.now();

    }


    // =============================================
    // 🥚 → 🎰
    // =============================================

    setTimeout(
        comenzarRuleta,
        1800
    );


    // =================================================
    // ⭐ GANADOR
    // =================================================

    setTimeout(
        () => {

            estado =
                "GANADOR";

            ganadorMostrado =
                true;

            console.log(
                "⭐🐔 GANADOR FINAL:",
                ganador.nombre
            );

        },
        5500
    );


    // =================================================
    // 🚀 TERMINAR
    // =================================================

    setTimeout(
        () => {

            console.log(
                "🎬 ESCENA 3 TERMINADA"
            );


            if (
                typeof alTerminar ===
                "function"
            ) {

                alTerminar(
                    ganador
                );

            }

        },
        8500
    );


    // =================================================
    // ▶️ INICIAR
    // =================================================

    actualizar();

}
