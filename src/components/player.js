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
        this.setOrigin(0, 1); 
        this.setScale(0.4);
        this.collectedFuoco = false;

        this.isJumping = false; 
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
                start: 1, 
                end: 6,
            }),
            frameRate: 10, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
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
                start: 3, //selezionare frame per salto
                end: 3, 
            }),
            frameRate: 15, 
            repeat: -1
        });


        //animazione per la torcia
        this.anims.create({
            key: "playerMove1",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 8, 
                end: 13,
            }),
            frameRate: 10,
            repeat: -1 
        });

        this.anims.create({
            key: "playerJump1",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 11, //selezionare frame per salto
                end: 11, 
            }),
            frameRate: 15, 
            repeat: -1
        });

        this.anims.create({
            key: "playerStop1",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 7, //frame con personagio fermo
                end: 7, 
            }),
            frameRate: 15,
            repeat: -1 
        });

        this.anims.play("playerStop"); //facciamo partire l'animazione del personaggio, questa volta fermo
    }

    manageAnimations() {
        // Gestiamo separatamente le animazioni

        const curr_anim = this.anims.currentAnim.key;  
        if (!this.collectedFuoco){
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
        }}

        else {
            if (this.body.velocity.y != 0) {
                if (curr_anim != "playerJump1") {
                    this.anims.play("playerJump1");
                }
            } else if (this.body.velocity.x != 0) {
                if (curr_anim != "playerMove1") {
                    this.anims.play("playerMove1");
                }
                this.flipX = this.body.velocity.x < 0;
            } else {
                this.anims.play("playerStop1");
            }}
    }

    manageMovements() {
        //tasto freccia sinistra premuto + giocatore a destra del limite sinistro del quadro
        if (this.cursorKeys.left.isDown && this.x >= 0) {
            this.body.setVelocityX(-250); // Velocità per spostamento verso sinistra
            this.flipX = true;

        // tasto freccia destra premuto + giocatore a sinistra del limite sinistro del quadro
        } else if (this.cursorKeys.right.isDown && this.x <= this.maxWidth - this.displayWidth){
            this.body.setVelocityX(250);  // Velocità per spostamento verso destra
            this.flipX = false;

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

    initAnimations1() {
        //animazione della corsa del personaggio tramite spritesheet
        this.anims.create({
            key: "playerMove",
            frames: this.anims.generateFrameNumbers("playerrun1", {
                start: 1, 
                end: 6,
            }),
            frameRate: 10, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

       
        //animazione personaggio fermo
        this.anims.create({
            key: "playerStop",
            frames: this.anims.generateFrameNumbers("playerrun1", {
                start: 0, //frame con personagio fermo
                end: 0, 
            }),
            frameRate: 15,
            repeat: -1 
        });

        //salto del personaggio
        this.anims.create({
            key: "playerJump",
            frames: this.anims.generateFrameNumbers("playerrun1", {
                start: 3, //selezionare frame per salto
                end: 3, 
            }),
            frameRate: 15, 
            repeat: -1
        });

        this.anims.play("playerStop"); //facciamo partire l'animazione del personaggio, questa volta fermo
    }

}