// =====================================================
// 🖼️ GAMERPRO GAME — PRECARGA
// =====================================================

export function precargarImagenes(recursos) {

    const nombres = Object.keys(recursos);

    const cargas = nombres.map((nombre) => {

        return new Promise((resolve, reject) => {

            const imagen = new Image();

            imagen.onload = () => {
                resolve({
                    nombre: nombre,
                    imagen: imagen
                });
            };

            imagen.onerror = () => {
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
                imagenes[resultado.nombre] = resultado.imagen;
            });

            return imagenes;
        });
                          }
