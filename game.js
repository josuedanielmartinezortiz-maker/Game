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

import { iniciarEscena3 }
    from "./escenas/escena3.js";

import { iniciarSeleccionPersonaje }
    from "./escenas/seleccionPersonaje.js";

import { iniciarGallinero }
    from "./mecanicas/gallinero.js";


// =====================================================
// 🎮 CONTENEDOR PRINCIPAL
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

    gallinero:
        "./assets/gallinero.png",

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

    pollozombie:
        "./assets/pollozombie.png",

    pollitonoob:
        "./assets/pollitonoob.png",

    noob:
        "./assets/noob.png"
};


// =====================================================
// 🖼️ IMÁGENES CARGADAS
// =====================================================

let imagenes = null;


// =====================================================
// 🚀 INICIAR JUEGO
// =====================================================

function iniciarJuego() {

    console.log(
        "🔥 BOTÓN FUNCIONÓ"
    );


    // =================================================
    // 🔥 MENSAJE DE INICIO
    // =================================================

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

            justifyContent:
                "center",

            alignItems:
                "center",

            fontFamily:
                "Arial",

            fontSize:
                "32px",

            fontWeight:
                "bold",

            zIndex:
                "50000",

            textAlign:
                "center",

            whiteSpace:
                "pre-line"
        }
    );


    mensaje.textContent =
        "🔥 BOTÓN FUNCIONÓ\n\n🎬 INICIANDO ESCENA 1";


    game.appendChild(
        mensaje
    );


    // =================================================
    // ⏱️ INICIAR ESCENA 1
    // =================================================

    setTimeout(
        function() {

            mensaje.remove();


            try {

                // =====================================
                // 🎬 ESCENA 1
                // =====================================

                iniciarEscena1(
                    game,
                    imagenes,
                    function() {

                        console.log(
                            "➡️ PASANDO A ESCENA 2"
                        );


                        // =============================
                        // 🌾 ESCENA 2
                        // =============================

                        iniciarEscena2(
                            game,
                            imagenes,
                            function() {

                                console.log(
                                    "➡️ PASANDO A ESCENA 3"
                                );


                                // =============================
                                // 🥚 ESCENA 3
                                // =============================

                                iniciarEscena3(
                                    game,
                                    imagenes,
                                    function(ganador) {

                                        console.log(
                                            "🐔 POLLO GANADOR:",
                                            ganador.nombre
                                        );


                                        // =========================
                                        // 🐔 GUARDAR POLLO
                                        // =========================

                                        window.gamerproPolloObtenido =
                                            ganador.nombre;


                                        console.log(
                                            "👤 ABRIENDO SELECCIÓN DE PERSONAJE..."
                                        );


                                        // =========================
                                        // 👤 SELECCIÓN PERSONAJE
                                        // =========================

                                        iniciarSeleccionPersonaje(
                                            game,
                                            imagenes,
                                            function(
                                                personaje,
                                                nombre
                                            ) {

                                                console.log(
                                                    "👤 PERSONAJE ELEGIDO:",
                                                    nombre
                                                );


                                                // =================
                                                // 👤 GUARDAR
                                                // =================

                                                window.gamerproPersonaje =
                                                    personaje;

                                                window.gamerproPersonajeNombre =
                                                    nombre;


                                                console.log(
                                                    "🐔 ABRIENDO GALLINERO..."
                                                );


                                                // =================
                                                // 🐔 GALLINERO
                                                // =================

                                                iniciarGallinero(
                                                    game,
                                                    imagenes,
                                                    ganador.nombre
                                                );

                                            }
                                        );

                                    }
                                );

                            }
                        );

                    }
                );

            } catch (error) {

                // =====================================
                // 🔴 ERROR
                // =====================================

                console.error(
                    "❌ ERROR DEL JUEGO:",
                    error
                );


                const errorPantalla =
                    document.createElement("div");


                Object.assign(
                    errorPantalla.style,
                    {

                        position:
                            "fixed",

                        inset:
                            "0",

                        background:
                            "#200",

                        color:
                            "#ff5555",

                        display:
                            "flex",

                        justifyContent:
                            "center",

                        alignItems:
                            "center",

                        padding:
                            "30px",

                        boxSizing:
                            "border-box",

                        fontFamily:
                            "monospace",

                        fontSize:
                            "18px",

                        textAlign:
                            "center",

                        zIndex:
                            "50000",

                        whiteSpace:
                            "pre-line"
                    }
                );


                errorPantalla.textContent =
                    "🔴 ERROR DEL JUEGO\n\n" +
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
// ⏳ PANTALLA DE CARGA
// =====================================================

const pantallaCarga =
    iniciarPantallaCarga(
        game,
        iniciarJuego
    );


// =====================================================
// 📦 PRECARGAR RECURSOS
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

.then(
    function(resultado) {

        imagenes =
            resultado;


        console.log(
            "✅ TODOS LOS RECURSOS CARGADOS"
        );


        console.log(
            "🐔 imagenes.gallinero =",
            imagenes.gallinero
        );


        console.log(
            "🐔 pollonoob =",
            imagenes.pollonoob
        );


        console.log(
            "🧟 pollozombie =",
            imagenes.pollozombie
        );


        console.log(
            "🐤 pollitonoob =",
            imagenes.pollitonoob
        );


        console.log(
            "📦 RECURSOS CARGADOS:",
            Object.keys(imagenes)
        );


        // ==============================
        // ✅ MARCAR CARGA COMPLETA
        // ==============================

        pantallaCarga.marcarCargaCompleta();

    }
)

.catch(
    function(error) {

        console.error(
            "❌ ERROR DE CARGA:",
            error
        );

    }
);
