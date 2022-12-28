import Player from "../components/player.js"
import movingPlatform from "../components/movingPlatform.js"

export default class Scene2 extends Phaser.Scene {

    background;
    player;
    floorHeight;
    movingPlatform;

    constructor() {
        super("scene2");
    }

    init() {
        console.log("scene2 - Executing init()");
        this.floorHeight = this.game.config.height - 100;
        this.worldWidth = 5424;
    }

    preload() {
        console.log("scene2 - Executing preload()");

        this.load.image("polis1", "assets/images/background/sfondo_2.png"); //sfondo: uno in primo piano, con platform, costruzioni principali

        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("pavement", "assets/images/environment_elements/pavement.png"); //pavimento
        this.load.image("rimbalzante", "assets/images/environment_elements/rimbalzo.png");//piattaforma rimbalzante
        this.load.image("movingPlatform", "assets/images/environment_elements/movingPlatform.png"); //platform in movimento

        this.load.image("sandalo", "assets/images/environment_elements/sandalo.png"); //sandali di hermes

    }

    create() {
        console.log("scene2 - Executing create()");


        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);

        /*this.background = this.add.image(0, 0, "polis1");
        this.background.setOrigin(0, 0.55);*/
        this.background = this.add.tileSprite(0, 0, 1280, 2400, "sfondo");
        this.background.setOrigin(0, 0.70);
        this.background.setScrollFactor(0,0.4);

        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 100, this.game.config.height - this.floorHeight,
            0x000000, 0);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);

        // Player
        const thePlayer = new Player(this, 100, this.floorHeight, this.worldWidth, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);

        //sandali di Hermes
        this.sandalo = this.add.image(1700, -135, "sandalo").setScale(0.08);
        this.physics.add.overlap(this.player, this.sandalo, this.collectSandalo);


        // Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 300);


        // Piattaforme
        this.createStaticPlatforms();
        this.createMovingPlatforms();
        this.createJumpingPlatforms();


        //enemy
        //this.createEnemy();

        
        //HUD
        this.createHUD();

    }

    createHUD() {
        this.skillShow = this.add.circle(600, 30, 40, 0x2f1710);
        this.skillShow.setOrigin(0,0);
        this.skillShow.setScrollFactor(0,0);


        this.chiaveIcon1 = this.add.image(230, 30, "chiaveicona").setScale(0.7).setAlpha(0.3);
        this.chiaveIcon1.setOrigin(0,0);
        this.chiaveIcon1.setScrollFactor(0,0);


        this.lifeSpan = this.add.rectangle(30, 30, 180, 70, 0x2f1710).setOrigin(0,0).setScrollFactor(0,0);

       
        this.hearts = [];
        for (let i=0; i<3; i++) {
            let life = this.add.image(40+55*i, 40, "life");
            life.setScale(0.5);
            life.setOrigin(0,0);
            life.setScrollFactor(0,0);
            this.hearts.push(life);}
        
      

        this.pausePanel = this.add.image(this.game.config.width/2, 100, "menuPausa");
        this.pausePanel.setOrigin(0.5,0).setScale(0.7);
        this.pausePanel.setVisible(false); 
        this.pausePanel.setScrollFactor(0,0);
        
        this.pauseButton = this.add.image(1240, 30, "vaso");
        this.pauseButton.setOrigin(1,0).setScale(0.25);
        this.pauseButton.setScrollFactor(0,0);
        this.pauseButton.setInteractive();
        
        this.pauseHome = this.add.image(510, 300, "home");
        this.pauseHome.setOrigin(0.5,0).setScale(0.2);
        this.pauseHome.setVisible(false); 
        this.pauseHome.setScrollFactor(0,0);
        this.pauseHome.setInteractive();

        this.pausePlay = this.add.image(770, 300, "play");
        this.pausePlay.setOrigin(0.5,0).setScale(0.18);
        this.pausePlay.setVisible(false); 
        this.pausePlay.setScrollFactor(0,0);
        this.pausePlay.setInteractive();
    }

    /*createEnemy() {
        const theEnemy = new Enemy(this, 7300, this.floorHeight);
        this.enemy = this.physics.add.existing(theEnemy);
        this.physics.add.collider(this.enemy, this.floor);
        
        this.overlapEnemy = this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);
        

        const followingEnemy = new Enemy(this, 5350, 200)
        this.playerEnemy = this.physics.add.existing(followingEnemy);
        this.playerEnemy.setScale(0.3);
        this.physics.add.collider(this.playerEnemy, this.floor);
        this.playerEnemy.body.allowGravity = false;

        this.overlapEnemyPlayer = this.physics.add.overlap(this.player, this.playerEnemy, this.hitEnemyPlayer, null, this);
    }*/

    createStaticPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti statici
        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(800, 500, 'platform1').setScale(0.4).refreshBody(); //carretto
        this.platforms.create(850, 200, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1300, 70, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(1700, -75, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(2750, -550, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(3800, 60, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(3900, 582, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4020, 520, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4120, 458, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4260, 396, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4380, 334, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4900, 265, 'pavement').setScale(0.4).refreshBody();//pavimento

        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {
        // Inserisci delle piattaforme in movimento
        this.movingPlatforms = [];
        //inserite le vostre piattaforme qua
        this.movingPlatforms.push(new movingPlatform(this, 2400, -350));



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



    createJumpingPlatforms() {

        this.jumpingPlatforms = this.physics.add.staticGroup()

        this.jumpingPlatforms.create(300, 370, 'rimbalzante').setScale(0.2).refreshBody();
        this.jumpingPlatforms.create(3300, 370, 'rimbalzante').setScale(0.2).refreshBody();

        this.physics.add.collider(this.jumpingPlatforms, this.player, () => {
            if (this.player.body.touching.down) {
                this.player.body.setVelocityY(this.player.jumpSpeed - 100)
            };
        });

    }



    update() {
        // Azioni che vengono eseguite a ogni frame del gioco
        this.player.manageMovements();
        this.animateBackground();
        this.movingPlatformGroup.children.iterate(function (platform) {
            platform.animateMovingPlatform();
        });

        this.collectSandalo(this.player, this.sandalo);

        this.checkSceneEnd();
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

    collectSandalo() {
        let x_diff = Math.abs(this.player.x - this.sandalo.x);
        let y_diff = Math.abs(this.player.y - this.sandalo.y);
        if (x_diff < 75 && y_diff < 100) {
            this.sandalo.destroy();
            this.player.jumpSpeed = -600;
        }
    }

    checkSceneEnd() {
        if ((this.player.x >= this.game.config.width - this.player.displayWidth) &&
            this.key0.isDown) {
            this.scene.start("scene3");
        
        }
    }
}