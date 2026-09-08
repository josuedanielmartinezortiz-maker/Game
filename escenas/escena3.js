// =====================================================
// GAMERPRO GAME — ESCENA 3
// =====================================================

export function iniciarEscena3(
    game,
    imagenes,
    alTerminar
) {
    const canvas = document.createElement("canvas");
    canvas.id = "escena3Canvas";

    Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        display: "block",
        background: "#000",
        zIndex: "9999"
    });

    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // =================================================
    // POLLOS
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
    // GANADOR POR PROBABILIDAD
    // =================================================

    function elegirGanador() {
        const numero = Math.random() * 100;

        if (numero < 98) {
            return POLLOS[0];
        }

        if (numero < 99) {
            return POLLOS[1];
        }

        return POLLOS[2];
    }

    const ganador = elegirGanador();

    console.log(
        "🎰 RESULTADO:",
        ganador.nombre
    );

    window.gamerproPolloObtenido =
        ganador.nombre;

    // =================================================
    // ESTADOS
    // =================================================

    let estado = "HUEVO";
    let indiceRuleta = 0;
    let intervaloRuleta = null;
    let terminado = false;

    // =================================================
    // CONFIGURACIÓN
    // =================================================

    const HUEVO = {
        x: 0.50,
        y: 0.50,
        escala: 1
    };

    const GANADOR = {
        x: 0.50,
        y: 0.50,
        escala: 1,
        alpha: 0
    };

    // =================================================
    // DIBUJAR IMAGEN SIN CORTAR
    // =================================================

    function dibujarImagen(
        imagen,
        x,
        y,
        escala = 1,
        alpha = 1
    ) {
        if (!imagen) {
            console.error(
                "❌ IMAGEN NO EXISTE"
            );
            return;
        }

        const anchoBase =
            imagen.naturalWidth;

        const altoBase =
            imagen.naturalHeight;

        if (!anchoBase || !altoBase) {
            console.error(
                "❌ IMAGEN SIN DIMENSIONES"
            );
            return;
        }

        // =============================================
        // MARGEN DE SEGURIDAD
        // =============================================

        const margen = 30;

        const anchoDisponible =
            canvas.width - margen * 2;

        const altoDisponible =
            canvas.height - margen * 2;

        // =============================================
        // MANTENER PROPORCIÓN
        // =============================================

        const factor =
            Math.min(
                anchoDisponible / anchoBase,
                altoDisponible / altoBase
            );

        // Nunca permitir que salga de la pantalla
        const factorFinal =
            Math.min(
                factor * escala,
                factor
            );

        const ancho =
            anchoBase * factorFinal;

        const alto =
            altoBase * factorFinal;

        ctx.save();

        ctx.globalAlpha = alpha;

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
    // HUEVO
    // =================================================

    function dibujarHuevo() {
        const x =
            HUEVO.x * canvas.width;

        const y =
            HUEVO.y * canvas.height;

        dibujarImagen(
            imagenes.noob,
            x,
            y,
            HUEVO.escala
        );
    }

    // =================================================
    // RULETA
    // =================================================

    function dibujarRuleta() {
        const pollo =
            POLLOS[indiceRuleta];

        if (!pollo) return;

        const x =
            canvas.width / 2;

        const y =
            canvas.height / 2;

        dibujarImagen(
            pollo.imagen,
            x,
            y,
            1
        );
    }

    // =================================================
    // GANADOR
    // =================================================

    function dibujarGanador() {
        if (GANADOR.alpha <= 0) {
            return;
        }

        const x =
            GANADOR.x * canvas.width;

        const y =
            GANADOR.y * canvas.height;

        dibujarImagen(
            ganador.imagen,
            x,
            y,
            GANADOR.escala,
            GANADOR.alpha
        );
    }

    // =================================================
    // POM
    // =================================================

    function dibujarPOM() {
        if (estado !== "GANADOR") {
            return;
        }

        ctx.save();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font =
            "bold 90px Arial";

        ctx.fillStyle =
            "#FFFFFF";

        ctx.strokeStyle =
            "#000000";

        ctx.lineWidth = 12;

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
    // DIBUJAR ESCENA
    // =================================================

    function dibujarEscena() {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle = "#000";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        if (estado === "HUEVO") {
            dibujarHuevo();
        }

        if (estado === "RULETA") {
            dibujarRuleta();
        }

        if (estado === "GANADOR") {
            dibujarGanador();
            dibujarPOM();
        }
    }

    // =================================================
    // AJUSTAR CANVAS
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
    // INICIAR RULETA
    // =================================================

    function iniciarRuleta() {
        estado = "RULETA";

        console.log(
            "🎰 ¡RULETA INICIADA!"
        );

        intervaloRuleta =
            setInterval(function() {

                indiceRuleta++;

                if (
                    indiceRuleta >=
                    POLLOS.length
                ) {
                    indiceRuleta = 0;
                }

            }, 100);
    }

    // =================================================
    // DETENER RULETA
    // =================================================

    function detenerRuleta() {

        if (intervaloRuleta) {

            clearInterval(
                intervaloRuleta
            );

            intervaloRuleta = null;
        }

        indiceRuleta =
            POLLOS.indexOf(ganador);

        console.log(
            "🏆 GANADOR:",
            ganador.nombre
        );

        estado = "GANADOR";

        GANADOR.alpha = 0;

        const inicio =
            performance.now();

        function aparecerGanador(tiempo) {

            const progreso =
                Math.min(
                    (tiempo - inicio) / 500,
                    1
                );

            GANADOR.alpha =
                progreso;

            if (progreso < 1) {

                requestAnimationFrame(
                    aparecerGanador
                );
            }
        }

        requestAnimationFrame(
            aparecerGanador
        );

        // =============================================
        // DESPUÉS DEL POM
        // =============================================

        setTimeout(function() {

            if (terminado) {
                return;
            }

            terminado = true;

            console.log(
                "💥 POM"
            );

            if (
                typeof alTerminar ===
                "function"
            ) {
                alTerminar(ganador);
            }

        }, 3000);
    }

    // =================================================
    // HUEVO
    // =================================================

    setTimeout(function() {

        estado = "HUEVO";

        console.log(
            "🥚 HUEVO GIGANTE"
        );

    }, 300);

    // =================================================
    // RULETA
    // =================================================

    setTimeout(function() {

        iniciarRuleta();

    }, 2500);

    // =================================================
    // GANADOR
    // =================================================

    setTimeout(function() {

        detenerRuleta();

    }, 5500);

    // =================================================
    // BUCLE
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
