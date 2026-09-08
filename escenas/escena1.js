// =====================================================
// 🌲 GAMERPRO GAME — ESCENA 1
// =====================================================

import { hablarSuave }
    from "../mecanicas/voces.js";

import { moverPersonajes }
    from "../mecanicas/movimiento.js";


export function iniciarEscena1(
    game,
    imagenes,
    alTerminar
) {

    // =================================================
    // 🧪 PRUEBA DE INICIO
    // =================================================

    game.innerHTML = "";

    const prueba =
        document.createElement("div");

    Object.assign(
        prueba.style,
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

            flexDirection:
                "column",

            fontFamily:
                "Arial",

            fontSize:
                "30px",

            fontWeight:
                "bold",

            textAlign:
                "center",

            zIndex:
                "50000"
        }
    );

    prueba.innerHTML = `
        <div>🎬 ESCENA 1 INICIADA</div>
        <div style="
            font-size:18px;
            margin-top:15px;
        ">
            GAMERPRO GAME
        </div>
    `;

    game.appendChild(
        prueba
    );


    // =================================================
    // ⏱️ DEJAR PRUEBA UN MOMENTO
    // =================================================

    setTimeout(
        () => {

            prueba.remove();

            iniciarEscenaReal();

        },
        1500
    );


    // =================================================
    // 🎬 ESCENA REAL
    // =================================================

    function iniciarEscenaReal() {

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.id =
            "escenaCanvas";

        Object.assign(
            canvas.style,
            {
                position: "fixed",

                inset: "0",

                width: "100vw",

                height: "100vh",

                display: "block",

                zIndex: "1"
            }
        );

        game.appendChild(
            canvas
        );


        const ctx =
            canvas.getContext("2d");


        // =================================================
        // 📍 POSICIONES
        // =================================================

        const MIKE = {

            x: 0.44,

            y: 0.82,

            escala: 1.0

        };


        const MICAELA = {

            x: 0.56,

            y: 0.82,

            escala: 1.0

        };


        // =================================================
        // 📐 TAMAÑO
        // =================================================

        const TAMANO_BASE =
            180;


        // =================================================
        // 🔄 IMÁGENES
        // =================================================

        let imagenMike =
            imagenes.mike;

        let imagenMicaela =
            imagenes.micaela;


        // =================================================
        // 💬 DIÁLOGOS
        // =================================================

        const DIALOGOS = [

            {
                personaje:
                    "MICAELA",

                texto:
                    "¿Qué hacemos aquí, Mike?"
            },

            {
                personaje:
                    "MIKE",

                texto:
                    "No sé."
            },

            {
                personaje:
                    "MICAELA",

                texto:
                    "¿Qué es eso, Mike?"
            },

            {
                personaje:
                    "MIKE",

                texto:
                    "No sé, deberíamos averiguarlo."
            }

        ];


        let dialogoActual =
            0;


        // =================================================
        // 🧑 DIBUJAR PERSONAJE
        // =================================================

        function dibujarPersonaje(
            imagen,
            posicion
        ) {

            if (!imagen)
                return;


            const x =
                posicion.x *
                canvas.width;


            const y =
                posicion.y *
                canvas.height;


            const alto =
                TAMANO_BASE *
                posicion.escala;


            const proporcion =
                imagen.naturalWidth /
                imagen.naturalHeight;


            const ancho =
                alto *
                proporcion;


            ctx.drawImage(

                imagen,

                x - ancho / 2,

                y - alto / 2,

                ancho,

                alto
            );
        }


        // =================================================
        // 🎨 DIBUJAR ESCENA
        // =================================================

        function dibujarEscena() {

            ctx.clearRect(

                0,

                0,

                canvas.width,

                canvas.height
            );


            ctx.drawImage(

                imagenes.escena1,

                0,

                0,

                canvas.width,

                canvas.height
            );


            dibujarPersonaje(

                imagenMike,

                MIKE
            );


            dibujarPersonaje(

                imagenMicaela,

                MICAELA
            );
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
        // 💬 DIÁLOGOS
        // =================================================

        function siguienteDialogo() {

            if (
                dialogoActual >=
                DIALOGOS.length
            ) {

                iniciarCaminata();

                return;
            }


            const dialogo =
                DIALOGOS[
                    dialogoActual
                ];


            if (
                dialogo.personaje ===
                "MICAELA"
            ) {

                hablarSuave(

                    dialogo.texto,

                    true
                );

            } else {

                hablarSuave(

                    dialogo.texto,

                    false
                );
            }


            dialogoActual++;


            setTimeout(

                siguienteDialogo,

                2500
            );
        }


        // =================================================
        // 🚶 CAMINATA
        // =================================================

        function iniciarCaminata() {

            moverPersonajes(

                [MIKE, MICAELA],

                [
                    {
                        x: 0.49,
                        y: 0.70,
                        escala: 0.65
                    },

                    {
                        x: 0.51,
                        y: 0.70,
                        escala: 0.65
                    }
                ],

                10000
            );


            setTimeout(() => {

                imagenMike =
                    imagenes.mikeespalda;

                imagenMicaela =
                    imagenes.micaelaespalda;

            }, 2500);


            setTimeout(() => {

                const fundido =
                    document.createElement(
                        "div"
                    );


                Object.assign(

                    fundido.style,

                    {
                        position: "fixed",

                        inset: "0",

                        background:
                            "#000",

                        opacity: "0",

                        transition:
                            "opacity 1s ease",

                        zIndex:
                            "9999",

                        pointerEvents:
                            "none"
                    }
                );


                document.body.appendChild(
                    fundido
                );


                requestAnimationFrame(() => {

                    fundido.style.opacity =
                        "1";

                });


                setTimeout(() => {

                    game.innerHTML =
                        "";

                    alTerminar();


                    fundido.style.opacity =
                        "0";


                    setTimeout(() => {

                        fundido.remove();

                    }, 1000);

                }, 1000);

            }, 10000);
        }


        // =================================================
        // 🔄 RENDER
        // =================================================

        function actualizar() {

            dibujarEscena();

            requestAnimationFrame(
                actualizar
            );
        }


        actualizar();


        // =================================================
        // ▶️ COMENZAR DIÁLOGO
        // =================================================

        setTimeout(

            siguienteDialogo,

            2000
        );
    }
            }
