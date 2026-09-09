// =====================================================
// 🎮 GAMERPRO GAME — PANTALLA DE CARGA
// =====================================================

export function iniciarPantallaCarga(game, alIniciar) {

    const pantalla = document.createElement("div");

    pantalla.id = "pantallaCarga";

    Object.assign(pantalla.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100dvh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "10000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
    });

    pantalla.innerHTML = `

        <!-- =========================================
             🎮 TÍTULO
             ========================================= -->

        <div style="
            font-size: 38px;
            font-weight: bold;
            margin-bottom: 30px;
        ">
            GAMERPRO GAME
        </div>


        <!-- =========================================
             ⏳ TEXTO DE CARGA
             ========================================= -->

        <div
            id="textoCarga"
            style="
                font-size: 21px;
                margin-bottom: 15px;
            "
        >
            ⏳ Cargando...
        </div>


        <!-- =========================================
             📊 BARRA DE CARGA
             ========================================= -->

        <div style="
            width: 80%;
            max-width: 500px;
            height: 22px;
            background: #222;
            border: 2px solid #555;
            border-radius: 20px;
            overflow: hidden;
        ">

            <div
                id="barraCarga"
                style="
                    width: 0%;
                    height: 100%;
                    background: #fff;
                "
            ></div>

        </div>


        <!-- =========================================
             📈 PORCENTAJE
             ========================================= -->

        <div
            id="porcentajeCarga"
            style="
                margin-top: 12px;
                font-size: 18px;
            "
        >
            0%
        </div>


        <!-- =========================================
             📦 RECURSO ACTUAL
             ========================================= -->

        <div
            id="recursoCarga"
            style="
                margin-top: 8px;
                font-size: 14px;
                color: #aaa;
            "
        >
            Preparando...
        </div>


        <!-- =========================================
             ❌ ERROR
             ========================================= -->

        <div
            id="errorCarga"
            style="
                display: none;
                margin-top: 20px;
                color: #ff4444;
            "
        ></div>


        <!-- =========================================
             👆 BOTÓN INICIAR
             ========================================= -->

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
            "
        >
            👆 TOCA PARA INICIAR
        </button>


        <!-- =========================================
             📱 RECOMENDACIÓN HORIZONTAL
             ========================================= -->

        <div
            id="recomendacionHorizontal"
            style="
                margin-top: 18px;
                padding: 10px 16px;

                max-width: 90%;

                font-size: 14px;
                line-height: 1.4;

                color: #aaa;

                text-align: center;
            "
        >
            📱 Recomendación: juega en horizontal
            para una mejor experiencia.
        </div>


        <!-- =========================================
             🔒 CANDADO
             ========================================= -->

        <button
            id="botonBloqueoPantalla"
            type="button"
            aria-label="Bloquear pantalla"
            title="Bloquear pantalla"
            style="
                position: fixed;
                right: 14px;
                top: 14px;

                width: 42px;
                height: 42px;

                padding: 0;

                display: flex;
                align-items: center;
                justify-content: center;

                border: 2px solid #555;
                border-radius: 50%;

                background: #151515;
                color: #fff;

                font-size: 21px;

                cursor: pointer;

                z-index: 10001;
            "
        >
            🔓
        </button>

    `;

    game.appendChild(pantalla);


    // =================================================
    // 🔎 ELEMENTOS
    // =================================================

    const textoCarga =
        pantalla.querySelector("#textoCarga");

    const barraCarga =
        pantalla.querySelector("#barraCarga");

    const porcentajeCarga =
        pantalla.querySelector("#porcentajeCarga");

    const recursoCarga =
        pantalla.querySelector("#recursoCarga");

    const errorCarga =
        pantalla.querySelector("#errorCarga");

    const boton =
        pantalla.querySelector("#botonIniciar");

    const botonBloqueo =
        pantalla.querySelector(
            "#botonBloqueoPantalla"
        );


    // =================================================
    // 🔐 ESTADO
    // =================================================

    let cargaCompleta = false;
    let iniciado = false;

    let pantallaBloqueada = false;

    let configuracionPantalla = null;


    // =================================================
    // 📐 OBTENER CONFIGURACIÓN ACTUAL
    // =================================================

    function obtenerConfiguracionPantalla() {

        const ancho =
            window.visualViewport
                ? window.visualViewport.width
                : window.innerWidth;

        const alto =
            window.visualViewport
                ? window.visualViewport.height
                : window.innerHeight;

        return {

            ancho: Math.round(ancho),

            alto: Math.round(alto),

            orientacion:
                ancho >= alto
                    ? "horizontal"
                    : "vertical"
        };
    }


    // =================================================
    // 🔒 BLOQUEAR / DESBLOQUEAR
    // =================================================

    function alternarBloqueo() {

        if (!pantallaBloqueada) {

            configuracionPantalla =
                obtenerConfiguracionPantalla();

            pantallaBloqueada = true;

            botonBloqueo.textContent =
                "🔒";

            botonBloqueo.style.background =
                "#333";

            botonBloqueo.style.borderColor =
                "#fff";

            window.gamerproPantallaBloqueada =
                true;

            window.gamerproConfiguracionPantalla =
                configuracionPantalla;

            console.log(
                "🔒 PANTALLA BLOQUEADA:",
                configuracionPantalla
            );

        } else {

            pantallaBloqueada = false;

            configuracionPantalla = null;

            botonBloqueo.textContent =
                "🔓";

            botonBloqueo.style.background =
                "#151515";

            botonBloqueo.style.borderColor =
                "#555";

            window.gamerproPantallaBloqueada =
                false;

            window.gamerproConfiguracionPantalla =
                null;

            console.log(
                "🔓 PANTALLA DESBLOQUEADA"
            );
        }
    }


    // =================================================
    // 👆 EVENTO DEL CANDADO
    // =================================================

    botonBloqueo.addEventListener(
        "click",
        alternarBloqueo
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
                    cargadas / total * 100
                )
                : 0;

        barraCarga.style.width =
            porcentaje + "%";

        porcentajeCarga.textContent =
            porcentaje + "%";


        if (!correcta) {

            cargaCompleta = false;

            textoCarga.textContent =
                "❌ ERROR AL CARGAR";

            recursoCarga.textContent =
                "❌ " + nombre;

            errorCarga.style.display =
                "block";

            errorCarga.textContent =
                "No se pudo cargar: " +
                nombre;

            boton.style.display =
                "none";

            boton.disabled =
                true;

            return;
        }


        textoCarga.textContent =
            "⏳ Cargando...";

        recursoCarga.textContent =
            "✅ " + nombre;
    }


    // =================================================
    // ✅ TODO LISTO
    // =================================================

    function marcarCargaCompleta() {

        cargaCompleta = true;

        textoCarga.textContent =
            "✅ ¡Todo listo!";

        barraCarga.style.width =
            "100%";

        porcentajeCarga.textContent =
            "100%";

        recursoCarga.textContent =
            "🎮 Todos los recursos cargados";

        boton.style.display =
            "block";

        boton.disabled =
            false;
    }


    // =================================================
    // 👆 INICIAR
    // =================================================

    function iniciar() {

        if (!cargaCompleta)
            return;

        if (iniciado)
            return;

        iniciado = true;

        boton.disabled =
            true;

        boton.textContent =
            "🚀 INICIANDO...";


        if (
            typeof alIniciar ===
            "function"
        ) {

            alIniciar();

        }


        pantalla.remove();
    }


    // =================================================
    // 👆 EVENTO PLAY
    // =================================================

    boton.addEventListener(
        "click",
        iniciar
    );


    // =================================================
    // 📤 DEVOLVER FUNCIONES
    // =================================================

    return {

        actualizarCarga,

        marcarCargaCompleta

    };
                }
