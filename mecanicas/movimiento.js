// =====================================================
// 🚶 GAMERPRO GAME — MOVIMIENTO
// =====================================================

export function moverPersonajes(personajes, destino, duracion = 1000) {

    const inicio = personajes.map((personaje) => ({
        x: personaje.x,
        y: personaje.y
    }));

    const tiempoInicio = performance.now();

    function animar(tiempoActual) {

        const progreso =
            Math.min(
                (tiempoActual - tiempoInicio) / duracion,
                1
            );

        personajes.forEach((personaje, indice) => {

            personaje.x =
                inicio[indice].x +
                (destino[indice].x - inicio[indice].x) *
                progreso;

            personaje.y =
                inicio[indice].y +
                (destino[indice].y - inicio[indice].y) *
                progreso;
        });

        if (progreso < 1) {
            requestAnimationFrame(animar);
        }
    }

    requestAnimationFrame(animar);
    }
