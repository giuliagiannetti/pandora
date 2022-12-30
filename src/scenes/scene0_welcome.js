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
      this.load.image("background_base", "assets/images/background/scherminiz_render_bozza1.jpg");

      //componenti grafiche (button)
      this.load.image("bottoneGioca", "assets/images/buttons/BottoneGioca.png");
      this.load.image("bottoneStoria", "assets/images/buttons/BottoneStoria.png");
      this.load.image("bottoneCrediti", "assets/images/buttons/BottoneCrediti.png");

   };


   create() {
      console.log("scene0_welcome - Executing create()");



      //posizione degli elementi 
      this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "background_base");
      this.background.setOrigin(0.5, 0.5);

      this.background.setPipeline('Light2D').setAlpha(0.5);

      //immagine del bottone
      this.playbutton = this.add.image(300, 242, "bottoneGioca");
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
         this.scene.start("storie");
      });

      //bottone cliccabile 
      this.bottone_storia.on("pointerdown", () => {
         this.scene.start("storie");
      });

      //bottone cliccabile 
      this.bottone_crediti.on("pointerdown", () => {
         this.scene.start("scene_credits");
      });

      var light = this.lights.addLight(300, 300, 1300).setScrollFactor(0.0).setIntensity(3);

      this.lights.enable();
      this.lights.setAmbientColor(0xFFFFFF);

      this.input.on('pointermove', function (pointer) {

         light.x = pointer.x;
         light.y = pointer.y;

      });



   };


   update() {

   }

}




