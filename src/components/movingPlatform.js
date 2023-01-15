export default class movingPlatform extends Phaser.GameObjects.Sprite {

    floorHeight;
    initialX;

    constructor(scene, x, y) {
        super(scene, x, y, "moving");
        scene.add.existing(this);
        this.initialX = x;
        this.floorHeight = y;
        this.setScale(0.9);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
    }

    animateMovingPlatform() {
        if (this.x >= this.initialX) {
            this.body.setVelocityX(-140);

        }
        if (this.x <= (this.initialX - 300)) {
            this.body.setVelocityX(140);
        }
    }


}

