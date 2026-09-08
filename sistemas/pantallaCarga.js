// =====================================================
// 🎮 GAMERPRO GAME — PANTALLA DE CARGA
// =====================================================

export function iniciarPantallaCarga(game) {

    return new Promise((resolver) => {

        const pantalla =
            document.createElement("div");

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
            touchAction: "manipulation"
        });

        pantalla.innerHTML = `
            <div style="
                font-size: 38px;
                font-weight: bold;
                margin-bottom: 30px;
            ">
                GAMERPRO GAME
            </div>

            <div style="
                font-size: 20px;
                margin-bottom: 15px;
            ">
                Todo listo...
            </div>

            <button
                id="botonIniciar"
                type="button"
                style="
                    padding: 16px 30px;
                    font-size: 20px;
                    font-weight: bold;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    touch-action: manipulation;
                "
            >
                👆 TOCA PARA INICIAR
            </button>
        `;

        game.appendChild(pantalla);

        const boton =
            pantalla.querySelector("#botonIniciar");


        // =================================================
        // 👆 PRIMER TOQUE
        // =================================================

        async function iniciar() {

            if (boton.dataset.iniciado === "true") {
                return;
            }

            boton.dataset.iniciado = "true";

            console.log(
                "👆 GAMERPRO GAME iniciado"
            );


            // =================================================
            // 🔊 ACTIVAR AUDIO DURANTE EL TOQUE
            // =================================================

            try {

                const AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext;

                if (AudioContext) {

                    // Crear UN SOLO contexto para todo el juego
                    const audioContext =
                        new AudioContext();

                    window.gamerproAudioContext =
                        audioContext;


                    // -----------------------------------------
                    // 🔓 DESBLOQUEAR AUDIO
                    // -----------------------------------------

                    if (
                        audioContext.state ===
                        "suspended"
                    ) {

                        await audioContext.resume();

                    }


                    console.log(
                        "🔊 AudioContext:",
                        audioContext.state
                    );


                    // -----------------------------------------
                    // 🔇 PEQUEÑO BUFFER SILENCIOSO
                    // -----------------------------------------

                    const buffer =
                        audioContext.createBuffer(
                            1,
                            1,
                            audioContext.sampleRate
                        );

                    const fuente =
                        audioContext.createBufferSource();

                    fuente.buffer = buffer;

                    fuente.connect(
                        audioContext.destination
                    );

                    fuente.start(0);


                    console.log(
                        "🔓 AUDIO DESBLOQUEADO"
                    );
                }

            } catch (error) {

                console.warn(
                    "⚠️ No se pudo desbloquear el audio:",
                    error
                );
            }


            // =================================================
            // 🌑 QUITAR PANTALLA
            // =================================================

            pantalla.style.transition =
                "opacity 0.5s ease";

            pantalla.style.opacity = "0";


            setTimeout(() => {

                pantalla.remove();

                resolver();

            }, 500);
        }


        boton.addEventListener(
            "pointerdown",
            iniciar,
            {
                once: true
            }
        );

    });
            }
