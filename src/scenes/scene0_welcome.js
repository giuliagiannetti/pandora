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
      

      // Carichiamo l'immagine del giocatore in formato spritesheet (ci servirà nelle prossime scene)
      const player_spritesheet_config = {
         frameWidth:  280,
         frameHeight: 335,
      };
      this.load.spritesheet("playerrun", "assets/images/characters/omino.png", player_spritesheet_config);

      //nemico
      const monster_spritesheet_config = {
         frameWidth:  72,
         frameHeight: 72,
      };
      this.load.spritesheet("enemy", "assets/images/characters/", monster_spritesheet_config);


      //componenti grafiche (button)

   
      //comando momentaneo
      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
      if (this.keySpace.isDown) {
         this.scene.start("scene1");
     }
   }

}




