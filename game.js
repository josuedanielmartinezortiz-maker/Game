// =====================================================
// 🎮 GAMERPRO GAME — GAME.JS
// 🧪 DIAGNÓSTICO DE INICIO
// =====================================================

import { precargarImagenes }
    from "./sistemas/precarga.js";

import { iniciarPantallaCarga }
    from "./sistemas/pantallaCarga.js";

import { iniciarEscena1 }
    from "./escenas/escena1.js";

import { iniciarEscena2 }
    from "./escenas/escena2.js";


// =====================================================
// 🎮 CONTENEDOR
// =====================================================

const game =
    document.getElementById("game");


// =====================================================
// 🧪 PANEL DE DIAGNÓSTICO
// =====================================================

const diagnostico =
    document.createElement("div");

Object.assign(
    diagnostico.style,
    {
        position: "fixed",

        top: "10px",
        left: "10px",

        width: "calc(100vw - 20px)",

        padding: "15px",

        boxSizing: "border-box",

        background:
            "rgba(0,0,0,0.95)",

        color:
            "#00ff66",

        fontFamily:
            "monospace",

        fontSize: "17px",

        lineHeight: "1.5",

        border:
            "3px solid #00ff66",

        borderRadius:
            "12px",

        zIndex:
            "99999",

        whiteSpace:
            "pre-wrap",

        pointerEvents:
            "none"
    }
);

diagnostico.textContent =
    "🧪 GAMERPRO DIAGNÓSTICO\nPreparando...";

document.body.appendChild(
    diagnostico
);


// =====================================================
// 🧪 FUNCIÓN DIAGNÓSTICO
// =====================================================

function diagnosticar(
    mensaje
) {

    diagnostico.textContent +=
        `\n${mensaje}`;
}


// =====================================================
// 📦 RECURSOS
// =====================================================

const recursos = {

    escena1:
        "./assets/escena1.png",

    escena2:
        "./assets/escena2.png",

    mike:
        "./assets/mike.png",

    micaela:
        "./assets/micaela.png",

    mikeespalda:
        "./assets/mikeespalda.png",

    micaelaespalda:
        "./assets/micaelaespalda.png",

    pollonoob:
        "./assets/pollonoob.png",

    noob:
        "./assets/noob.png",

    pollozombie:
        "./assets/pollozombie.png",

    pollitonoob:
        "./assets/pollitonoob.png"
};


// =====================================================
// 🖼️ IMÁGENES
// =====================================================

let imagenes = null;


// =====================================================
// 🎬 INICIAR JUEGO
// =====================================================

function iniciarJuego() {

    diagnosticar(
        "🔥 BOTÓN PRESIONADO"
    );


    diagnosticar(
        "🚀 INICIANDO JUEGO..."
    );


    // ================================================
    // 🔍 COMPROBAR IMÁGENES
    // ================================================

    if (!imagenes) {

        diagnosticar(
            "🔴 ERROR: IMÁGENES = NULL"
        );

        return;
    }


    diagnosticar(
        "🖼️ IMÁGENES DISPONIBLES"
    );


    // ================================================
    // 🔍 COMPROBAR ESCENA 1
    // ================================================

    if (!imagenes.escena1) {

        diagnosticar(
            "🔴 ERROR: escena1.png NO EXISTE"
        );

        return;
    }


    diagnosticar(
        "✅ escena1.png ENCONTRADA"
    );


    // ================================================
    // 🎬 LLAMAR ESCENA 1
    // ================================================

    diagnosticar(
        "🎬 LLAMANDO iniciarEscena1()..."
    );


    try {

        iniciarEscena1(

            game,

            imagenes,

            () => {

                diagnosticar(
                    "✅ ESCENA 1 TERMINÓ"
                );


                diagnosticar(
                    "🎬 LLAMANDO ESCENA 2..."
                );


                try {

                    iniciarEscena2(
                        game,
                        imagenes
                    );


                    diagnosticar(
                        "✅ ESCENA 2 INICIADA"
                    );

                } catch (error) {

                    diagnosticar(
                        "🔴 ERROR ESCENA 2:\n" +
                        error.message
                    );

                }

            }
        );


        diagnosticar(
            "✅ iniciarEscena1() EJECUTADO"
        );

    } catch (error) {

        diagnosticar(
            "🔴 ERROR ESCENA 1:\n" +
            error.message
        );

    }
}


// =====================================================
// 📺 PANTALLA DE CARGA
// =====================================================

diagnosticar(
    "📺 CREANDO PANTALLA DE CARGA..."
);


const pantallaCarga =
    iniciarPantallaCarga(

        game,

        iniciarJuego
    );


diagnosticar(
    "✅ PANTALLA DE CARGA CREADA"
);


// =====================================================
// 📥 PRECARGAR
// =====================================================

diagnosticar(
    "📦 CARGANDO RECURSOS..."
);


precargarImagenes(

    recursos,

    (
        cargadas,
        total,
        nombre,
        correcta
    ) => {

        pantallaCarga.actualizarCarga(

            cargadas,

            total,

            nombre,

            correcta
        );

    }

)


// =====================================================
// ✅ TODO CARGADO
// =====================================================

.then(
    (resultado) => {

        imagenes =
            resultado;


        diagnosticar(
            "✅ TODOS LOS RECURSOS CARGADOS"
        );


        pantallaCarga
            .marcarCargaCompleta();

    }
)


// =====================================================
// ❌ ERROR
// =====================================================

.catch(
    (error) => {

        diagnosticar(
            "🚨 ERROR DE CARGA:\n" +
            error.message
        );

    }
);
