
export default class movingPlatform extends Phaser.GameObjects.Sprite {

    floorHeight;
    initialX;
 
 

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
        super(scene, x, y, "movingPlatform");
        scene.add.existing(this);
        this.initialX = x;
        this.floorHeight = y;
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
   

    }

    animateMovingPlatform() {
        if (this.x >= this.initialX) {
            this.body.setVelocityX(-150);

        }
        if (this.x <= (this.initialX - 200)) {
            this.body.setVelocityX(150);
        }
    }


}

