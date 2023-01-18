export default class GameOver3 extends Phaser.Scene {

    sceneName;

constructor(){
    // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
    super("gameover3");
}


preload(){
    console.log("gameover - Executing preload()");

    this.load.image("gameover", "assets/images/story/gameover.jpg");
    this.load.image("home","assets/images/hud/home.png");
    this.load.image("restart","assets/images/hud/restart.png");
}

create(){
    this.background = this.add.image(0, 0, "gameover");
    this.background.setOrigin(0,0);
    
    this.home = this.add.image(2*this.game.config.width/3 - 120, 510, "home");
    this.home.setOrigin(0.5,0).setScale(0.18);
    this.home.setInteractive();

    this.restartButton = this.add.image(this.game.config.width/3 + 120, 510, "restart");
    this.restartButton.setOrigin(0.5,0).setScale(0.18);
    this.restartButton.setInteractive();

    this.home.on("pointerdown", ()=> {
        this.scene.start("scene0_welcome");
        this.scene.stop();
    })

    this.restartButton.on("pointerdown", ()=> {
        this.scene.start("scene3");
        this.scene.stop();
    })

    const styleConfig = {
        color: '#FFFFFF',
        font: '36px monospace'
    };

    this.gameoverText = this.add.text(this.game.config.width/2, 420, "Il male ti ha catturato", styleConfig);
    this.gameoverText.setOrigin(0.5, 0);
}
}