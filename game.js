// =====================================================
// 🎮 GAMERPRO GAME — GAME.JS
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
// 🎮 GAME
// =====================================================

const game =
    document.getElementById("game");


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

    // 🐔 POLLOS

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

    console.log(
        "🔥 BOTÓN FUNCIONÓ"
    );


    const mensaje =
        document.createElement("div");


    Object.assign(
        mensaje.style,
        {
            position: "fixed",
            inset: "0",
            background: "#111",
            color: "#00ff66",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Arial",
            fontSize: "32px",
            fontWeight: "bold",
            zIndex: "50000",
            textAlign: "center",
            whiteSpace: "pre-line"
        }
    );


    mensaje.textContent =
        "🔥 BOTÓN FUNCIONÓ\n\n" +
        "🎬 INICIANDO ESCENA 1";


    game.appendChild(
        mensaje
    );


    setTimeout(
        function() {

            mensaje.remove();


            try {

                iniciarEscena1(

                    game,

                    imagenes,

                    function() {

                        iniciarEscena2(
                            game,
                            imagenes
                        );

                    }

                );

            } catch (error) {

                console.error(
                    "❌ ERROR ESCENA 1:",
                    error
                );


                const errorPantalla =
                    document.createElement("div");


                Object.assign(
                    errorPantalla.style,
                    {
                        position: "fixed",
                        inset: "0",
                        background: "#200",
                        color: "#ff5555",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "30px",
                        boxSizing: "border-box",
                        fontFamily: "monospace",
                        fontSize: "18px",
                        textAlign: "center",
                        zIndex: "50000",
                        whiteSpace: "pre-line"
                    }
                );


                errorPantalla.textContent =
                    "🔴 ERROR ESCENA 1\n\n" +
                    error.message;


                game.appendChild(
                    errorPantalla
                );

            }

        },

        1000
    );
}


// =====================================================
// 📺 PANTALLA DE CARGA
// =====================================================

const pantallaCarga =
    iniciarPantallaCarga(
        game,
        iniciarJuego
    );


// =====================================================
// 📥 CARGAR RECURSOS
// =====================================================

precargarImagenes(

    recursos,

    function(
        cargadas,
        total,
        nombre,
        correcta
    ) {

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
    function(resultado) {

        imagenes =
            resultado;


        console.log(
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
    function(error) {

        console.error(
            "❌ ERROR DE CARGA:",
            error
        );

    }
);
