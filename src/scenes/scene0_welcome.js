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

      //sfondo
      this.load.image("background_base", "assets/images/background/schermata_iniziale_render.jpg");

      //titolo
      this.load.image("titolo", "assets/images/text/titolo.png");

      //testo crediti
      this.load.image("testo_crediti", "assets/images/text/testoCrediti.png");

      //bottoni con immagini normali
      this.load.image("bottoneGioca", "assets/images/buttons/BottoneGioca.png");
      this.load.image("bottoneStoria", "assets/images/buttons/BottoneStoria.png");
      this.load.image("bottoneCrediti", "assets/images/buttons/BottoneCrediti.png");
      //bottoni con hover
      this.load.image("bottoneGioca_hover", "assets/images/buttons/bottoneGioca_hover.png");
      this.load.image("bottoneStoria_hover", "assets/images/buttons/bottoneStoria_hover.png");
      this.load.image("bottoneCrediti_hover", "assets/images/buttons/bottoneCrediti_hover.png");
      
   };


   create() {
      console.log("scene0_welcome - Executing create()");



      //posizione degli elementi 
      this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "background_base");
      this.background.setOrigin(0.5, 0.5);
      this.titolo = this.add.image(80, 55, "titolo");
      this.titolo.setOrigin(0, 0);
      this.titolo.setScale(1.03);
      this.testoCrediti = this.add.image(1010, 490, "testo_crediti");
      this.testoCrediti.setOrigin(0, 0);
      this.testoCrediti.setScale(0.25); 
   
      
      this.bottone_gioca = this.add.image(127,319,'bottoneGioca');
      this.bottone_storia = this.add.image(127,442,'bottoneStoria');
      this.bottone_crediti = this.add.image(127,565,'bottoneCrediti');
      this.bottone_gioca_hover = this.add.image(127,319,'bottoneGioca_hover');
      this.bottone_storia_hover = this.add.image(127,442,'bottoneStoria_hover');
      this.bottone_crediti_hover = this.add.image(127,564,'bottoneCrediti_hover');


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


      this.crediti = this.add.rectangle(127,565, 191, 81, 0x000000, 0);
      this.crediti.setOrigin(0,0);
      this.crediti.setInteractive();

      this.storia = this.add.rectangle(127,442, 191, 81, 0x000000, 0);
      this.storia.setOrigin(0,0);
      this.storia.setInteractive();

      this.gioca = this.add.rectangle(127,319, 191, 81, 0x000000, 0);
      this.gioca.setOrigin(0,0);
      this.gioca.setInteractive();

      

//effetto di hover con trasparenza
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




