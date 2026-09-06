// =====================================================
// 🌾 GAMERPRO GAME — ESCENA 1
// =====================================================

export function iniciarEscena1(game) {

    const canvas = document.createElement("canvas");
    canvas.id = "escenaCanvas";

    game.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // =====================================================
    // 🖼️ IMÁGENES
    // =====================================================

    const escena = new Image();
    const mike = new Image();
    const micaela = new Image();

    escena.src = "./assets/escena1.png";
    mike.src = "./assets/mike.png";
    micaela.src = "./assets/micaela.jpg";

    // =====================================================
    // 📍 POSICIONES INICIALES
    // =====================================================

    const MIKE = {
        x: 0.47,
        y: 0.82,
        escala: 1.0
    };

    const MICAELA = {
        x: 0.53,
        y: 0.82,
        escala: 1.0
    };

    // =====================================================
    // 📐 TAMAÑO BASE
    // =====================================================

    const TAMANO_BASE = 180;

    // =====================================================
    // 🧑👩 DIBUJAR PERSONAJE
    // =====================================================

    function dibujarPersonaje(imagen, posicion) {

        if (!imagen.complete || !imagen.naturalWidth) {
            return;
        }

        const x = posicion.x * canvas.width;
        const y = posicion.y * canvas.height;

        const alto = TAMANO_BASE * posicion.escala;
        const proporcion =
            imagen.naturalWidth / imagen.naturalHeight;

        const ancho = alto * proporcion;

        ctx.drawImage(
            imagen,
            x - ancho / 2,
            y - alto / 2,
            ancho,
            alto
        );
    }

    // =====================================================
    // 🎨 DIBUJAR ESCENA
    // =====================================================

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

        // 🌾 Fondo
        ctx.drawImage(
            escena,
            0,
            0,
            canvas.width,
            canvas.height
        );

        // 🧑 Mike
        dibujarPersonaje(mike, MIKE);

        // 👩 Micaela
        dibujarPersonaje(micaela, MICAELA);
    }

    // =====================================================
    // 📱 AJUSTAR CANVAS
    // =====================================================

    function ajustarCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        dibujar();
    }

    // =====================================================
    // 🚀 CARGA
    // =====================================================

    let cargadas = 0;

    function imagenCargada() {

        cargadas++;

        if (cargadas === 3) {
            ajustarCanvas();
        }
    }

    escena.onload = imagenCargada;
    mike.onload = imagenCargada;
    micaela.onload = imagenCargada;

    escena.onerror = () => {
        console.error("❌ No se pudo cargar escena1.png");
    };

    mike.onerror = () => {
        console.error("❌ No se pudo cargar mike.png");
    };

    micaela.onerror = () => {
        console.error("❌ No se pudo cargar micaela.jpg");
    };

    window.addEventListener("resize", ajustarCanvas);
            }
