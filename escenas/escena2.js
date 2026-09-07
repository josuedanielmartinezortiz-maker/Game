// =====================================================
// GAMERPRO GAME — ESCENA 2
// =====================================================

export function iniciarEscena2(game, imagenes) {
    const canvas = document.createElement("canvas");
    canvas.id = "escenaCanvas";
    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // =================================================
    // CONFIGURACIÓN DEL CANVAS
    // =================================================

    function ajustarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        dibujarEscena();
    }

    // =================================================
    // RENDERIZADO DE LA ESCENA
    // =================================================

    function dibujarEscena() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Renderiza el fondo de la granja
        ctx.drawImage(
            imagenes.escena2,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    ajustarCanvas();

    window.addEventListener("resize", ajustarCanvas);

    // =================================================
    // BUCLE DE RENDERIZADO
    // =================================================

    function actualizar() {
        dibujarEscena();
        requestAnimationFrame(actualizar);
    }

    actualizar();
}
