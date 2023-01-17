export default class Porta extends Phaser.GameObjects.Sprite {

    portaY;
    portaX;
 
 

    constructor(scene, x, y) {
      
        super(scene, x, y, "porta");
        scene.add.existing(this);
        this.portaX = x;
        this.portaY = y;
        this.setScale(0.4);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setVelocityY(0);

    }

    movePorta() {
        if (this.y <= this.portaY) {
            this.body.setVelocityY(300);

        } else if (this.y >= (this.portaY + 255)) {
            this.body.setVelocityY(0);
        }
        
    }


    
}