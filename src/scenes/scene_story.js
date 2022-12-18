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
      this.load.image("storia1", "assets/images/story/testo1.jpg");
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
