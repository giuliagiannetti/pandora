//import scene from "percorso"; da compilare una volta create le scene

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000, //colore nero
    scene: [MyScene],
    pixelArt: true,
    parent: "game_area" //div contenitore
};


let game = new Phaser.Game(config);

game.gameState = {
    playTime: 30,
    score: 0,
    lives: 3
}

game.scene.start ("ipotetica Scena1");  //se voglio far partire il gioco da una scena specifica