export class MyScene extends Phaser.Scene {

    constructor () {
        super ("scene0_welcome")};

   init (){
    console.log ("scene0_welcome - Executing init ()") };

    preload (){
    console.log ("scene0_welcome - Executing preload ()")  

      //assets
      //sfondo
      this.load.image ("DA INSERIRE")

       //giocatore
      {
         this.load.image ("DA INSERIRE")
      } ;


     //componenti grafiche (button)
      this.load.image ("DA INSERIRE")
      this.load.image ("DA INSERIRE")
      this.load.image ("DA INSERIRE")

 
    };


    create () {
    console.log(" scene0_welcome - Executing create()");

     //posizione degli elementi 
     this.background = this.add.image(0, 0, "background_base");
     this.background.setOrigin(0,0);

     //immagine del bottone
     this.playbutton = this.add.image(this.game.config.width/2, this.game.config.height/2, "playButton");
        this.playbutton.setOrigin(0.5, 0.5);
        this.playbutton.setInteractive();

     //bottone cliccabile 
     this.playbutton.on("pointerdown", ()=>{ 
      this.scene.start("NOME DELLA SCENA CHE INIZIA SCHIACCIANDOLO ");
       }) ;
 
      };
  




}




