import Player from "../components/player.js"
import movingPlatform from "../components/movingPlatform.js"

export default class Scene1 extends Phaser.Scene {

    background;
    player;
    floorHeight;
    movingPlatform;

    constructor() {
        super("scene1");
    }

    init() {
        console.log("scene1 - Executing init()");
        this.floorHeight = this.game.config.height - 30;
        this.worldWidth = 8000;
    }

    preload() {
        console.log("scene1 - Executing preload()");

        this.load.image("polis", "assets/images/background/tutorial.jpg") //sfondo: uno in primo piano, con platform, costruzioni principali

        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("movingPlatform", "assets/images/environment_elements/movingPlatform.png"); //platform in movimento

    }

    create() {
        console.log("scene1 - Executing create()");

        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);

        this.background = this.add.image(0, 0, "polis");
        this.background.setOrigin(0, 0.5);
        this.background.setScale(2);


        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth, this.game.config.height - this.floorHeight,
            0x000000, 100);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);

        // Player
        const thePlayer = new Player(this, 100, this.floorHeight, 10000);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);

        // Imposta la camera per seguire i movimenti del giocatore lungo l'asse x
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 330);

        // Nemico

        // Inserisci delle piattaforme statiche
        this.createStaticPlatforms();
        this.createMovingPlatforms();

    }


    
    createStaticPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti statici
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(1050, 470, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1500, 300, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(2000, 170, 'platform1').setScale(0.75).refreshBody();

        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {
        // Inserisci delle piattaforme in movimento
        this.movingPlatforms = [];
        //inserite le vostre piattaforme qua
        this.movingPlatforms.push(new movingPlatform(this, 2700, 400));
        this.movingPlatforms.push(new movingPlatform(this, 3500, 400));

        this.movingPlatformGroup = this.physics.add.group(this.movingPlatforms);
        this.movingPlatformGroup.children.iterate(function (platform) {
            platform.body.allowGravity = false;
            platform.body.setImmovable(true);
            platform.body.setFrictionX(1);

        });

        this.physics.add.collider(this.movingPlatformGroup, this.player, () => {
            this.player.isJumping = false;
        });
    }



    //createJumpingPlatforms
    // this.physics.add.collider(this.movingPlatforms, this.player, ()=> {
    // this.player.isJumping = true;});




    update() {
        // Azioni che vengono eseguite a ogni frame del gioco
        this.player.manageMovements();
        this.animateBackground();
        this.movingPlatformGroup.children.iterate(function (platform) {
            platform.animateMovingPlatform();
        });
    }


    animateBackground() {
        this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.background.tilePositionY = this.cameras.main.scrollY * 0.5;
        const startLineCamera = 400;
        const shiftCameraMax = 100;
        if (this.player.body.y + this.player.height / 2 < startLineCamera) {
            this.cameras.main.followOffset.y = Math.max(330 - shiftCameraMax, 330 - (startLineCamera - (this.player.body.y + this.player.height / 2)));
            console.log(this.cameras.main.followOffset.y);
        }
    }



    checkSceneEnd() {
        if (this.key0.isDown) {
            this.scene.start("scene2");
        }
    }
}