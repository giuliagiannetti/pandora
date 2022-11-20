export class WelcomeScene extends Phaser.Scene {

   background;

   constructor () {
        super ("scene0_welcome")};

   init (){
      console.log ("scene0_welcome - Executing init ()") };

   preload (){
      console.log ("scene0_welcome - Executing preload ()"); 

      //assets
      //sfondo
      this.load.image ("background_base", "assets/images/background/copertina.jpeg");
   
      
      //giocatore


      //nemico


      //componenti grafiche (button)
   

 
    };


    create () {
      console.log(" scene0_welcome - Executing create()");

      //posizione degli elementi 
      this.background = this.add.image(this.game.config.width/2, this.game.config.height/2, "background_base");
      this.background.setOrigin(0.5,0.5);

      //immagine del bottone
      /* this.playbutton = this.add.image(this.game.config.width/2, this.game.config.height/2, "playButton");
      this.playbutton.setOrigin(0.5, 0.5);
      this.playbutton.setInteractive();

      //bottone cliccabile 
      this.playbutton.on("pointerdown", ()=>{ 
      this.scene.start("scene1");
       }) ;*/

      };
  

   update(){
   }

}



