export default class PauseMenu extends Phaser.Scene {

    sceneName;

    constructor(){
        super("pause_menu");
    }


    init(data){
        this.sceneName = data.sceneName;
    }

    preload(){
        console.log("pause_menu - Executing preload()");

        this.load.image("menuPausa", "assets/images/background/sfondo_menu.jpg");
        this.load.image("home", "assets/images/buttons/home_text.png");
        this.load.image("play", "assets/images/buttons/play_text_1.png");
        this.load.image("menuText", "assets/images/buttons/menu_1.png");
    }

    create(){
        this.pausePanel = this.add.image(this.game.config.width/2, this.game.config.height/2, "menuPausa");
        this.pausePanel.setOrigin(0.5,0.5).setScale(0.5);

        this.menuText = this.add.image(this.game.config.width/2, 290, "menuText");
        this.menuText.setOrigin(0.5,0).setScale(0.8);

        this.pauseHome = this.add.image(540, 370, "home");
        this.pauseHome.setOrigin(0.5,0).setScale(0.6);
        this.pauseHome.setInteractive();

        this.pausePlay = this.add.image(740, 370, "play");
        this.pausePlay.setOrigin(0.5,0).setScale(0.6);
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