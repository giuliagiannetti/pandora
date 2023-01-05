export default class GameOver extends Phaser.Scene {

    sceneName;

constructor(){
    // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
    super("gameover");
}

preload(){
    console.log("gameover - Executing preload()");
    this.load.image("gameover", "assets/images/story/gameover.jpg");
    this.load.image("home","assets/images/hud/home.png");
}

create(){
    this.background = this.add.image(0, -30, "gameover");
    this.background.setOrigin(0,0);
    
    this.home = this.add.image(640, 500, "home");
    this.home.setOrigin(0.5,0).setScale(0.2);
    this.home.setInteractive();

    this.home.on("pointerdown", ()=> {
        this.scene.start("scene0_welcome");
        this.scene.stop();
    })

    const styleConfig = {
        color: '#FFFFFF',
        font: '36px monospace'
    };

    this.gameoverText = this.add.text(this.game.config.width/2, 120, "Il male ti ha catturato", styleConfig);
    this.gameoverText.setOrigin(0.5, 0);
}
}