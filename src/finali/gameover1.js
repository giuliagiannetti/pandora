export default class GameOver1 extends Phaser.Scene {

    sceneName;

constructor(){
    // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
    super("gameover1");
}


preload(){
    console.log("gameover - Executing preload()");

    this.load.image("gameover", "assets/images/story/gameover.jpg");
    this.load.image("home","assets/images/buttons/home_text.png");
    this.load.image("restart","assets/images/buttons/restart_text_1.png");
    this.load.image("testoBad", "assets/images/story/testo_bad.png")
}

create(){
    this.background = this.add.image(0, 0, "gameover");
    this.background.setOrigin(0,0);
    
    this.home = this.add.image(2*this.game.config.width/3 - 120, 610, "home");
    this.home.setOrigin(0.5,0).setScale(0.59);
    this.home.setInteractive();

    this.restartButton = this.add.image(this.game.config.width/3 + 120, 610, "restart");
    this.restartButton.setOrigin(0.5,0).setScale(0.59);
    this.restartButton.setInteractive();

    this.home.on("pointerdown", ()=> {
        this.scene.start("scene0_welcome");
        this.scene.stop();
    })

    this.restartButton.on("pointerdown", ()=> {
        this.scene.start("scene1");
        this.scene.stop();
    })

    this.testo = this.add.image(this.game.config.width/2, 550, "testoBad").setScale(0.9);
    

}
}