export default class Porta extends Phaser.GameObjects.Sprite {

    portaY;
    portaX;
 
 

    constructor(scene, x, y) {
      
        super(scene, x, y, "porta");
        scene.add.existing(this);
        this.portaX = x;
        this.portaY = y;
        this.setScale(0.5);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
   

    }

    movePorta() {
        if (this.y >= this.portaY) {
            this.body.setVelocityY(-100);

        }
        if (this.y <= (this.portaY - 400)) {
            this.body.setVelocityY(100);
        }
        
    }


    
}