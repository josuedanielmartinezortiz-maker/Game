export function hablarSuave(texto, esMicaela = false) {
    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-MX";
    voz.volume = 0.8;

    if (esMicaela) {
        voz.pitch = 1.35;
        voz.rate = 0.70; // 👧 más lenta
    } else {
        voz.pitch = 1.05;
        voz.rate = 0.70; // 🧑 más lento
    }

    speechSynthesis.speak(voz);
}
