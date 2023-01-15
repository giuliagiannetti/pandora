export default class Enemy extends Phaser.GameObjects.Sprite {

    initialPosition;
    floorHeight;
    stepLength;           
    maxWidth;


    constructor(scene, x, y /*, maxWidth*/) {
		super(scene, x, y, "enemyrun");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1); 
        this.setScale(0.4);
        /*this.stepLength = 15;
        this.maxWidth = maxWidth;*/

        //this.initAnimation();
    }
    
    /*initAnimation() {
        this.anims.create({
            key: "enemyMove",
            frames: this.anims.generateFrameNumbers("enemyrun", {
                start: 0, 
                end: 0,
            }),
            frameRate: 15,
            repeat: -1 
        });
    }*/

    animateEnemy() {
        if (this.x >= this.initialPosition) {
            this.body.setVelocityX(-180);
            this.flipX = false;

        }
        if (this.x <= (this.initialPosition - 500)) {
            this.body.setVelocityX(180);
            this.flipX = true;
        }

        if (this.y >= this.floorHeight){
            this.body.setVelocityY(-30);
        }

        if (this.y < this.floorHeight - 40){
            this.body.setVelocityY(30);
        }

}

    animateEnemyHouse(){
        if (this.x >= this.initialPosition) {
            this.body.setVelocityX(-100);
            this.flipX = false;
        }
        if (this.x <= (this.initialPosition - 100) ) {
            this.body.setVelocityX(100);
            this.flipX = true;
        }
    }

    animateEnemytempio (){
        if (this.x >= this.initialPosition) {
            this.body.setVelocityX(-100);
            this.body.setVelocityY(100);
            this.flipX = false;
        }
        if (this.x <= (this.initialPosition - 150) ) {
            this.body.setVelocityX(100);
            this.body.setVelocityY(-100);
            this.flipX = true;
        }
    }

}

