// =====================================================
// 🎮 GAMERPRO GAME — PANTALLA DE CARGA
// =====================================================

export function iniciarPantallaCarga(game) {

    // =================================================
    // 🖥️ CREAR PANTALLA
    // =================================================

    const pantalla =
        document.createElement("div");

    pantalla.id =
        "pantallaCarga";

    Object.assign(
        pantalla.style,
        {
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

            fontFamily:
                "Arial, sans-serif",

            textAlign: "center",

            boxSizing: "border-box",

            touchAction:
                "manipulation"
        }
    );


    // =================================================
    // 🧱 CONTENIDO
    // =================================================

    pantalla.innerHTML = `

        <div style="
            font-size: 38px;
            font-weight: bold;
            margin-bottom: 35px;
        ">
            GAMERPRO GAME
        </div>


        <div
            id="textoCarga"
            style="
                font-size: 21px;
                margin-bottom: 18px;
            "
        >
            ⏳ Cargando...
        </div>


        <div style="
            width: min(80%, 500px);
            height: 22px;

            background: #222;

            border: 2px solid #555;

            border-radius: 20px;

            overflow: hidden;

            margin-bottom: 15px;
        ">

            <div
                id="barraCarga"
                style="
                    width: 0%;
                    height: 100%;

                    background: #fff;

                    transition:
                        width 0.2s ease;
                "
            ></div>

        </div>


        <div
            id="porcentajeCarga"
            style="
                font-size: 18px;
                margin-bottom: 10px;
            "
        >
            0%
        </div>


        <div
            id="recursoCarga"
            style="
                font-size: 15px;
                color: #aaa;

                min-height: 22px;

                max-width: 80%;

                overflow-wrap: break-word;
            "
        >
            Preparando recursos...
        </div>


        <div
            id="errorCarga"
            style="
                display: none;

                margin-top: 25px;

                padding: 15px;

                max-width: 80%;

                background: #250000;

                border: 2px solid #ff3333;

                border-radius: 10px;

                color: #ff6666;

                font-size: 16px;
            "
        ></div>


        <button
            id="botonIniciar"

            type="button"

            disabled

            style="
                display: none;

                margin-top: 30px;

                padding: 16px 30px;

                font-size: 20px;

                font-weight: bold;

                border: none;

                border-radius: 12px;

                cursor: pointer;

                touch-action:
                    manipulation;

                user-select: none;
            "
        >
            👆 TOCA PARA INICIAR
        </button>
    `;


    game.appendChild(
        pantalla
    );


    // =================================================
    // 🔎 ELEMENTOS
    // =================================================

    const textoCarga =
        pantalla.querySelector(
            "#textoCarga"
        );

    const barraCarga =
        pantalla.querySelector(
            "#barraCarga"
        );

    const porcentajeCarga =
        pantalla.querySelector(
            "#porcentajeCarga"
        );

    const recursoCarga =
        pantalla.querySelector(
            "#recursoCarga"
        );

    const errorCarga =
        pantalla.querySelector(
            "#errorCarga"
        );

    const boton =
        pantalla.querySelector(
            "#botonIniciar"
        );


    // =================================================
    // 🔐 ESTADO
    // =================================================

    let cargaCompleta =
        false;

    let iniciado =
        false;


    // =================================================
    // 🤝 PROMESA DE INICIO
    // =================================================

    let resolverInicio;

    const promesaInicio =
        new Promise(
            (resolver) => {

                resolverInicio =
                    resolver;

            }
        );


    // =================================================
    // 📊 ACTUALIZAR CARGA
    // =================================================

    function actualizarCarga(
        cargadas,
        total,
        nombre,
        correcta
    ) {

        const porcentaje =
            total > 0
                ? Math.round(
                    (cargadas / total) *
                    100
                )
                : 0;


        barraCarga.style.width =
            `${porcentaje}%`;

        porcentajeCarga.textContent =
            `${porcentaje}%`;


        // =============================================
        // ❌ ERROR
        // =============================================

        if (!correcta) {

            cargaCompleta =
                false;

            textoCarga.textContent =
                "❌ ERROR AL CARGAR";

            recursoCarga.textContent =
                `❌ ${nombre}`;

            errorCarga.style.display =
                "block";

            errorCarga.textContent =
                `No se pudo cargar el recurso: ${nombre}`;

            boton.style.display =
                "none";

            boton.disabled =
                true;

            return;
        }


        // =============================================
        // ⏳ CARGANDO
        // =============================================

        textoCarga.textContent =
            "⏳ Cargando...";

        recursoCarga.textContent =
            `✅ ${nombre}`;
    }


    // =================================================
    // ✅ TODO CARGADO
    // =================================================

    function marcarCargaCompleta() {

        cargaCompleta =
            true;

        textoCarga.textContent =
            "✅ ¡Todo listo!";

        barraCarga.style.width =
            "100%";

        porcentajeCarga.textContent =
            "100%";

        recursoCarga.textContent =
            "🎮 Todos los recursos cargados";

        errorCarga.style.display =
            "none";

        boton.style.display =
            "block";

        boton.disabled =
            false;
    }


    // =================================================
    // 🔊 DESBLOQUEAR AUDIO
    // =================================================

    async function desbloquearAudio() {

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            if (!AudioContext) {

                return;

            }


            let audioContext =
                window.gamerproAudioContext;


            if (!audioContext) {

                audioContext =
                    new AudioContext();

                window.gamerproAudioContext =
                    audioContext;

            }


            if (
                audioContext.state ===
                "suspended"
            ) {

                await audioContext.resume();

            }


            // Pequeño sonido silencioso
            // para desbloquear audio móvil

            const buffer =
                audioContext.createBuffer(
                    1,
                    1,
                    audioContext.sampleRate
                );


            const fuente =
                audioContext.createBufferSource();

            fuente.buffer =
                buffer;

            fuente.connect(
                audioContext.destination
            );

            fuente.start(0);


        } catch (error) {

            console.warn(
                "⚠️ No se pudo desbloquear el audio:",
                error
            );

        }
    }


    // =================================================
    // 👆 INICIAR JUEGO
    // =================================================

    async function iniciar() {

        // No permitir iniciar
        // si algo falló

        if (!cargaCompleta) {

            return;

        }


        // Evitar doble toque

        if (iniciado) {

            return;

        }


        iniciado =
            true;


        boton.disabled =
            true;


        boton.textContent =
            "🚀 INICIANDO...";


        // =============================================
        // 🔊 AUDIO
        // =============================================

        await desbloquearAudio();


        // =============================================
        // 🎬 OCULTAR PANTALLA
        // =============================================

        pantalla.style.transition =
            "opacity 0.5s ease";

        pantalla.style.opacity =
            "0";


        setTimeout(
            () => {

                pantalla.remove();

                // =====================================
                // 🔥 ESTA ES LA PARTE IMPORTANTE
                // =====================================

                resolverInicio();

            },
            500
        );
    }


    // =================================================
    // 👆 EVENTOS DEL BOTÓN
    // =================================================

    boton.addEventListener(
        "pointerdown",
        iniciar
    );


    boton.addEventListener(
        "click",
        iniciar
    );


    // =================================================
    // 📤 DEVOLVER SISTEMA
    // =================================================

    return {

        promesaInicio,

        actualizarCarga,

        marcarCargaCompleta

    };
        }
