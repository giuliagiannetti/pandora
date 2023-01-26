export default class GoodFinale extends Phaser.Scene {

    sceneName;

constructor(){
    super("good_finale");
}


preload(){
    console.log("good - Executing preload()");

    this.load.image("vittoria", "assets/images/story/finale.jpg");
    this.load.image("homeBlank", "assets/images/buttons/text_home_blank.png");
    this.load.image("homeHover", "assets/images/buttons/text_home_hover.png");
    this.load.image("restart","assets/images/buttons/restart.png");
    this.load.image("testoGood", "assets/images/story/testo_good.png")
}

create(){
    this.background = this.add.image(0, 0, "vittoria");
    this.background.setOrigin(0,0);
    
    this.home = this.add.image(this.game.config.width/2, 600, "homeBlank");
    this.home.setOrigin(0.5,0).setScale(0.6);

    this.home_hover = this.add.image(this.game.config.width/2, 600, "homeHover");
    this.home_hover.setOrigin(0.5,0).setScale(0.6).setVisible(false);


    this.home_rectangle = this.add.rectangle(this.game.config.width/2, 600, 255, 85, 0x000000, 0);
      this.home_rectangle.setOrigin(0.5,0).setScale(0.6);
      this.home_rectangle.setInteractive();

    this.home_rectangle.on("pointerdown", ()=> {
        this.scene.start("scene0_welcome");
        this.scene.stop();
    })

    this.home_rectangle.on('pointerover',() => {
        this.home_hover.setVisible(true);
        this.home.setVisible(false);
     });
  
     this.home_rectangle.on('pointerout',() => {
        this.home_hover.setVisible(false);
        this.home.setVisible(true);
     });

    this.testo = this.add.image(this.game.config.width/2, 100, "testoGood").setScale(0.9);

    this.cameras.main.fadeIn(3000, 255, 255, 255);
    }

    
}