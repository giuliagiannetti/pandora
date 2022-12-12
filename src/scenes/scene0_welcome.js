export default class WelcomeScene extends Phaser.Scene {

   background;
   lights;

   constructor () {
        super ("scene0_welcome")};

   init (){
      console.log ("scene0_welcome - Executing init ()") };

   preload (){
      console.log ("scene0_welcome - Executing preload ()"); 

      //assets
      
      //sfondo
      this.load.image ("background_base", "assets/images/background/scherminiz_render_bozza1.jpg");
      

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
      this.load.image ("bottoneGioca", "assets/images/buttons/BottoneGioca.png");
      this.load.image ("bottoneStoria", "assets/images/buttons/BottoneStoria.png");
      this.load.image ("bottoneCrediti", "assets/images/buttons/BottoneCrediti.png");
      

   
      //comando momentaneo
      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    };


    create () {
      console.log("scene0_welcome - Executing create()");

   

      //posizione degli elementi 
      this.background = this.add.image(this.game.config.width/2, this.game.config.height/2, "background_base");
      this.background.setOrigin(0.5,0.5);

      this.background.setPipeline('Light2D').setAlpha(0.5);

      //immagine del bottone
      this.playbutton = this.add.image(145, 242, "bottoneGioca");
      this.bottone_storia = this.add.image(500, 342, "bottoneStoria");
      this.bottone_crediti = this.add.image(500, 442, "bottoneCrediti");

      this.playbutton.setOrigin(0.5, 0.5);
      this.playbutton.setInteractive();

      this.bottone_storia.setOrigin(0.5, 0.5);
      this.bottone_storia.setInteractive();

      this.bottone_crediti.setOrigin(0.5, 0.5);
      this.bottone_crediti.setInteractive();

      //bottone cliccabile 
      this.playbutton.on("pointerdown", ()=>{ 
      this.scene.start("scene1");
       }) ;

      var light = this.lights.addLight(300, 300, 700).setScrollFactor(0.0).setIntensity(2);

      this.lights.enable();
      this.lights.setAmbientColor(0x555555);

      this.input.on('pointermove', function (pointer) {
  
          light.x = pointer.x;
          light.y = pointer.y;
  
      });

      

      };
  

   update(){
    
   }

}




