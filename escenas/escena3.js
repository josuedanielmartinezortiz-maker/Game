// =====================================================
// 🐔 GAMERPRO GAME — ESCENA 3
// 🥚 REVELACIÓN DEL HUEVO
// =====================================================

export function iniciarEscena3(game, imagenes, alTerminar) {

    const canvas = document.createElement("canvas");
    canvas.id = "escenaCanvas";
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
    // 🎲 ELEGIR POLLO
    // =================================================

    function elegirPollo() {

        const numero = Math.random() * 100;

        if (numero < 98) {
            return POLLOS[0];
        }

        if (numero < 99) {
            return POLLOS[1];
        }

        return POLLOS[2];
    }

    const polloGanador = elegirPollo();

    console.log(
        `🐔 POLLO OBTENIDO: ${polloGanador.nombre}`
    );

    // Guardamos el pollo obtenido
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
    // 🐔 POSICIONES DE LOS 3 POLLOS
    // =================================================

    const CENTRO = {
        x: 0.50,
        y: 0.67
    };

    const POLLO_A = {
        x: 0.38,
        y: 0.67
    };

    const POLLO_B = {
        x: 0.50,
        y: 0.67
    };

    const POLLO_C = {
        x: 0.62,
        y: 0.67
    };

    const posiciones = [
        POLLO_A,
        POLLO_B,
        POLLO_C
    ];

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

        const posX = x * canvas.width;
        const posY = y * canvas.height;

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

        ctx.rotate(rotacion);

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
    // 🐔 TRES POLLOS
    // =================================================

    function dibujarPollos() {

        if (!animando) return;

        POLLOS.forEach((pollo, indice) => {

            const posicion =
                posiciones[indice];

            let x =
                posicion.x;

            let y =
                posicion.y;

            // 🔄 Movimiento circular
            if (!ganadorMostrado) {

                const radio = 0.035;

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

            // 💥 El ganador se acerca al centro
            if (
                ganadorMostrado &&
                pollo === polloGanador
            ) {

                x +=
                    (CENTRO.x - x) * 0.75;

                y +=
                    (CENTRO.y - y) * 0.75;
            }

            dibujarImagen(
                pollo.imagen,
                x,
                y,
                0.55,
                rotacion
            );
        });
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

        ctx.lineWidth = 8;

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
    // 🎬 ESCENA
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

        // 🥚 Huevo
        dibujarHuevo();

        // 🐔 Pollos
        dibujarPollos();

        // 💥 POM
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

    // 1️⃣ Esperar a que aparezca la escena
    setTimeout(() => {

        console.log(
            "🥚 ¡EL HUEVO SE ABRE!"
        );

        HUEVO.abierto = true;
        animando = true;

    }, 1000);


    // 2️⃣ Los pollos giran
    setTimeout(() => {

        console.log(
            "🔄🐔 ¡LOS POLLOS GIRAN!"
        );

    }, 2500);


    // 3️⃣ POM y selección
    setTimeout(() => {

        animando = false;
        ganadorMostrado = true;

        console.log(
            `💥 POM! GANADOR: ${polloGanador.nombre}`
        );

    }, 5500);


    // 4️⃣ Esperar y terminar cinemática
    setTimeout(() => {

        console.log(
            "🚀 TP AL GALLINERO"
        );

        // El gameplay podrá leer esto
        window.gamerproComenzarJuego = true;

        // Limpiar escena
        game.innerHTML = "";

        // Pasar al juego
        if (typeof alTerminar === "function") {
            alTerminar(
                polloGanador
            );
        }

    }, 8000);
          }
