export default class Storia1 extends Phaser.Scene {
    constructor() {
        super("storie")
     };
  
     init() {
        console.log("storie - Executing init ()")
     };

    preload() {
        console.log("storie - Executing preload ()");
  
        //assets
  
        //sfondo
        this.load.image("storia1", "assets/images/story/testo_olimpogiusto.png");
        this.load.image("scena1", "assets/images/story/scena1.jpg");
        this.load.image("storia2", "assets/images/story/testo_maligiusto.png");
        this.load.image("scena2", "assets/images/story/scena2.jpg");
        this.load.image("storia3", "assets/images/story/testo_polisgiusto.png");
        this.load.image("scena3", "assets/images/story/scena3.jpg");
        this.load.image("pregioco", "assets/images/story/testo_preplatformgiusto.png");

        //bottoni
        this.load.image("avantinero", "assets/images/story/avantinero.png");
        this.load.image("indietronero", "assets/images/story/indietronero.png");
        
}
create() {
    console.log("storie - Executing create()");

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //da togliere dopo
    
    
    //nel nome degli asset li chiamiamo testo e scena, nel preload li chiamiamo storia e scena e nel create li chiamiamo testo e ambient
    this.testo1 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "storia1");
    this.testo1.setOrigin(0.5, 0.5).setScale(0.36);
    this.testo1.setAlpha(1);

    this.ambiente1 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "scena1");
    this.ambiente1.setOrigin(0.5, 0.5);
    this.ambiente1.setAlpha(0);


    this.testo2 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "storia2");
    this.testo2.setOrigin(0.5, 0.5).setScale(0.36);
    this.testo2.setAlpha(0);

    this.ambiente2 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "scena2");
    this.ambiente2.setOrigin(0.5, 0.5);
    this.ambiente2.setAlpha(0);


    this.testo3 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "storia3");
    this.testo3.setOrigin(0.5, 0.5).setScale(0.36);
    this.testo3.setAlpha(0);

    this.ambiente3 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "scena3");
    this.ambiente3.setOrigin(0.5, 0.5);
    this.ambiente3.setAlpha(0);


    this.pregioco = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "pregioco");
    this.pregioco.setOrigin(0.5, 0.5);
    this.pregioco.setAlpha(0);



    
    //bottoni
    this.bottoneIndietroNero = this.add.image(200, 650, "indietronero");
    this.bottoneAvantiNero = this.add.image(this.game.config.width - 200, 650, "avantinero");

    this.bottoneIndietroNero.setInteractive();
    this.bottoneAvantiNero.setInteractive();

    //array di bottoni perchè se no si premono da soli
    /*this.bottoniAvanti = [];
        for (let i=0; i<7; i++) {
         let bottoneAvantiNero = this.add.image(this.game.config.width - 200, 650, "avantinero");
            this.bottoniavanti.push(bottoneAvantiNero);}*/

    //bottone cliccabile 
    if (this.testo1.alpha = 1) {
      this.bottoneAvantiNero.on("pointerdown", () => {
         console.log("sto andando avanti a ambiente1")
         this.ambiente1.setAlpha(1);
         this.testo1.setAlpha(0);
      });

      this.bottoneIndietroNero.on("pointerdown", () => {
         console.log("sto tornando alla scena iniziale")
         this.scene.start("scene0_welcome");
      });
    }


    if (this.ambiente1.alpha = 1) {
      this.bottoneAvantiNero.on("pointerdown", () => {
         console.log("sto andando avanti a testo2")
         this.testo2.setAlpha(1);
         this.ambiente1.setAlpha(0);
      });

      this.bottoneIndietroNero.on("pointerdown", () => {
         console.log("sto andando indietro a ambiente1")
         this.testo1.setAlpha(1);
         this.ambiente1.setAlpha(0);
      });
    }

    if (this.testo2.alpha = 1) {
      this.bottoneAvantiNero.on("pointerdown", () => {
         console.log("sto andando avanti a ambiente2")
         this.ambiente2.setAlpha(1);
         this.testo2.setAlpha(0);
      });

      this.bottoneIndietroNero.on("pointerdown", () => {
         console.log("sto andando inidietro a ambiente1")
         this.ambiente1.setAlpha(1);
         this.testo2.setAlpha(0);
      });
    } 

    if (this.ambiente2.alpha = 1) {
      this.bottoneAvantiNero.on("pointerdown", () => {
         console.log("sto andando avanti a testo3")
         this.testo3.setAlpha(1);
         this.ambiente2.setAlpha(0);
      });

      this.bottoneIndietroNero.on("pointerdown", () => {
         console.log("sto andando indietro a testo2")
         this.testo2.setAlpha(1);
         this.ambiente2.setAlpha(0);
      });
    } 

    if (this.testo3.alpha = 1) {
      this.bottoneAvantiNero.on("pointerdown", () => {
         console.log("sto andando avanti a ambiente3")
         this.ambiente3.setAlpha(1);
         this.testo3.setAlpha(0);
      });

      this.bottoneIndietroNero.on("pointerdown", () => {
         console.log("sto andando indietro a ambiente2")
         this.ambiente2.setAlpha(1);
         this.testo3.setAlpha(0);
      });
    } 

    if (this.ambiente3.alpha = 1) {
      this.bottoneAvantiNero.on("pointerdown", () => {
         console.log("sto andando avanti a pregioco")
         this.pregioco.setAlpha(1);
         this.ambiente3.setAlpha(0);
      });

      this.bottoneIndietroNero.on("pointerdown", () => {
         console.log("sto andando indietro a testo3")
         this.testo3.setAlpha(1);
         this.ambiente3.setAlpha(0);
      });
    } 

    if (this.pregioco.alpha = 1) {
      this.bottoneAvantiNero.on("pointerdown", () => {
         console.log("sto iniziando scene1")
         this.scene.start("scene1");
      });

      this.bottoneIndietroNero.on("pointerdown", () => {
         console.log("sto andando indietro a ambiente3")
         this.ambiente3.setAlpha(1);
         this.pregioco.setAlpha(0);
      });
    } 

    
    
    
 };

 update() {
   if (this.keySpace.isDown) {
       this.ambiente1.setAlpha(1);
       this.testo.setAlpha(1);
    }
 }

}