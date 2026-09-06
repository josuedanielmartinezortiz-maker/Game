    // =====================================================
    // 🚶 GAMERPRO GAME — MOVIMIENTO PROGRESIVO
    // =====================================================

    export function moverPersonajes(
        personajes,
        destinos,
        duracion = 10000
    ) {

        const inicio = personajes.map((personaje) => ({
            x: personaje.x,
            y: personaje.y,
            escala: personaje.escala
        }));

        const tiempoInicio = performance.now();

        function animar(tiempoActual) {

            let progreso =
                (tiempoActual - tiempoInicio) / duracion;

            progreso = Math.min(progreso, 1);

            // Movimiento suave y progresivo
            const movimiento =
                progreso * progreso * (3 - 2 * progreso);

            personajes.forEach((personaje, indice) => {

                const comienzo = inicio[indice];
                const destino = destinos[indice];

                personaje.x =
                    comienzo.x +
                    (destino.x - comienzo.x) *
                    movimiento;

                personaje.y =
                    comienzo.y +
                    (destino.y - comienzo.y) *
                    movimiento;

                personaje.escala =
                    comienzo.escala +
                    (destino.escala - comienzo.escala) *
                    movimiento;
            });

            if (progreso < 1) {
                requestAnimationFrame(animar);
            }
        }

        requestAnimationFrame(animar);
                               }
