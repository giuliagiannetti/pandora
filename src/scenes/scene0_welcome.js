export class MyScene extends Phaser.Scene {

   background;

    constructor () {
        super ("scene0_welcome")};

   init (){
      console.log ("scene0_welcome - Executing init ()") };

   preload (){
      console.log ("scene0_welcome - Executing preload ()")  

      //assets
      //sfondo
      this.load.image ("background_base", "assets/images/background/")

      
      //giocatore

      const player_spritesheet_config = {
         frameWidth:  280,
         frameHeight: 335,
      };
      this.load.spritesheet("playerrun", "assets/images/characters/", player_spritesheet_config);


      //nemico

      const monster_spritesheet_config = {
         frameWidth:  72,
         frameHeight: 72,
      };
      this.load.spritesheet("enemy", "assets/images/characters/", monster_spritesheet_config);


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
      this.scene.start("scene1");
       }) ;

      };
  

   update(){
   }

}




