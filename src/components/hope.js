export default class Hope extends Phaser.GameObjects.Sprite {

    initialPosition;
    floorHeight;
    stepLength;
    maxWidth;


    constructor(scene, x, y) {
        super(scene, x, y, "speranza");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1);
        this.setScale(0.38);
    }

    animateHope() {
        if (this.x >= this.initialPosition) {
            this.body.setVelocityX(-10);
            this.flipX = false;

        }
        if (this.x <= (this.initialPosition - 20)) {
            this.body.setVelocityX(10);
            this.flipX = true;
        }

        if (this.y >= this.floorHeight) {
            this.body.setVelocityY(-5);
        }

        if (this.y < this.floorHeight - 10) {
            this.body.setVelocityY(5);
        }

    }

}