// =====================================================
// 🐔 GAMERPRO GAME — ESCENA 2
// =====================================================

export function iniciarEscena2(game, imagenes) {

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

    const POLLO = {
        x: 0.50,
        y: 0.76,
        escala: 0.45
    };


    // =================================================
    // 🥚 HUEVO
    // =================================================

    const HUEVO = {

        x: 0.50,

        // Empieza arriba del cielo
        y: -0.15,

        escala: 0.30,

        velocidad: 0,

        gravedad: 0.0012,

        suelo: 0.84,

        cayendo: true,

        rebotando: false,

        rebotes: 0
    };


    // =================================================
    // 🖼️ IMÁGENES
    // =================================================

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
            posicion.x *
            canvas.width;

        const y =
            posicion.y *
            canvas.height;

        const alto =
            TAMANO_BASE *
            posicion.escala;

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


    // =================================================
    // 🥚 ANIMACIÓN DEL HUEVO
    // =================================================

    let ultimoTiempo =
        performance.now();

    function actualizarHuevo(tiempoActual) {

        const delta =
            tiempoActual -
            ultimoTiempo;

        ultimoTiempo =
            tiempoActual;


        if (HUEVO.cayendo) {

            // Gravedad
            HUEVO.velocidad +=
                HUEVO.gravedad *
                delta;

            // Movimiento
            HUEVO.y +=
                HUEVO.velocidad *
                delta;


            // Llegó al suelo
            if (
                HUEVO.y >=
                HUEVO.suelo
            ) {

                HUEVO.y =
                    HUEVO.suelo;

                HUEVO.velocidad *=
                    -0.35;

                HUEVO.rebotes++;

                if (
                    HUEVO.rebotes >= 2
                ) {

                    HUEVO.velocidad =
                        0;

                    HUEVO.cayendo =
                        false;
                }
            }
        }


        ultimoTiempo =
            tiempoActual;
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


        // 🌾 Fondo

        ctx.drawImage(
            imagenes.escena2,
            0,
            0,
            canvas.width,
            canvas.height
        );


        // 👦 Mike

        dibujarElemento(
            imagenMike,
            MIKE
        );


        // 👧 Micaela

        dibujarElemento(
            imagenMicaela,
            MICAELA
        );


        // 🐔 Pollo

        dibujarElemento(
            imagenPollo,
            POLLO
        );


        // 🥚 Huevo

        dibujarElemento(
            imagenHuevo,
            HUEVO
        );
    }


    // =================================================
    // 📱 AJUSTAR CANVAS
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

    function actualizar(tiempoActual) {

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
}
