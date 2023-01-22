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
      this.bottone_crediti_hover = this.add.image(300,441,'bottoneCrediti_hover');


      //origini, interattività, trasparenza

      this.bottone_gioca_hover.setOrigin(0, 0);
      this.bottone_gioca_hover.setVisible(false);

      this.bottone_storia_hover.setOrigin(0, 0);
      this.bottone_storia_hover.setInteractive();
      this.bottone_storia_hover.setVisible(false);

      this.bottone_crediti_hover.setOrigin(0, 0);
      this.bottone_crediti_hover.setInteractive();
      this.bottone_crediti_hover.setVisible(false);

      this.bottone_gioca.setOrigin(0, 0);
      this.bottone_gioca.setVisible(true);

      this.bottone_storia.setOrigin(0, 0);
      this.bottone_storia.setInteractive();
      this.bottone_storia.setVisible(true);

      this.bottone_crediti.setOrigin(0, 0);
      this.bottone_crediti.setInteractive();
      this.bottone_crediti.setVisible(true);


      this.crediti = this.add.rectangle(300,442, 191, 81, 0x000000, 0);
      this.crediti.setOrigin(0,0);
      this.crediti.setInteractive();

      this.storia = this.add.rectangle(300,342, 191, 81, 0x000000, 0);
      this.storia.setOrigin(0,0);
      this.storia.setInteractive();

      this.gioca = this.add.rectangle(300,242, 191, 81, 0x000000, 0);
      this.gioca.setOrigin(0,0);
      this.gioca.setInteractive();

      

//bottoni interattivi con trasparenza
   this.gioca.on('pointerover',() => {
      this.bottone_gioca_hover.setVisible(true);
      this.bottone_gioca.setVisible(false);
   });

   this.gioca.on('pointerout',() => {
      this.bottone_gioca_hover.setVisible(false);
      this.bottone_gioca.setVisible(true);
   });

   this.storia.on('pointerover',() => {
      this.bottone_storia_hover.setVisible(true);
      this.bottone_storia.setVisible(false);
   });

   this.storia.on('pointerout',() => {
      this.bottone_storia_hover.setVisible(false);
      this.bottone_storia.setVisible(true);
   });

   this.crediti.on('pointerover',() => {
      this.bottone_crediti_hover.setVisible(true);
      this.bottone_crediti.setVisible(false);
   });

   this.crediti.on('pointerout',() => {
      this.bottone_crediti_hover.setVisible(false);
      this.bottone_crediti.setVisible(true);
   });

    //bottone cliccabile 
    this.gioca.on("pointerdown", () => {
      this.scene.start("scene1");
   });

   //bottone cliccabile 
   this.storia.on("pointerdown", () => {
      this.scene.start("storie");
   });

   //bottone cliccabile 
   this.crediti.on("pointerdown", () => {
      this.scene.start("scene_credits");
   });

   };


   update() {

   }

}




