export default class Player extends Phaser.GameObjects.Sprite {

    cursorKeys;
    keySpace;
    initialPosition;
    floorHeight;
    stepLength;     
    isJumping;      
    maxWidth;
    jumpSpeed;


    constructor(scene, x, y, maxWidth, jumpSpeed) {
		super(scene, x, y, "playerrun");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1); //pivot in basso a sinistra
        this.setScale(0.5);   

        this.isJumping = false; //di default il giocatore non sta saltando
        this.stepLength  = 20;
        this.maxWidth = maxWidth;
        this.jumpSpeed = jumpSpeed;

        this.cursorKeys = scene.input.keyboard.createCursorKeys();
        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.initAnimations();
    }


    //frame impostati su 0 non avendo ancora lo spritesheet
    initAnimations() {
        //animazione della corsa del personaggio tramite spritesheet
        this.anims.create({
            key: "playerMove",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 0, 
                end: 0,
            }),
            frameRate: 15, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        //animazione personaggio fermo
        this.anims.create({
            key: "playerStop",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 0, //frame con personagio fermo
                end: 0, 
            }),
            frameRate: 15,
            repeat: -1 
        });

        //salto del personaggio
        this.anims.create({
            key: "playerJump",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 0, //selezionare frame per salto
                end: 0, 
            }),
            frameRate: 15, 
            repeat: -1
        });

        this.anims.play("playerStop"); //facciamo partire l'animazione del personaggio, questa volta fermo
    }

    manageAnimations() {
        // Gestiamo separatamente le animazioni

        const curr_anim = this.anims.currentAnim.key;   //nome dell'animazione corrente, player jump/move/stop

        if (this.body.velocity.y != 0) {
            if (curr_anim != "playerJump") {
                this.anims.play("playerJump");
            }
        } else if (this.body.velocity.x != 0) {
            if (curr_anim != "playerMove") {
                this.anims.play("playerMove");
            }
            this.flipX = this.body.velocity.x < 0;
        } else {
            this.anims.play("playerStop");
        }
    }

    manageMovements() {
        //tasto freccia sinistra premuto + giocatore a destra del limite sinistro del quadro
        if (this.cursorKeys.left.isDown && this.x >= 0) {
            this.body.setVelocityX(-200); // Velocità per spostamento verso sinistra

        // tasto freccia destra premuto + giocatore a sinistra del limite sinistro del quadro
        } else if (this.cursorKeys.right.isDown && this.x <= this.maxWidth - this.displayWidth){
            this.body.setVelocityX(200);  // Velocità per spostamento verso destra

        } else {
            // nessun tasto premuto --> giocatore fermo rispetto a x
            this.body.setVelocityX(0); 
        }

        if (this.keySpace.isDown && (this.body.onFloor() || this.body.touching.down)) {
            if (!this.isJumping) {
                this.isJumping = true;
                this.body.setVelocityY(this.jumpSpeed); 
            }
        }

        if (this.keySpace.isDown && this.cursorKeys.left.isDown && (this.body.onFloor() || this.body.touching.down)) {
            if (!this.isJumping) {
                this.body.setVelocityY(this.jumpSpeed); 
            }}


        if (this.keySpace.isDown && this.cursorKeys.right.isDown && (this.body.onFloor() || this.body.touching.down)) {
            if (!this.isJumping) {
                this.body.setVelocityY(this.jumpSpeed); 
            }
        }

        // no keyspace premuto e personaggio con i piedi per terra: no salto oppure è stato già attuato
        if (this.keySpace.isUp && this.y >= this.floorHeight) {
            this.isJumping = false;
        }

        // Gestiamo le animazioni separatamente
        this.manageAnimations();

    }

    /* die() {
        this.x = this.initialPosition;
    }*/

}