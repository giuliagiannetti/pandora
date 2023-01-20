export default class CreditsScene extends Phaser.Scene {

   background;

   constructor() {
      super("scene_credits")
   };

   init() {
      console.log("scene_credits - Executing init ()")
   };

   preload() {
      console.log("scene_credits - Executing preload ()");

      //assets
      this.load.image("indietro", "assets/images/buttons/indietro.png");

      //sfondo
      this.load.image("crediti", "assets/images/credits/crediti1.jpg");
   };


   create() {
      console.log("scene_credits - Executing create()");

      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "crediti");
      this.background.setOrigin(0.5, 0.5);

      this.indietroHome = this.add.image(200, 610, "indietro");
      this.indietroHome.setScale(0.7);
      this.indietroHome.setInteractive();

      this.indietroHome.on("pointerdown", ()=> {
         this.scene.start("scene0_welcome");
         this.scene.stop();
     })

   };


   update() {
      if (this.keySpace.isDown) {
         this.scene.start("scene0_welcome");
      }
   }
   


}
