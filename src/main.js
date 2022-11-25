import WelcomeScene from "./scenes/scene0_welcome.js";
import Scene1 from "./scenes/scene1.js"

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000, 
    scene: [ WelcomeScene, Scene1 ],
    pixelArt: false,
    parent: "game_area", 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 500,  // forza di gravità
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