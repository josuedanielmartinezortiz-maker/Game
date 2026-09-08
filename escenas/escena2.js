// =====================================================
// 🐔 GAMERPRO GAME — ESCENA 2
// =====================================================

export function iniciarEscena2(
    game,
    imagenes,
    alTerminar
) {

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "escenaCanvas";

    game.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");

    // =================================================
    // 👥 PERSONAJES
    // =================================================

    const MIKE = {
        x: 0.46,
        y: 0.63,
        escala: 0.65
    };

    const MICAELA = {
        x: 0.54,
        y: 0.63,
        escala: 0.65
    };

    // =================================================
    // 🐔 POLLO
    // =================================================

    const POLLO = {
        x: 0.50,
        y: 0.76,
        escala: 0.45
    };

    // =================================================
    // 🥚 HUEVO
    // =================================================

    const HUEVO = {

        x: 0.58,

        y: -0.15,

        escala: 0.30,

        velocidad: 0,

        gravedad: 0.0018,

        suelo: 0.84,

        cayendo: false,

        impacto: false,

        tiempoImpacto: 0
    };

    const imagenMike =
        imagenes.mike;

    const imagenMicaela =
        imagenes.micaela;

    const imagenPollo =
        imagenes.pollonoob;

    const imagenHuevo =
        imagenes.noob;

    const TAMANO_BASE = 180;

    // =================================================
    // 🎨 DIBUJAR ELEMENTO
    // =================================================

    function dibujarElemento(
        imagen,
        posicion
    ) {

        if (!imagen) return;

        const x =
            posicion.x * canvas.width;

        const y =
            posicion.y * canvas.height;

        const alto =
            TAMANO_BASE *
            posicion.escala;

        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;

        const ancho =
            alto * proporcion;

        ctx.drawImage(

            imagen,

            x - ancho / 2,

            y - alto / 2,

            ancho,

            alto

        );
    }

    // =================================================
    // 💥 EXPLOSIÓN
    // =================================================

    function dibujarExplosion() {

        if (!HUEVO.impacto)
            return;

        const transcurrido =
            performance.now() -
            HUEVO.tiempoImpacto;

        const duracion = 600;

        if (
            transcurrido >=
            duracion
        ) {

            HUEVO.impacto =
                false;

            return;
        }

        const progreso =
            transcurrido /
            duracion;

        const x =
            HUEVO.x *
            canvas.width;

        const y =
            HUEVO.suelo *
            canvas.height;

        const radio =
            25 +
            progreso * 90;

        ctx.save();

        ctx.globalAlpha =
            1 - progreso;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radio,
            0,
            Math.PI * 2
        );

        ctx.lineWidth =
            10 *
            (1 - progreso);

        ctx.strokeStyle =
            "#FFD21F";

        ctx.stroke();

        for (
            let i = 0;
            i < 8;
            i++
        ) {

            const angulo =
                (Math.PI * 2 / 8) *
                i;

            const inicio =
                radio * 0.6;

            const fin =
                radio + 25;

            ctx.beginPath();

            ctx.moveTo(

                x +
                Math.cos(angulo) *
                inicio,

                y +
                Math.sin(angulo) *
                inicio

            );

            ctx.lineTo(

                x +
                Math.cos(angulo) *
                fin,

                y +
                Math.sin(angulo) *
                fin

            );

            ctx.lineWidth = 5;

            ctx.strokeStyle =
                "#FFFFFF";

            ctx.stroke();
        }

        ctx.restore();
    }

    // =================================================
    // ⏱️ TIEMPO
    // =================================================

    let ultimoTiempo =
        performance.now();

    // =================================================
    // 🥚 FÍSICA DEL HUEVO
    // =================================================

    function actualizarHuevo(
        tiempoActual
    ) {

        if (!HUEVO.cayendo) {

            ultimoTiempo =
                tiempoActual;

            return;
        }

        const delta =
            tiempoActual -
            ultimoTiempo;

        ultimoTiempo =
            tiempoActual;

        HUEVO.velocidad +=
            HUEVO.gravedad *
            delta;

        HUEVO.y +=
            HUEVO.velocidad *
            delta;

        // =================================================
        // 💥 IMPACTO
        // =================================================

        if (
            HUEVO.y >=
            HUEVO.suelo
        ) {

            HUEVO.y =
                HUEVO.suelo;

            HUEVO.cayendo =
                false;

            HUEVO.impacto =
                true;

            HUEVO.tiempoImpacto =
                performance.now();

            console.log(
                "🥚💥 KBOOM!"
            );

            // =================================================
            // 🎬 PASAR A ESCENA 3
            // =================================================

            setTimeout(
                function() {

                    if (
                        typeof alTerminar ===
                        "function"
                    ) {

                        game.innerHTML = "";

                        alTerminar();

                    }

                },

                800
            );
        }
    }

    // =================================================
    // 🎬 DIBUJAR ESCENA
    // =================================================

    function dibujarEscena() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(

            imagenes.escena2,

            0,
            0,

            canvas.width,
            canvas.height

        );

        dibujarElemento(
            imagenMike,
            MIKE
        );

        dibujarElemento(
            imagenMicaela,
            MICAELA
        );

        dibujarElemento(
            imagenPollo,
            POLLO
        );

        dibujarElemento(
            imagenHuevo,
            HUEVO
        );

        dibujarExplosion();
    }

    // =================================================
    // 📐 CANVAS
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
    // 🔄 BUCLE
    // =================================================

    function actualizar(
        tiempoActual
    ) {

        actualizarHuevo(
            tiempoActual
        );

        dibujarEscena();

        requestAnimationFrame(
            actualizar
        );
    }

    requestAnimationFrame(
        actualizar
    );

    // =================================================
    // 🥚 APARECER HUEVO
    // =================================================

    setTimeout(
        function() {

            HUEVO.cayendo =
                true;

            HUEVO.velocidad =
                0;

            HUEVO.y =
                -0.15;

            ultimoTiempo =
                performance.now();

            console.log(
                "☁️🥚 ¡EL HUEVO APARECE!"
            );

        },

        1000
    );
            }
