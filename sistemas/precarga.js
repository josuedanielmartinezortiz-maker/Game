// =====================================================
// 🖼️ GAMERPRO GAME — PRECARGA
// =====================================================

export function precargarImagenes(recursos, actualizarCarga) {

    const nombres = Object.keys(recursos);

    let cargadas = 0;

    const cargas = nombres.map((nombre) => {

        return new Promise((resolve, reject) => {

            const imagen = new Image();

            imagen.onload = () => {

                cargadas++;

                if (actualizarCarga) {
                    actualizarCarga(
                        cargadas,
                        nombres.length,
                        nombre,
                        true
                    );
                }

                resolve({
                    nombre: nombre,
                    imagen: imagen
                });
            };

            imagen.onerror = () => {

                console.error(
                    `❌ FALLÓ LA IMAGEN: ${nombre}`
                );

                if (actualizarCarga) {
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

            imagen.src = recursos[nombre];
        });
    });

    return Promise.all(cargas)
        .then((resultados) => {

            const imagenes = {};

            resultados.forEach((resultado) => {
                imagenes[resultado.nombre] =
                    resultado.imagen;
            });

            return imagenes;
        });
                               }
