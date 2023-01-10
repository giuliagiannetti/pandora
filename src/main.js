import WelcomeScene from "./scenes/scene0_welcome.js";
import CreditsScene from "./scenes/scene_story.js";
import StoryScene from "./scenes/scene_credits.js";
import Scene1 from "./scenes/scene1.js";
import Scene2 from "./scenes/scene2.js";
import Scene3 from "./scenes/scene3.js";
import storie from "./scenes/storie.js";
import PauseMenu from "./menu/pause_menu.js";
import GameOver from "./menu/gameover.js";


const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000, 
    scene: [ WelcomeScene, Scene1, Scene2, Scene3, StoryScene, CreditsScene, storie, PauseMenu, GameOver ],
    pixelArt: false,
    parent: "game_area", 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                 y: 500,  
                 },
            debug: false
        }
    }
};


let game = new Phaser.Game(config);

game.gameState = {
    lives: 3,
}

game.scene.start ("scene0_welcome");  