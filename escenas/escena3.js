// =====================================================
// 🥚 GAMERPRO GAME — ESCENA 3
// =====================================================

export function iniciarEscena3(
    game,
    imagenes,
    alTerminar
) {

    // =================================================
    // 🖼️ CANVAS
    // =================================================

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "escena3Canvas";

    Object.assign(
        canvas.style,
        {
            position: "fixed",
            inset: "0",
            width: "100vw",
            height: "100vh",
            background: "#000",
            zIndex: "9999"
        }
    );

    game.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");

    // =================================================
    // 🐔 POLLOS Y PROBABILIDADES
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
    // 🎯 ELEGIR GANADOR
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

    console.log(
        "🎰 RESULTADO:",
        ganador.nombre
    );

    // Guardar ganador
    window.gamerproPolloObtenido =
        ganador.nombre;

    // =================================================
    // 🎬 ESTADOS
    // =================================================

    let estado =
        "HUEVO";

    let indiceRuleta =
        0;

    let intervaloRuleta =
        null;

    let terminado =
        false;

    // =================================================
    // 🥚 HUEVO
    // =================================================

    const HUEVO = {

        x: 0.50,

        y: 0.50,

        escala: 3.2
    };

    // =================================================
    // 🐔 GANADOR
    // =================================================

    const GANADOR = {

        x: 0.50,

        y: 0.50,

        escala: 3.8,

        alpha: 0
    };

    // =================================================
    // 🎨 DIBUJAR IMAGEN
    // =================================================

    function dibujarImagen(
        imagen,
        x,
        y,
        escala,
        alpha = 1
    ) {

        if (!imagen)
            return;

        const anchoBase =
            imagen.naturalWidth;

        const altoBase =
            imagen.naturalHeight;

        if (
            !anchoBase ||
            !altoBase
        ) return;

        const ancho =
            anchoBase * escala;

        const alto =
            altoBase * escala;

        ctx.save();

        ctx.globalAlpha =
            alpha;

        ctx.drawImage(

            imagen,

            x - ancho / 2,

            y - alto / 2,

            ancho,

            alto

        );

        ctx.restore();
    }

    // =================================================
    // 🥚 DIBUJAR HUEVO
    // =================================================

    function dibujarHuevo() {

        const x =
            HUEVO.x *
            canvas.width;

        const y =
            HUEVO.y *
            canvas.height;

        dibujarImagen(

            imagenes.noob,

            x,
            y,

            HUEVO.escala

        );
    }

    // =================================================
    // 🎰 DIBUJAR RULETA
    // =================================================

    function dibujarRuleta() {

        const pollo =
            POLLOS[indiceRuleta];

        if (!pollo)
            return;

        const x =
            canvas.width / 2;

        const y =
            canvas.height / 2;

        dibujarImagen(

            pollo.imagen,

            x,
            y,

            3.0

        );
    }

    // =================================================
    // 🐔 DIBUJAR GANADOR
    // =================================================

    function dibujarGanador() {

        if (
            GANADOR.alpha <= 0
        ) return;

        const x =
            GANADOR.x *
            canvas.width;

        const y =
            GANADOR.y *
            canvas.height;

        dibujarImagen(

            ganador.imagen,

            x,
            y,

            GANADOR.escala,

            GANADOR.alpha

        );
    }

    // =================================================
    // 💥 TEXTO POM
    // =================================================

    function dibujarPOM() {

        if (
            estado !==
            "GANADOR"
        ) return;

        ctx.save();

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.font =
            "bold 90px Arial";

        ctx.fillStyle =
            "#FFFFFF";

        ctx.strokeStyle =
            "#000000";

        ctx.lineWidth =
            12;

        ctx.strokeText(

            "POM",

            canvas.width / 2,

            canvas.height * 0.86

        );

        ctx.fillText(

            "POM",

            canvas.width / 2,

            canvas.height * 0.86

        );

        ctx.restore();
    }

    // =================================================
    // 🎨 ESCENA COMPLETA
    // =================================================

    function dibujarEscena() {

        ctx.clearRect(

            0,
            0,
            canvas.width,
            canvas.height

        );

        // Siempre negro
        ctx.fillStyle =
            "#000";

        ctx.fillRect(

            0,
            0,
            canvas.width,
            canvas.height

        );

        // -----------------------------
        // 🥚 HUEVO
        // -----------------------------

        if (
            estado ===
            "HUEVO"
        ) {

            dibujarHuevo();

        }

        // -----------------------------
        // 🎰 RULETA
        // -----------------------------

        if (
            estado ===
            "RULETA"
        ) {

            dibujarRuleta();

        }

        // -----------------------------
        // 🐔 GANADOR
        // -----------------------------

        if (
            estado ===
            "GANADOR"
        ) {

            dibujarGanador();

            dibujarPOM();

        }
    }

    // =================================================
    // 📐 AJUSTAR CANVAS
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
    // 🎰 INICIAR RULETA
    // =================================================

    function iniciarRuleta() {

        estado =
            "RULETA";

        console.log(
            "🎰 ¡RULETA INICIADA!"
        );

        intervaloRuleta =
            setInterval(

                function() {

                    indiceRuleta++;

                    if (
                        indiceRuleta >=
                        POLLOS.length
                    ) {

                        indiceRuleta =
                            0;

                    }

                },

                100
            );
    }

    // =================================================
    // 🛑 DETENER RULETA
    // =================================================

    function detenerRuleta() {

        if (
            intervaloRuleta
        ) {

            clearInterval(
                intervaloRuleta
            );

            intervaloRuleta =
                null;
        }

        // Mostrar exactamente
        // el ganador de la probabilidad

        indiceRuleta =
            POLLOS.indexOf(
                ganador
            );

        console.log(
            "🏆 GANADOR:",
            ganador.nombre
        );

        estado =
            "GANADOR";

        GANADOR.alpha =
            0;

        // Aparece suavemente

        const inicio =
            performance.now();

        function aparecerGanador(
            tiempo
        ) {

            const progreso =
                Math.min(
                    (tiempo - inicio) /
                    500,
                    1
                );

            GANADOR.alpha =
                progreso;

            if (
                progreso < 1
            ) {

                requestAnimationFrame(
                    aparecerGanador
                );

            }

        }

        requestAnimationFrame(
            aparecerGanador
        );

        // -----------------------------
        // 💥 POM Y PASAR AL GALLINERO
        // -----------------------------

        setTimeout(

            function() {

                if (
                    terminado
                ) return;

                terminado =
                    true;

                console.log(
                    "💥 POM"
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

            3000
        );
    }

    // =================================================
    // 🚀 SECUENCIA
    // =================================================

    // 1. Huevo gigante
    setTimeout(

        function() {

            estado =
                "HUEVO";

            console.log(
                "🥚 HUEVO GIGANTE"
            );

        },

        300
    );

    // 2. Abrir huevo → ruleta
    setTimeout(

        function() {

            iniciarRuleta();

        },

        2500
    );

    // 3. Ruleta termina
    setTimeout(

        function() {

            detenerRuleta();

        },

        5500
    );

    // =================================================
    // 🔄 BUCLE
    // =================================================

    function actualizar() {

        dibujarEscena();

        requestAnimationFrame(
            actualizar
        );
    }

    requestAnimationFrame(
        actualizar
    );
            }
