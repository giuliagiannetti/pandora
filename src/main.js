import {WelcomeScene} from "./scenes/scene0_welcome.js"

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000, //colore nero
    scene: [ WelcomeScene ],
    pixelArt: false,
    parent: "game_area", //div contenitore
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200,  // forza di gravità
            },
            debug: true
        }
    }
};


let game = new Phaser.Game(config);

game.gameState = {
    playTime: 30,
    score: 0,
    lives: 3
}

game.scene.start ("scene0_welcome");  //se voglio far partire il gioco da una scena specifica