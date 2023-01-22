export default class WelcomeScene extends Phaser.Scene {

   background;
   lights;

   constructor() {
      super("scene0_welcome")
   };

   init() {
      console.log("scene0_welcome - Executing init ()")
   };

   preload() {
      console.log("scene0_welcome - Executing preload ()");

      //assets

      //sfondo
      this.load.image("background_base", "assets/images/background/schermata_iniziale_render.jpg");

      //bottoni con sprite (falliti)
      /*this.load.spritesheet( 'bottoneGioca' , 'assets/images/buttons/spriteGioca.png' ,{frameWidth:191,frameHeight:82});
      this.load.spritesheet( 'bottoneStoria' , 'assets/images/buttons/spriteStoria.png' ,{frameWidth:191,frameHeight:82});
      this.load.spritesheet( 'bottoneCrediti' , 'assets/images/buttons/spriteCrediti.png' ,{frameWidth:191,frameHeight:82});*/

      //bottoni con immagini normali
      this.load.image("bottoneGioca", "assets/images/buttons/bottoneGioca.png");
      this.load.image("bottoneStoria", "assets/images/buttons/bottoneStoria.png");
      this.load.image("bottoneCrediti", "assets/images/buttons/bottoneCrediti.png");
        //bottoni con hover
        this.load.image("bottoneGioca_hover", "assets/images/buttons/bottoneGioca_hover.png");
        this.load.image("bottoneStoria_hover", "assets/images/buttons/bottoneStoria_hover.png");
        this.load.image("bottoneCrediti_hover", "assets/images/buttons/bottoneCrediti_hover.png");
      
      //bottoni scorsi
      /*this.load.image("bottoneGioca", "assets/images/buttons/BottoneGioca.png");
      this.load.image("bottoneStoria", "assets/images/buttons/BottoneStoria.png");
      this.load.image("bottoneCrediti", "assets/images/buttons/BottoneCrediti.png");*/

   };


   create() {
      console.log("scene0_welcome - Executing create()");



      //posizione degli elementi 
      this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "background_base");
      this.background.setOrigin(0.5, 0.5);

      

      //immagine del bottone
        //con sprite(fallito)
      /*this.bottone_gioca = this.add.sprite(300,242,'bottoneGioca');
      this.bottone_storia = this.add.sprite(300,342,'bottoneStoria');
      this.bottone_crediti = this.add.sprite(300,442,'bottoneCrediti');*/
      
      this.bottone_gioca = this.add.image(300,242,'bottoneGioca');
      this.bottone_storia = this.add.image(300,342,'bottoneStoria');
      this.bottone_crediti = this.add.image(300,442,'bottoneCrediti');
      this.bottone_gioca_hover = this.add.image(300,242,'bottoneGioca_hover');
      this.bottone_storia_hover = this.add.image(300,342,'bottoneStoria_hover');
      this.bottone_crediti_hover = this.add.image(300,442,'bottoneCrediti_hover');

      //origini, interattività, trasparenza
      this.bottone_gioca.setOrigin(0, 0);
      this.bottone_gioca.setInteractive();
      this.bottone_gioca.setAlpha(1);

      this.bottone_storia.setOrigin(0, 0);
      this.bottone_storia.setInteractive();
      this.bottone_storia.setAlpha(1);

      this.bottone_crediti.setOrigin(0, 0);
      this.bottone_crediti.setInteractive();
      this.bottone_crediti.setAlpha(1);


      this.bottone_gioca_hover.setOrigin(0, 0);
      this.bottone_gioca_hover.setInteractive();
      this.bottone_gioca_hover.setAlpha(0);

      this.bottone_storia_hover.setOrigin(0, 0);
      this.bottone_storia_hover.setInteractive();
      this.bottone_storia_hover.setAlpha(0);

      this.bottone_crediti_hover.setOrigin(0, 0);
      this.bottone_crediti_hover.setInteractive();
      this.bottone_crediti_hover.setAlpha(0);

//bottoni interattivi con trasparenza
this.bottone_gioca.on('pointerover',() => {
   this-bottone_gioca.setAlpha(0);
   this.bottone_gioca_hover.setAlpha(1);
});

this.bottone_gioca.on('pointerout',() => {
   this.bottone_gioca.setAlpha(1);
   this.bottone_gioca_hover.setAlpha(0);
});

this.bottone_storia.on('pointerover',function(pointer){
   this.bottone_storia.setAlpha(0);
   this.bottone_storia_hover.setAlpha(1);
});

this.bottone_storia.on('pointerout',function(pointer){
   this.bottone_storia.setAlpha(1);
   this.bottone_storia_hover.setAlpha(0);
});

this.bottone_crediti.on('pointerover',function(pointer){
   this.bottone_crediti.setAlpha(0);
   this.bottone_crediti_hover.setAlpha(1);
});

this.bottone_crediti.on('pointerout',function(pointer){
   this.bottone_crediti.setAlpha(1);
   this.bottone_crediti_hover.setAlpha(0);
});


      //bottoni interattivi con spritesheet (fallito)
/*bottone_gioca.on('pointerover',() => {
    bottone_gioca.setFrame(1);
});

bottone_gioca.on('pointerout',() => {
    bottone_gioca.setFrame(0);
});

bottone_storia.on('pointerover',function(pointer){
   bottone_storia.setFrame(1);
})

bottone_storia.on('pointerout',function(pointer){
   bottone_storia.setFrame(0);
})

bottone_crediti.on('pointerover',function(pointer){
   bottone_crediti.setFrame(1);
})

bottone_crediti.on('pointerout',function(pointer){
   bottone_crediti.setFrame(0);
})*/
      
      //gl scorsi bottoni
      /*this.playbutton = this.add.image(300, 242, "bottoneGioca");
      this.bottone_storia = this.add.image(300, 392, "bottoneStoria");
      this.bottone_crediti = this.add.image(300, 542, "bottoneCrediti");

      this.playbutton.setOrigin(0.5, 0.5);
      this.playbutton.setInteractive();

      this.bottone_storia.setOrigin(0.5, 0.5);
      this.bottone_storia.setInteractive();

      this.bottone_crediti.setOrigin(0.5, 0.5);
      this.bottone_crediti.setInteractive();

      //bottone cliccabile 
      this.playbutton.on("pointerdown", () => {
         this.scene.start("scene1");
      });

      //bottone cliccabile 
      this.bottone_storia.on("pointerdown", () => {
         this.scene.start("storie");
      });

      //bottone cliccabile 
      this.bottone_crediti.on("pointerdown", () => {
         this.scene.start("scene_credits");
      });*/

      //luce che abbiamo deciso di togliere credo
      /*this.background.setPipeline('Light2D').setAlpha(0.5);
      var light = this.lights.addLight(300, 300, 1300).setScrollFactor(0.0).setIntensity(3);

      this.lights.enable();
      this.lights.setAmbientColor(0xFFFFFF);

      this.input.on('pointermove', function (pointer) {

         light.x = pointer.x;
         light.y = pointer.y;

      });*/
   };


   update() {

   }

}




