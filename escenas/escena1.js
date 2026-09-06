// =====================================================
// 🌾 GAMERPRO GAME — ESCENA 1
// =====================================================

export function iniciarEscena1(game) {

    const canvas = document.createElement("canvas");

    canvas.id = "escenaCanvas";

    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const escena = new Image();

    escena.src = "./assets/escena1.png";

    function ajustarCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        dibujar();
    }

    function dibujar() {

        if (!escena.complete || !escena.naturalWidth) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(
            escena,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    escena.onload = () => {
        ajustarCanvas();
    };

    escena.onerror = () => {
        console.error("❌ No se pudo cargar assets/escena1.png");
    };

    window.addEventListener("resize", ajustarCanvas);
}
