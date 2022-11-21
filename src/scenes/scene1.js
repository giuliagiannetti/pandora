import Player from "../components/player.js"

export default class Scene1 extends Phaser.Scene {

    background;       
    player;           
    floorHeight; 

    constructor() {
        super("scene1");
    }

    init() {
        console.log("scene1 - Executing init()");
        this.floorHeight = this.game.config.height - 30;
        this.worldWidth = 10000;
    }

    preload() {
        console.log("scene1 - Executing preload()");

        this.load.image("polis", "assets/images/background/polis.png") //sfondo: uno in primo piano, con platform, costruzioni principali

        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("platform2", "assets/images/environment_elements/platform1.png"); //platform in movimento

    }

    create() {
        console.log("scene1 - Executing create()");

        this.background = this.add.tileSprite(0, 0, 1280, 720, "polis"); //sfondo in secondo piano che si ripete, non 3D
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0, 0);


        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth, this.game.config.height - this.floorHeight,
            0x000000, 0);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);

        // Player
        const thePlayer = new Player(this, 100, this.floorHeight, 10000);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);

        // Imposta la camera per seguire i movimenti del giocatore lungo l'asse x
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0,this.game.config.height/2);
        // Nemico

        // Inserisci delle piattaforme
        this.createStaticPlatforms();
        this.createMovingPlatforms();
    }

    createStaticPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti statici
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(500, 500, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1500, 550, 'platform1').setScale(0.5).refreshBody();
         
        // Rendi le piattaforme "solide". Se il giocatore è su una piattaforma
        // allora il suo stato è "non sta saltando" (questo per riprodurre l'animazione
        // del giocatore fermo).
        this.physics.add.collider(this.platforms, this.player, ()=> {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti dinamici
        this.movingPlatforms = this.physics.add.group();
        this.movingPlatforms.create(2400, Phaser.Math.Between(this.game.config.height - 200, this.game.config.height - 500), 'platform2').setScale(0.5).refreshBody();
        this.movingPlatforms.children.iterate( function (platform) {
                platform.setImmovable(true);
                platform.body.allowGravity = false;
                platform.body.setVelocityX(Phaser.Math.Between(-100, 100)); //usare vecchio codice per impostare un movimento preciso tra due zone e la posizione
        });

        this.physics.add.collider(this.movingPlatforms, this.player, ()=> {
            this.player.isJumping = false;
        });

        //createJumpingPlatforms
        // this.physics.add.collider(this.movingPlatforms, this.player, ()=> {
        // this.player.isJumping = true;});

    }


    update() {
        this.player.manageMovements();
        this.animateBackground();
        this.randomPlatformsMovementChange();
    }

    animateBackground() {
        this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.cameras.main.followOffset.y = this.player.body.y + this.player.height/2 - this.game.config.height / 2;
    }

    randomPlatformsMovementChange() {
        this.movingPlatforms.children.iterate( function (platform) {
            if (Phaser.Math.Between(0, 100) == 50) {
                const updatedSpeed = Phaser.Math.Between(-100, 100);
                platform.body.setVelocityX(updatedSpeed);
            }
        });
    }

}