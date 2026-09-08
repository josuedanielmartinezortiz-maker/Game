// =====================================================
// 🖼️ GAMERPRO GAME — SISTEMA DE PRECARGA
// =====================================================

export function precargarImagenes(
    recursos,
    actualizarCarga
) {

    const nombres =
        Object.keys(recursos);


    let cargadas = 0;


    // =================================================
    // 📥 CARGAR TODAS LAS IMÁGENES
    // =================================================

    const cargas =
        nombres.map((nombre) => {

            return new Promise(
                (resolve, reject) => {

                    const imagen =
                        new Image();


                    // =========================================
                    // ✅ CARGA CORRECTA
                    // =========================================

                    imagen.onload =
                        () => {

                            cargadas++;


                            console.log(
                                `✅ Cargada: ${nombre} (${cargadas}/${nombres.length})`
                            );


                            if (
                                actualizarCarga
                            ) {

                                actualizarCarga(
                                    cargadas,
                                    nombres.length,
                                    nombre,
                                    true
                                );
                            }


                            resolve({
                                nombre,
                                imagen
                            });
                        };


                    // =========================================
                    // ❌ ERROR
                    // =========================================

                    imagen.onerror =
                        () => {

                            console.error(
                                `❌ FALLÓ LA IMAGEN: ${nombre}`
                            );


                            if (
                                actualizarCarga
                            ) {

                                actualizarCarga(
                                    cargadas,
                                    nombres.length,
                                    nombre,
                                    false
                                );
                            }


                            reject(
                                new Error(
                                    `No se pudo cargar: ${recursos[nombre]}`
                                )
                            );
                        };


                    // =========================================
                    // 🌐 RUTA
                    // =========================================

                    imagen.src =
                        recursos[nombre];
                }
            );
        });


    // =================================================
    // 🎮 RESULTADO
    // =================================================

    return Promise.all(
        cargas
    )

    .then((resultados) => {

        const imagenes =
            {};


        resultados.forEach(
            (resultado) => {

                imagenes[
                    resultado.nombre
                ] =
                    resultado.imagen;

            }
        );


        return imagenes;

    });
                        }
