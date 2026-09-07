// =====================================================
// 🎮 GAMERPRO GAME — PANTALLA DE CARGA
// 📱 VERSIÓN CORREGIDA
// =====================================================

export function crearPantallaCarga(game) {

    const pantalla = document.createElement("div");

    pantalla.id = "pantallaCarga";

    Object.assign(pantalla.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "10000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        touchAction: "manipulation",
        userSelect: "none",
        WebkitUserSelect: "none"
    });

    pantalla.innerHTML = `
        <div style="
            font-size: clamp(30px, 8vw, 42px);
            font-weight: bold;
            margin-bottom: 30px;
        ">
            GAMERPRO GAME
        </div>

        <div id="textoCarga" style="
            font-size: 20px;
            margin-bottom: 15px;
        ">
            Cargando... 0%
        </div>

        <div style="
            width: 75%;
            max-width: 500px;
            height: 20px;
            border: 2px solid white;
            border-radius: 10px;
            overflow: hidden;
        ">
            <div id="barraCarga" style="
                width: 0%;
                height: 100%;
                background: white;
                transition: width 0.2s ease;
            "></div>
        </div>

        <button id="botonIniciar" type="button" style="
            margin-top: 35px;
            padding: 16px 30px;
            font-size: 20px;
            font-weight: bold;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            display: none;
            touch-action: manipulation;
        ">
            👆 TOCA PARA INICIAR
        </button>
    `;

    game.appendChild(pantalla);

    const textoCarga =
        pantalla.querySelector("#textoCarga");

    const barraCarga =
        pantalla.querySelector("#barraCarga");

    const botonIniciar =
        pantalla.querySelector("#botonIniciar");


    // =================================================
    // 📊 ACTUALIZAR CARGA
    // =================================================

    function actualizarCarga(cargadas, total) {

        if (total <= 0) return;

        const porcentaje =
            Math.round((cargadas / total) * 100);

        textoCarga.textContent =
            `Cargando... ${porcentaje}%`;

        barraCarga.style.width =
            `${porcentaje}%`;
    }


    // =================================================
    // ✅ MOSTRAR BOTÓN
    // =================================================

    function mostrarBotonIniciar() {

        textoCarga.textContent =
            "¡Todo listo!";

        barraCarga.style.width =
            "100%";

        botonIniciar.style.display =
            "block";
    }


    // =================================================
    // 👆 ESPERAR PRIMER TOQUE
    // =================================================

    function esperarInicio() {

        return new promise ((resolver) => {

            let iniciado = false;

            function iniciarJuego(evento) {

                if (iniciado) return;

                iniciado = true;

                if (evento) {
                    evento.preventDefault();
                }

                console.log(
                    "👆 Jugador inició GAMERPRO GAME"
                );

                // Intentar activar el audio
                try {

                    const AudioContext =
                        window.AudioContext ||
                        window.webkitAudioContext;

                    if (AudioContext) {

                        const contexto =
                            new AudioContext();

                        if (
                            contexto.state ===
                            "suspended"
                        ) {
                            contexto.resume();
                        }

                        window.gamerproAudioContext =
                            contexto;

                        console.log(
                            "🔊 Audio activado"
                        );
                    }

                } catch (error) {

                    console.warn(
                        "⚠️ Audio no pudo activarse:",
                        error
                    );
                }


                // =================================================
                // 🌑 DESAPARECER PANTALLA
                // =================================================

                pantalla.style.transition =
                    "opacity 0.5s ease";

                pantalla.style.opacity =
                    "0";


                setTimeout(() => {

                    pantalla.remove();

                    resolver();

                }, 500);
            }


            botonIniciar.addEventListener(
                "pointerdown",
                iniciarJuego,
                {
                    passive: false,
                    once: true
                }
            );

        });
    }


    // =================================================
    // 📦 DEVOLVER FUNCIONES A game.js
    // =================================================

    return {

        actualizarCarga,

        mostrarBotonIniciar,

        esperarInicio

    };
}
