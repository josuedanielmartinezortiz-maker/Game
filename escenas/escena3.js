// =====================================================
// 🐔 GAMERPRO GAME — ESCENA 3
// 🎰 RULETA + HUEVO GIGANTE
// =====================================================

export function iniciarEscena3(game, imagenes, alTerminar) {

    const canvas = document.createElement("canvas");

    canvas.id = "escenaCanvas";

    Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "1000"
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

    function elegirPollo() {

        const numero =
            Math.random() * 100;

        if (numero < 98)
            return POLLOS[0];

        if (numero < 99)
            return POLLOS[1];

        return POLLOS[2];
    }


    const ganador =
        elegirPollo();


    console.log(
        "🎰 GANADOR:",
        ganador.nombre
    );


    // =================================================
    // 🥚 ESTADOS
    // =================================================

    let estado = "HUEVO";

    let tiempoInicio =
        performance.now();

    let anguloRuleta = 0;

    let velocidadRuleta = 0;

    let indiceActual = 0;

    let tiempoGanador = 0;


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

    function dibujarHuevoGigante() {

        const imagen =
            imagenes.noob;

        if (!imagen)
            return;


        const ancho =
            canvas.width * 0.75;

        const alto =
            canvas.height * 0.90;


        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;


        let w = ancho;
        let h = w / proporcion;


        if (h > alto) {

            h = alto;
            w = h * proporcion;

        }


        ctx.drawImage(

            imagen,

            canvas.width / 2 - w / 2,

            canvas.height / 2 - h / 2,

            w,
            h

        );
    }


    // =================================================
    // 🎰 RULETA
    // =================================================

    function dibujarRuleta() {

        const centroX =
            canvas.width / 2;

        const centroY =
            canvas.height / 2;


        const radio =
            Math.min(
                canvas.width,
                canvas.height
            ) * 0.32;


        for (
            let i = 0;
            i < POLLOS.length;
            i++
        ) {

            const angulo =
                anguloRuleta +
                i * (Math.PI * 2 / POLLOS.length);


            const x =
                centroX +
                Math.cos(angulo) *
                radio;


            const y =
                centroY +
                Math.sin(angulo) *
                radio;


            dibujarPollo(
                POLLOS[i].imagen,
                x,
                y,
                0.32,
                angulo
            );
        }
    }


    // =================================================
    // 🐔 DIBUJAR POLLO
    // =================================================

    function dibujarPollo(
        imagen,
        x,
        y,
        escala,
        rotacion
    ) {

        if (!imagen)
            return;


        const tamano =
            Math.min(
                canvas.width,
                canvas.height
            ) * escala;


        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;


        const ancho =
            tamano * proporcion;


        ctx.save();


        ctx.translate(
            x,
            y
        );


        ctx.rotate(
            rotacion
        );


        ctx.drawImage(

            imagen,

            -ancho / 2,

            -tamano / 2,

            ancho,

            tamano

        );


        ctx.restore();
    }


    // =================================================
    // ⭐ GANADOR GIGANTE
    // =================================================

    function dibujarGanador() {

        const imagen =
            ganador.imagen;

        if (!imagen)
            return;


        const progreso =
            Math.min(
                (performance.now() -
                    tiempoGanador) / 800,
                1
            );


        const escala =
            0.25 +
            progreso * 0.75;


        const tamano =
            Math.max(
                canvas.width,
                canvas.height
            ) * escala;


        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;


        const ancho =
            tamano * proporcion;


        ctx.save();


        ctx.translate(
            canvas.width / 2,
            canvas.height / 2
        );


        ctx.rotate(
            Math.sin(progreso * Math.PI) * 0.04
        );


        ctx.drawImage(

            imagen,

            -ancho / 2,

            -tamano / 2,

            ancho,

            tamano

        );


        ctx.restore();


        // 💥 POM

        if (progreso >= 1) {

            ctx.save();

            ctx.font =
                "bold " +
                Math.min(
                    canvas.width,
                    canvas.height
                ) * 0.16 +
                "px Arial";

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.fillStyle =
                "#fff";

            ctx.strokeStyle =
                "#000";

            ctx.lineWidth = 10;

            ctx.strokeText(
                "💥 POM!",
                canvas.width / 2,
                canvas.height * 0.82
            );

            ctx.fillText(
                "💥 POM!",
                canvas.width / 2,
                canvas.height * 0.82
            );

            ctx.restore();
        }
    }


    // =================================================
    // 🎬 RENDER
    // =================================================

    function dibujarEscena() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // Fondo

        ctx.drawImage(
            imagenes.escena2,
            0,
            0,
            canvas.width,
            canvas.height
        );


        if (estado === "HUEVO") {

            dibujarHuevoGigante();

        }


        if (estado === "RULETA") {

            dibujarRuleta();

        }


        if (estado === "GANADOR") {

            dibujarGanador();

        }
    }


    // =================================================
    // 🔄 ANIMACIÓN
    // =================================================

    function actualizar() {

        const ahora =
            performance.now();


        const transcurrido =
            ahora - tiempoInicio;


        // =============================================
        // 🥚 HUEVO
        // =============================================

        if (
            estado === "HUEVO" &&
            transcurrido >= 1800
        ) {

            estado =
                "RULETA";

            tiempoInicio =
                ahora;

            velocidadRuleta =
                0.55;

            console.log(
                "🥚💥 ¡HUEVO ABIERTO!"
            );
        }


        // =============================================
        // 🎰 RULETA
        // =============================================

        if (estado === "RULETA") {

            anguloRuleta +=
                velocidadRuleta;


            // Después de unos segundos
            // comienza a frenar

            if (transcurrido > 2500) {

                velocidadRuleta *=
                    0.985;
            }


            // Cuando está casi detenida
            if (
                transcurrido > 6000 &&
                velocidadRuleta < 0.01
            ) {

                estado =
                    "GANADOR";

                tiempoGanador =
                    ahora;

                console.log(
                    "⭐ ¡GANADOR!",
                    ganador.nombre
                );
            }
        }


        dibujarEscena();

        requestAnimationFrame(
            actualizar
        );
    }


    actualizar();


    // =================================================
    // ⏱️ FINAL
    // =================================================

    setTimeout(
        () => {

            if (
                typeof alTerminar ===
                "function"
            ) {

                alTerminar(
                    ganador
                );

            }

        },
        9000
    );
            }
