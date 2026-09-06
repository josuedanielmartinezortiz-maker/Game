const game = document.getElementById("game");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {

    console.log("🎮 GAMERPRO GAME — PLAY");

    mostrarEscena1();

});

function mostrarEscena1() {

    const inicio = document.getElementById("inicio");

    inicio.style.display = "none";

    const escena = document.createElement("img");

    escena.src = "./escena1.png";
    escena.id = "escena1";

    game.appendChild(escena);

}
