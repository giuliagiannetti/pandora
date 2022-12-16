import Player from "../components/player.js"
import movingPlatform from "../components/movingPlatform.js"

export default class Scene1 extends Phaser.Scene {

    background;
    player;
    floorHeight;
    movingPlatform;

    constructor() {
        super("scene3");
    }

    init() {
        console.log("scene3 - Executing init()");
        this.floorHeight = this.game.config.height - 100;
        this.worldWidth = 3700;
    }

    preload() {
        console.log("scene3 - Executing preload()");

        this.load.image("polis2", "assets/images/background/sfondo_3.png") //sfondo: uno in primo piano, con platform, costruzioni principali

        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("pavement", "assets/images/environment_elements/pavement.png"); //pavimento
        this.load.image("movingPlatform", "assets/images/environment_elements/movingPlatform.png"); //platform in movimento

    }

    create() {
        console.log("scene3 - Executing create()");
                
       
        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);

        this.background = this.add.image(0, 0, "polis2");
        this.background.setOrigin(0, 0.55);
        this.background.setPipeline('Light2D').setAlpha(0.5);

        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 100, this.game.config.height - this.floorHeight,
            0x000000, 100);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);



        // Player
        const thePlayer = new Player(this, 100, this.floorHeight, this.worldWidth, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);



        // Imposta la camera per seguire i movimenti del giocatore lungo l'asse x
     
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 300);

     
        // Nemico


        // Inserisci delle piattaforme statiche
        this.createStaticPlatforms();
        this.createMovingPlatforms();

        this.playerLight = this.lights.addLight(0, 0, 600).setIntensity(2).setColor(0xFFFFE0);
        this.lights.enable();
        this.lights.setAmbientColor(0x11111);
    }


    
    createStaticPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti statici
        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(780, -20 , 'pavement').setScale(0.58).refreshBody();//pavimento
        this.platforms.create(600, 520, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1780, 260, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1000, -170, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(500, -310, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(2500, -40, 'platform1').setScale(0.4).refreshBody();

        //statua
        this.platforms.create(2400, 587, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(2500, 525, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(2800, 475 , 'pavement').setScale(0.2).refreshBody();//pavimento

        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {
        // Inserisci delle piattaforme in movimento
        this.movingPlatforms = [];
        //inserite le vostre piattaforme qua
        this.movingPlatforms.push(new movingPlatform(this, 1300, 380));
        this.movingPlatforms.push(new movingPlatform(this, 2210, 105));
    
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

        this.playerLight.x = this.player.body.x + 70;
        this.playerLight.y = this.player.body.y + 70;
    }


    animateBackground() {
        this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.background.tilePositionY = this.cameras.main.scrollY * 0.5;
        const startLineCamera = 400;
        const shiftCameraMax = 70;
        if (this.player.body.y + this.player.height / 2 < startLineCamera) {
            this.cameras.main.followOffset.y = Math.max(300 - shiftCameraMax, 300 - (startLineCamera - (this.player.body.y + this.player.height / 2)));
            console.log(this.cameras.main.followOffset.y);
        }
    }


    checkSceneEnd() {
        if (this.key0.isDown) {
            this.scene.start("good");
        }
    }


}