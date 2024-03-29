export default class Enemy extends Phaser.GameObjects.Sprite {

    initialPosition;
    floorHeight;
    stepLength;
    maxWidth;


    constructor(scene, x, y) {
        super(scene, x, y, "enemyrun");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1);
        this.setScale(0.4);
    }

    animateEnemy() {
        if (this.x >= this.initialPosition) {
            this.body.setVelocityX(-180);
            this.flipX = false;

        }
        if (this.x <= (this.initialPosition - 500)) {
            this.body.setVelocityX(180);
            this.flipX = true;
        }

        if (this.y >= this.floorHeight) {
            this.body.setVelocityY(-30);
        }

        if (this.y < this.floorHeight - 40) {
            this.body.setVelocityY(30);
        }

    }

    animateEnemyHouse() {
        if (this.x >= this.initialPosition) {
            this.body.setVelocityX(-100);
            this.flipX = false;
        }
        if (this.x <= (this.initialPosition - 100)) {
            this.body.setVelocityX(100);
            this.flipX = true;
        }
    }

    returnToInitialY() {
        if (this.y >= this.initialPosition + 10 || this.y <= this.initialPosition - 10) {
            if (this.y <= this.initialPosition - 10) {
                this.body.setVelocityY(19)
            }
            if (this.y >= this.initialPosition + 10) {
                this.body.setVelocityY(- 19)
            }
        }else{
            this.body.setVelocityY(0)
        }
    }

    animateEnemytempio() {
        if (this.x >= this.initialPosition) {
            this.body.setVelocityX(-100);
            this.body.setVelocityY(100);
            this.flipX = false;
        }
        if (this.x <= (this.initialPosition - 200)) {
            this.body.setVelocityX(100);
            this.body.setVelocityY(-100);
            this.flipX = true;
        }
    }

}

