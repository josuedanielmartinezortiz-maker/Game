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
        height: "100vh",
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

        <div style="
            font-size: 38px;
            font-weight: bold;
            margin-bottom: 30px;
        ">
            GAMERPRO GAME
        </div>

        <div
            id="textoCarga"
            style="
                font-size: 21px;
                margin-bottom: 15px;
            "
        >
            ⏳ Cargando...
        </div>

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

        <div
            id="porcentajeCarga"
            style="
                margin-top: 12px;
                font-size: 18px;
            "
        >
            0%
        </div>

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

        <div
            id="errorCarga"
            style="
                display: none;
                margin-top: 20px;
                color: #ff4444;
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
            "
        >
            👆 TOCA PARA INICIAR
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


    // =================================================
    // 🔐 ESTADO
    // =================================================

    let cargaCompleta = false;
    let iniciado = false;


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
    // 👆 BOTÓN
    // =================================================

    function iniciar() {

        if (!cargaCompleta)
            return;

        if (iniciado)
            return;

        iniciado = true;

        boton.disabled = true;

        boton.textContent =
            "🚀 INICIANDO...";


        // =============================================
        // 🚀 INICIO DIRECTO
        // =============================================

        if (
            typeof alIniciar ===
            "function"
        ) {

            alIniciar();

        }


        // =============================================
        // 🖥️ QUITAR PANTALLA
        // =============================================

        pantalla.remove();
    }


    // =================================================
    // 👆 EVENTO
    // =================================================

    boton.addEventListener(
        "click",
        iniciar
    );


    // =================================================
    // 📤 DEVOLVER
    // =================================================

    return {

        actualizarCarga,

        marcarCargaCompleta

    };
        }
