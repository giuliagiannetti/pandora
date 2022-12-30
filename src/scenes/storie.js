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

        //bottoni
        this.load.image("avantinero", "assets/images/story/avantinero.png");
        this.load.image("indietronero", "assets/images/story/indietronero.png");
        
}
create() {
    console.log("storie - Executing create()");

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.ambiente1 = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "scena1");
    
    this.ambiente1.setOrigin(0.5, 0.5);
    this.ambiente1.setAlpha(0);
    //posizione degli elementi 
    this.testo = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "storia1");
    this.testo.setOrigin(0.5, 0.5).setScale(0.36);
    this.testo.setAlpha(1);
    
    //bottoni
    this.bottoneIndietroNero = this.add.image(200, 650, "indietronero");
    this.bottoneAvantiNero = this.add.image(this.game.config.width - 200, 650, "avantinero");
    
 };

 update() {
   if (this.keySpace.isDown) {
       this.ambiente1.setAlpha(0);
       this.testo.setAlpha(1);
    }
 }

}