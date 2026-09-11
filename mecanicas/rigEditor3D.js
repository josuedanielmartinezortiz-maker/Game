// =====================================================
// 🧪 BLOQUE 5 — DIAGNÓSTICO VISUAL SEGURO
// =====================================================

let panelDiagnostico = null;


// =====================================================
// CREAR PANEL
// =====================================================

function crearPanelDiagnostico() {

    if (panelDiagnostico) {
        return panelDiagnostico;
    }

    panelDiagnostico =
        document.createElement("div");

    panelDiagnostico.id =
        "panelDiagnosticoRig";

    Object.assign(
        panelDiagnostico.style,
        {
            position: "fixed",

            right: "10px",
            top: "10px",

            zIndex: "2000",

            width: "260px",
            maxWidth:
                "calc(100vw - 20px)",

            maxHeight: "65vh",

            overflowY: "auto",

            padding: "12px",

            background:
                "rgba(10,10,15,0.96)",

            border:
                "1px solid rgba(255,255,255,0.18)",

            borderRadius: "12px",

            color: "#ffffff",

            fontFamily:
                "Arial, sans-serif",

            fontSize: "12px",

            boxSizing:
                "border-box",

            boxShadow:
                "0 8px 30px rgba(0,0,0,0.5)"
        }
    );

    contenedor.appendChild(
        panelDiagnostico
    );

    return panelDiagnostico;
}


// =====================================================
// DIAGNÓSTICO
// =====================================================

function mostrarDiagnosticoRig() {

    const panel =
        crearPanelDiagnostico();

    panel.innerHTML = "";


    // =================================================
    // TÍTULO
    // =================================================

    const titulo =
        document.createElement("div");

    titulo.textContent =
        "🧪 DIAGNÓSTICO DE MICAELA";

    Object.assign(
        titulo.style,
        {
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "10px"
        }
    );

    panel.appendChild(
        titulo
    );


    // =================================================
    // ESPERAR MODELO
    // =================================================

    if (!modelo) {

        const espera =
            document.createElement("div");

        espera.textContent =
            "⏳ Cargando Micaela...";

        espera.style.color =
            "#ffd166";

        panel.appendChild(
            espera
        );

        return;
    }


    // =================================================
    // CONTADORES
    // =================================================

    let meshes = 0;

    let skinnedMeshes = 0;

    let esqueletos = 0;

    const huesos =
        [];

    const esqueletosVistos =
        new Set();


    // =================================================
    // RECORRER MODELO
    // =================================================

    modelo.traverse(
        objeto => {

            // -----------------------------------------
            // MESH
            // -----------------------------------------

            if (
                objeto.isMesh
            ) {

                meshes++;
            }


            // -----------------------------------------
            // SKINNED MESH
            // -----------------------------------------

            if (
                objeto.isSkinnedMesh
            ) {

                skinnedMeshes++;


                // MUY IMPORTANTE:
                // comprobar que realmente
                // exista skeleton.

                if (
                    !objeto.skeleton
                ) {

                    return;
                }


                const skeleton =
                    objeto.skeleton;


                // Evitar contar el mismo
                // skeleton varias veces.

                if (
                    !esqueletosVistos
                        .has(skeleton)
                ) {

                    esqueletosVistos
                        .add(skeleton);

                    esqueletos++;

                    if (
                        Array.isArray(
                            skeleton.bones
                        )
                    ) {

                        skeleton.bones
                            .forEach(
                                bone => {

                                    if (
                                        bone &&
                                        bone.name
                                    ) {

                                        if (
                                            !huesos
                                                .includes(
                                                    bone.name
                                                )
                                        ) {

                                            huesos
                                                .push(
                                                    bone.name
                                                );
                                        }
                                    }
                                }
                            );
                    }
                }
            }
        }
    );


    // =================================================
    // RESUMEN
    // =================================================

    const resumen =
        document.createElement("div");

    resumen.innerHTML =

        "🧍 Modelo: <b>Cargado</b><br>" +

        "🧩 Meshes: <b>" +
        meshes +
        "</b><br>" +

        "🦴 SkinnedMesh: <b>" +
        skinnedMeshes +
        "</b><br>" +

        "💀 Esqueletos: <b>" +
        esqueletos +
        "</b><br>" +

        "🦴 Huesos reales: <b>" +
        huesos.length +
        "</b>";


    Object.assign(
        resumen.style,
        {
            lineHeight: "1.7",
            marginBottom: "10px"
        }
    );


    panel.appendChild(
        resumen
    );


    // =================================================
    // ESTADO
    // =================================================

    const estado =
        document.createElement("div");


    if (
        skinnedMeshes > 0 &&
        esqueletos > 0 &&
        huesos.length > 0
    ) {

        estado.textContent =
            "✅ Micaela tiene un esqueleto real.";

        estado.style.color =
            "#55ff88";

    } else {

        estado.textContent =
            "⚠️ No se encontró un esqueleto válido.";

        estado.style.color =
            "#ffd166";
    }


    Object.assign(
        estado.style,
        {
            padding: "8px",

            marginBottom: "10px",

            background:
                "rgba(255,255,255,0.06)",

            borderRadius: "7px"
        }
    );


    panel.appendChild(
        estado
    );


    // =================================================
    // LISTA DE HUESOS
    // =================================================

    if (
        huesos.length > 0
    ) {

        const tituloHuesos =
            document.createElement("div");

        tituloHuesos.textContent =
            "🦴 HUESOS DEL GLB";

        tituloHuesos.style.fontWeight =
            "bold";

        tituloHuesos.style.marginBottom =
            "6px";


        panel.appendChild(
            tituloHuesos
        );


        const lista =
            document.createElement("div");


        huesos.forEach(
            (
                nombre,
                indice
            ) => {

                const fila =
                    document.createElement("div");

                fila.textContent =
                    `${indice + 1}. ${nombre}`;


                Object.assign(
                    fila.style,
                    {
                        padding: "4px 6px",

                        marginBottom: "2px",

                        background:
                            "rgba(255,255,255,0.05)",

                        borderRadius: "5px",

                        overflow:
                            "hidden",

                        textOverflow:
                            "ellipsis",

                        whiteSpace:
                            "nowrap"
                    }
                );


                lista.appendChild(
                    fila
                );
            }
        );


        panel.appendChild(
            lista
        );
    }


    // =================================================
    // GUARDAR DIAGNÓSTICO
    // =================================================

    modelo.userData
        .rigDiagnostico = {

        meshes:
            meshes,

        skinnedMeshes:
            skinnedMeshes,

        esqueletos:
            esqueletos,

        huesos:
            huesos
    };
}


// =====================================================
// EJECUTAR
// =====================================================

mostrarDiagnosticoRig();


// =====================================================
// ACTUALIZAR DESPUÉS DE CARGAR
// =====================================================

setTimeout(
    mostrarDiagnosticoRig,
    500
);

setTimeout(
    mostrarDiagnosticoRig,
    1500
);


// =====================================================
// MÓVIL
// =====================================================

if (
    window.innerWidth < 600
) {

    if (panelDiagnostico) {

        panelDiagnostico.style.width =
            "205px";

        panelDiagnostico.style.right =
            "8px";

        panelDiagnostico.style.top =
            "8px";
    }
}
