export function hablarSuave(texto, esMicaela = false) {
    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-MX";
    voz.volume = 0.8;

    if (esMicaela) {
        voz.pitch = 1.35;
        voz.rate = 0.85;
    } else {
        voz.pitch = 1.05;
        voz.rate = 0.8;
    }

    const voces = speechSynthesis.getVoices();

    const vozEspanol = voces.find(v =>
        v.lang.toLowerCase().startsWith("es")
    );

    if (vozEspanol) {
        voz.voice = vozEspanol;
    }

    speechSynthesis.speak(voz);
                                  }
