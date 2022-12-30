export default class StoryScene extends Phaser.Scene {

   background;

   constructor() {
      super("scene_story")
   };

   init() {
      console.log("scene_story - Executing init ()")
   };

   preload() {
      console.log("scene_story - Executing preload ()");

      //assets

      //sfondo
      this.load.image("storia1", "assets/images/story/testo_olimpogiusto.png");
      this.load.image("scena1", "assets/images/story/scena1.jpg");
      this.load.image("storia2", "assets/images/story/testo_maligiusto.png");
      this.load.image("scena2", "assets/images/story/scena2.jpg");
      this.load.image("storia3", "assets/images/story/testo_polis.png");
      this.load.image("scena3", "assets/images/story/scena3.jpg");
      this.load.image("preplatform", "assets/images/story/testo_preplatform_1.png");
   };


   create() {
      console.log("scene_story - Executing create()");

      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      //posizione degli elementi 
      this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "storia1");
      this.background.setOrigin(0.5, 0.5);

   };


   update() {
      if (this.keySpace.isDown) {
         this.scene.start("scene0_welcome");
      }
   }
   


}
