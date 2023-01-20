export default class PauseMenu extends Phaser.Scene {

    sceneName;

    constructor(){
        // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
		super("pause_menu");
    }


    init(data){
        this.sceneName = data.sceneName;
    }

    preload(){
        console.log("pause_menu - Executing preload()");

        this.load.image("menuPausa", "assets/images/background/sfondo_menu.jpg");
        this.load.image("home", "assets/images/buttons/home.png");
        this.load.image("play", "assets/images/buttons/play.png");
    }

    create(){
        this.pausePanel = this.add.image(this.game.config.width/2, this.game.config.height/2, "menuPausa");
        this.pausePanel.setOrigin(0.5,0.5).setScale(0.5);
        
        this.pauseHome = this.add.image(560, 360, "home");
        this.pauseHome.setOrigin(0.5,0).setScale(0.15);
        this.pauseHome.setInteractive();

        this.pausePlay = this.add.image(720, 360, "play");
        this.pausePlay.setOrigin(0.5,0).setScale(0.15);
        this.pausePlay.setInteractive();

        this.pausePlay.on("pointerdown", ()=>{
            this.scene.resume(this.sceneName);
            this.scene.stop();
        });

        this.pauseHome.on("pointerdown", ()=> {
            this.scene.start("scene0_welcome");
            this.scene.stop(this.sceneName);
            this.scene.stop();
        })
   }
}