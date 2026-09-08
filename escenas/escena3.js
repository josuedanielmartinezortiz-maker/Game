// =====================================================
// 🐔 GAMERPRO GAME — ESCENA 3
// 🥚 REVELACIÓN DEL HUEVO
// =====================================================

export function iniciarEscena3(game, imagenes, alTerminar) {

    const canvas =
        document.createElement("canvas");

    canvas.id = "escenaCanvas";

    game.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");


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
    // 🎲 ELEGIR POLLO
    // =================================================

    function elegirPollo() {

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


    const polloGanador =
        elegirPollo();


    console.log(
        `🐔 POLLO OBTENIDO: ${polloGanador.nombre}`
    );


    window.gamerproPolloObtenido =
        polloGanador.nombre;


    // =================================================
    // 🥚 HUEVO
    // =================================================

    const HUEVO = {

        x: 0.58,
        y: 0.84,
        escala: 0.30,

        abierto: false
    };


    // =================================================
    // 🐔 POSICIONES
    // =================================================

    const posiciones = [

        {
            x: 0.38,
            y: 0.67
        },

        {
            x: 0.50,
            y: 0.67
        },

        {
            x: 0.62,
            y: 0.67
        }
    ];


    const CENTRO = {

        x: 0.50,
        y: 0.67
    };


    // =================================================
    // 🔄 ANIMACIÓN
    // =================================================

    let rotacion = 0;

    let animando = false;

    let ganadorMostrado = false;


    const TAMANO_BASE = 180;


    // =================================================
    // 🎨 DIBUJAR IMAGEN
    // =================================================

    function dibujarImagen(
        imagen,
        x,
        y,
        escala,
        rotacion = 0
    ) {

        if (!imagen) return;


        const posX =
            x * canvas.width;

        const posY =
            y * canvas.height;


        const alto =
            TAMANO_BASE * escala;


        const proporcion =
            imagen.naturalWidth /
            imagen.naturalHeight;


        const ancho =
            alto * proporcion;


        ctx.save();


        ctx.translate(
            posX,
            posY
        );


        ctx.rotate(
            rotacion
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
    // 🥚 HUEVO
    // =================================================

    function dibujarHuevo() {

        if (HUEVO.abierto) return;


        dibujarImagen(

            imagenes.noob,

            HUEVO.x,
            HUEVO.y,

            HUEVO.escala
        );
    }


    // =================================================
    // 🐔 POLLOS
    // =================================================

    function dibujarPollos() {

        if (!animando) return;


        POLLOS.forEach(
            (pollo, indice) => {

                const posicion =
                    posiciones[indice];


                let x =
                    posicion.x;

                let y =
                    posicion.y;


                // 🔄 GIRAR
                if (!ganadorMostrado) {

                    const radio =
                        0.035;


                    x +=
                        Math.cos(
                            rotacion +
                            indice * 2.1
                        ) * radio;


                    y +=
                        Math.sin(
                            rotacion +
                            indice * 2.1
                        ) * radio;
                }


                // 💥 GANADOR AL CENTRO
                if (
                    ganadorMostrado &&
                    pollo === polloGanador
                ) {

                    x +=
                        (
                            CENTRO.x - x
                        ) * 0.75;


                    y +=
                        (
                            CENTRO.y - y
                        ) * 0.75;
                }


                dibujarImagen(

                    pollo.imagen,

                    x,
                    y,

                    0.55,

                    rotacion
                );
            }
        );
    }


    // =================================================
    // 💥 POM
    // =================================================

    function dibujarPOM() {

        ctx.save();


        ctx.font =
            "bold 70px Arial";


        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "middle";


        ctx.fillStyle =
            "#FFFFFF";


        ctx.strokeStyle =
            "#000000";


        ctx.lineWidth =
            8;


        ctx.strokeText(

            "💥 POM!",

            canvas.width / 2,

            canvas.height * 0.45
        );


        ctx.fillText(

            "💥 POM!",

            canvas.width / 2,

            canvas.height * 0.45
        );


        ctx.restore();
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


        dibujarHuevo();


        dibujarPollos();


        if (ganadorMostrado) {

            dibujarPOM();
        }
    }


    // =================================================
    // 📱 CANVAS
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

    function actualizar() {

        if (animando) {

            rotacion += 0.12;
        }


        dibujarEscena();


        requestAnimationFrame(
            actualizar
        );
    }


    actualizar();


    // =================================================
    // 🎬 SECUENCIA
    // =================================================


    // 🥚 1. ABRIR HUEVO

    setTimeout(() => {

        console.log(
            "🥚 ¡EL HUEVO SE ABRE!"
        );


        HUEVO.abierto =
            true;


        animando =
            true;

    }, 1000);


    // 🔄 2. GIRAR

    setTimeout(() => {

        console.log(
            "🔄🐔 ¡LOS 3 POLLOS GIRAN!"
        );

    }, 2500);


    // 💥 3. POM

    setTimeout(() => {

        animando =
            false;


        ganadorMostrado =
            true;


        console.log(

            `💥 POM! GANADOR: ${polloGanador.nombre}`
        );

    }, 5500);


    // 🚀 4. TERMINAR

    setTimeout(() => {

        console.log(
            "🚀 TP AL GALLINERO"
        );


        window.gamerproComenzarJuego =
            true;


        game.innerHTML = "";


        if (
            typeof alTerminar ===
            "function"
        ) {

            alTerminar(
                polloGanador
            );
        }

    }, 8000);
}
