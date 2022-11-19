//import scene from "percorso"; da compilare una volta create le scene

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000, 
    scene: [],
    pixelArt: true,
    parent: "game_area" 
};


let game = new Phaser.Game(config);

game.gameState = {
    playTime: 30,
    score: 0,
    lives: 3
}