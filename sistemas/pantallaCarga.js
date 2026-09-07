// =====================================================
// 🎮 GAMERPRO GAME — PANTALLA DE CARGA
// =====================================================

export function iniciarPantallaCarga(game) {

    return new Promise((resolver) => {

        const pantalla = document.createElement("div");

        pantalla.id = "pantallaCarga";

        pantalla.style.position = "fixed";
        pantalla.style.top = "0";
        pantalla.style.left = "0";
        pantalla.style.width = "100vw";
        pantalla.style.height = "100vh";
        pantalla.style.background = "#000";
        pantalla.style.display = "flex";
        pantalla.style.flexDirection = "column";
        pantalla.style.justifyContent = "center";
        pantalla.style.alignItems = "center";
        pantalla.style.zIndex = "10000";
        pantalla.style.color = "white";
        pantalla.style.fontFamily = "Arial, sans-serif";

        pantalla.innerHTML = `
            <div style="
                font-size: 42px;
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
                width: 70%;
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

            <button id="botonIniciar" style="
                margin-top: 35px;
                padding: 15px 35px;
                font-size: 20px;
                font-weight: bold;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                display: none;
            ">
                👆 TOCA PARA INICIAR
            </button>
        `;

        document.body.appendChild(pantalla);

        const textoCarga =
            pantalla.querySelector("#textoCarga");

        const barraCarga =
            pantalla.querySelector("#barraCarga");

        const botonIniciar =
            pantalla.querySelector("#botonIniciar");


        // =================================================
        // 📊 ACTUALIZAR PROGRESO
        // =================================================

        function actualizarCarga(cargadas, total) {

            const porcentaje =
                Math.round((cargadas / total) * 100);

            textoCarga.textContent =
                `Cargando... ${porcentaje}%`;

            barraCarga.style.width =
                `${porcentaje}%`;
        }


        // =================================================
        // 🔊 ACTIVAR AUDIO
        // =================================================

        botonIniciar.addEventListener("click", async () => {

            try {

                // Creamos un audio silencioso.
                // El navegador recibe la interacción
                // directamente desde el jugador.

                const audio = new Audio();

                audio.src =
                    "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAA";

                audio.volume = 0;

                await audio.play();

                audio.pause();

                console.log("🔊 AUDIO ACTIVADO");

            } catch (error) {

                console.warn(
                    "⚠️ No se pudo activar el audio:",
                    error
                );

            }

            pantalla.style.transition =
                "opacity 0.5s ease";

            pantalla.style.opacity = "0";

            setTimeout(() => {

                pantalla.remove();

                resolver();

            }, 500);

        });


        // =================================================
        // ⏳ MOSTRAR BOTÓN CUANDO TERMINE LA CARGA
        // =================================================

        pantalla.actualizarCarga = actualizarCarga;

        pantalla.mostrarBoton = () => {

            textoCarga.textContent =
                "¡Todo listo!";

            barraCarga.style.width = "100%";

            botonIniciar.style.display = "block";

        };

    });

                       }
