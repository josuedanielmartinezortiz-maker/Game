// =====================================================
// 🎮 GAMERPRO GAME — SELECCIÓN DE PERSONAJE
// =====================================================

export function iniciarSeleccionPersonaje(
    game,
    imagenes,
    alSeleccionar
) {

    // =================================================
    // 🧹 LIMPIAR PANTALLA
    // =================================================

    game.innerHTML = "";


    // =================================================
    // 📱 PANTALLA
    // =================================================

    const pantalla =
        document.createElement("div");

    pantalla.id =
        "seleccionPersonaje";

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

        zIndex: "30000",

        color: "#fff",

        fontFamily:
            "Arial, sans-serif",

        textAlign: "center",

        overflow: "hidden"

    });


    // =================================================
    // 📝 TÍTULO
    // =================================================

    const titulo =
        document.createElement("div");

    titulo.textContent =
        "ELIGE TU PERSONAJE";

    Object.assign(titulo.style, {

        fontSize:
            "clamp(28px, 5vw, 48px)",

        fontWeight:
            "bold",

        marginBottom:
            "30px",

        textShadow:
            "0 4px 10px #000"

    });

    pantalla.appendChild(
        titulo
    );


    // =================================================
    // 👥 PERSONAJES
    // =================================================

    const personajes =
        document.createElement("div");

    Object.assign(personajes.style, {

        display: "flex",

        justifyContent:
            "center",

        alignItems:
            "center",

        gap:
            "clamp(20px, 6vw, 70px)",

        width: "100%",

        padding:
            "0 20px",

        boxSizing:
            "border-box"

    });

    pantalla.appendChild(
        personajes
    );


    // =================================================
    // 🔒 EVITAR DOBLE SELECCIÓN
    // =================================================

    let seleccionado = false;


    // =================================================
    // 🧍 CREAR TARJETA
    // =================================================

    function crearPersonaje(
        nombre,
        imagen,
        id
    ) {

        const tarjeta =
            document.createElement("div");

        Object.assign(tarjeta.style, {

            width:
                "min(35vw, 260px)",

            display:
                "flex",

            flexDirection:
                "column",

            alignItems:
                "center",

            justifyContent:
                "center",

            cursor:
                "pointer",

            userSelect:
                "none",

            transition:
                "transform 0.2s ease"

        });


        // =============================================
        // 🖼️ IMAGEN
        // =============================================

        const img =
            document.createElement("img");

        if (imagen) {

            img.src =
                imagen.src;

        }

        img.alt =
            nombre;

        Object.assign(img.style, {

            width:
                "100%",

            maxWidth:
                "220px",

            height:
                "clamp(180px, 35vh, 320px)",

            objectFit:
                "contain",

            display:
                "block"

        });

        tarjeta.appendChild(
            img
        );


        // =============================================
        // 📝 NOMBRE
        // =============================================

        const nombreTexto =
            document.createElement("div");

        nombreTexto.textContent =
            nombre;

        Object.assign(nombreTexto.style, {

            marginTop:
                "10px",

            fontSize:
                "clamp(20px, 4vw, 30px)",

            fontWeight:
                "bold"

        });

        tarjeta.appendChild(
            nombreTexto
        );


        // =============================================
        // 👆 BOTÓN
        // =============================================

        const boton =
            document.createElement("button");

        boton.type =
            "button";

        boton.textContent =
            "ELEGIR";

        Object.assign(boton.style, {

            marginTop:
                "12px",

            padding:
                "12px 24px",

            fontSize:
                "18px",

            fontWeight:
                "bold",

            border:
                "none",

            borderRadius:
                "10px",

            cursor:
                "pointer",

            background:
                "#fff",

            color:
                "#000"

        });

        tarjeta.appendChild(
            boton
        );


        // =============================================
        // ✨ EFECTO PC
        // =============================================

        tarjeta.addEventListener(
            "mouseenter",
            function() {

                if (seleccionado)
                    return;

                tarjeta.style.transform =
                    "scale(1.06)";

            }
        );

        tarjeta.addEventListener(
            "mouseleave",
            function() {

                if (seleccionado)
                    return;

                tarjeta.style.transform =
                    "scale(1)";

            }
        );


        // =============================================
        // 🎮 SELECCIONAR
        // =============================================

        function seleccionar() {

            if (seleccionado)
                return;

            seleccionado = true;


            console.log(
                "👤 PERSONAJE SELECCIONADO:",
                nombre
            );


            // =========================================
            // 💾 GUARDAR PERSONAJE
            // =========================================

            window.gamerproPersonaje =
                id;

            window.gamerproPersonajeNombre =
                nombre;


            // =========================================
            // 🎨 CAMBIAR BOTÓN
            // =========================================

            boton.textContent =
                "✅ SELECCIONADO";

            boton.disabled =
                true;

            tarjeta.style.transform =
                "scale(1.08)";


            // =========================================
            // 🔒 DESACTIVAR LOS OTROS BOTONES
            // =========================================

            const botones =
                personajes.querySelectorAll(
                    "button"
                );

            botones.forEach(
                function(otroBoton) {

                    if (
                        otroBoton !==
                        boton
                    ) {

                        otroBoton.disabled =
                            true;

                    }

                }
            );


            // =========================================
            // ⏱️ PASAR AL SIGUIENTE
            // =========================================

            setTimeout(
                function() {

                    console.log(
                        "➡️ PASANDO AL GALLINERO..."
                    );


                    if (
                        typeof alSeleccionar ===
                        "function"
                    ) {

                        alSeleccionar(
                            id,
                            nombre
                        );

                    } else {

                        console.error(
                            "❌ NO EXISTE alSeleccionar"
                        );

                    }

                },
                500
            );
        }


        // =============================================
        // 👆 BOTÓN
        // =============================================

        boton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                seleccionar();

            }
        );


        // =============================================
        // 👆 TOCAR TARJETA
        // =============================================

        tarjeta.addEventListener(
            "click",
            function(event) {

                if (
                    event.target ===
                    boton
                ) {
                    return;
                }

                seleccionar();

            }
        );


        personajes.appendChild(
            tarjeta
        );
    }


    // =================================================
    // 👦 MIKE
    // =================================================

    crearPersonaje(
        "MIKE",
        imagenes.mike,
        "mike"
    );


    // =================================================
    // 👧 MICAELA
    // =================================================

    crearPersonaje(
        "MICAELA",
        imagenes.micaela,
        "micaela"
    );


    // =================================================
    // 📱 RECOMENDACIÓN
    // =================================================

    const recomendacion =
        document.createElement("div");

    recomendacion.textContent =
        "📱 Recomendación: juega en horizontal para una mejor experiencia.";

    Object.assign(recomendacion.style, {

        position:
            "absolute",

        bottom:
            "20px",

        left:
            "50%",

        transform:
            "translateX(-50%)",

        width:
            "90%",

        fontSize:
            "14px",

        color:
            "#aaa",

        lineHeight:
            "1.4"

    });

    pantalla.appendChild(
        recomendacion
    );


    // =================================================
    // ➕ MOSTRAR
    // =================================================

    game.appendChild(
        pantalla
    );


    console.log(
        "👤 SELECCIÓN DE PERSONAJE LISTA"
    );
        }
