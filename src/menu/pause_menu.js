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

        this.load.image("menuPausa", "assets/images/hud/menuPausa.jpg");
        this.load.image("home", "assets/images/buttons/home.png");
        this.load.image("play", "assets/images/buttons/play.png");
    }

    create(){
        this.pausePanel = this.add.image(this.game.config.width/2, 0, "menuPausa");
        this.pausePanel.setOrigin(0.5,0);
        
        this.pauseHome = this.add.image(510, 300, "home");
        this.pauseHome.setOrigin(0.5,0).setScale(0.2);
        this.pauseHome.setInteractive();

        this.pausePlay = this.add.image(770, 300, "play");
        this.pausePlay.setOrigin(0.5,0).setScale(0.18);
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