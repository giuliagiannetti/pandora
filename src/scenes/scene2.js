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
        this.load.image("cassa", "assets/images/environment_elements/cassa.png");
        this.load.image("cart", "assets/images/environment_elements/cart.png");

        this.load.image("sandalo", "assets/images/environment_elements/sandalo.png"); //sandali di hermes

    }

    create() {
        console.log("scene2 - Executing create()");


        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);


        //sfondo parallax
        this.background1 = this.add.tileSprite(0, 0, 1280, 2400, "parallax1");
        this.background1.setOrigin(0, 0.70);
        this.background1.setScrollFactor(0,0.4);
        this.background2 = this.add.tileSprite(0, 0, 1280, 2400, "parallax2");
        this.background2.setOrigin(0, 0.70);
        this.background2.setScrollFactor(0,0.4);
        this.background3 = this.add.tileSprite(0, 0, 1280, 2400, "parallax3");
        this.background3.setOrigin(0, 0.70);
        this.background3.setScrollFactor(0,0.4);
        this.background4 = this.add.tileSprite(0, 0, 1280, 2400, "parallax4");
        /*this.background4.setOrigin(0, 0.698);
        this.background4.setScrollFactor(0, 0.38);*/

        /*this.background = this.add.image(0, 0, "polis1");
        this.background.setOrigin(0, 0.55);*/


        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 100, this.game.config.height - this.floorHeight,
            0x260907, 100);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);

        //casse
        this.cassa1 = this.add.image(850, 200, "cassa");
        this.cassa1.setScale(0.18);
        this.cassa2 = this.add.image(1300, 70, "cassa");
        this.cassa2.setScale(0.27);
        this.cassa3 = this.add.image(1700, -75, "cassa");
        this.cassa3.setScale(0.18);
        

        // Player
        const thePlayer = new Player(this, 100, this.floorHeight, this.worldWidth, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);

        //sandali di Hermes
        this.sandalo = this.add.image(1700, -140, "sandalo");
        this.sandalo.setScale(0.08);
        this.physics.add.overlap(this.player, this.sandalo, this.collectSandalo, null, this);


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
        
        this.pauseButton = this.add.image(1240, 30, "vaso");
        this.pauseButton.setOrigin(1,0).setScale(0.25);
        this.pauseButton.setScrollFactor(0,0);
        this.pauseButton.setInteractive();

    }

    /*createEnemy() {
        const theEnemy = new Enemy(this, 7300, this.floorHeight);
        this.enemy = this.physics.add.existing(theEnemy);
        this.physics.add.collider(this.enemy, this.floor);
        
        this.overlapEnemy = this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);
    }*/

    createStaticPlatforms() {

        this.platforms = this.physics.add.staticGroup()
   
        let cassa1 = this.add.rectangle(850, 200, 130, 20, 0x00000, 0);
        let cassa2 = this.add.rectangle(1300, 70, 200, 20, 0x00000, 0);
        let cassa3 = this.add.rectangle(1700, -75, 130, 20, 0x00000, 0);
        let carretto = this.add.rectangle(900, 500, 300, 50, 0x00000, 0);
        this.casse = [cassa1, cassa2, cassa3, carretto];

        this.cassaGroup = this.physics.add.staticGroup(this.casse);

        //cart
        this.cart = this.add.image(750, this.floorHeight +2, "cart");
        this.cart.setOrigin(0,1).setScale(0.5);


        this.platforms.create(2750, -550, 'platform1').setScale(0.5).refreshBody(); //piattaforma chiave
        this.platforms.create(3100, -200, 'platform1').setScale(0.5).refreshBody(); //prima degli scalini --> vaso?
        this.platforms.create(3700, 40, 'platform1').setScale(0.5).refreshBody(); //prima degli scalini --> vaso?
        this.platforms.create(3900, 582, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4020, 520, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4120, 458, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4260, 396, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4380, 334, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(4900, 265, 'pavement').setScale(0.4).refreshBody();//pavimento

        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.cassaGroup, this.player, () => {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {

        this.movingPlatforms = [];
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



      createJumpingPlatforms(){             

        this.jumpingPlatform = [];
        
        for (let i=0; i<2; i++) {
            let jumpPlat = this.add.rectangle(440 + 2900*i, 415, 250, 20, 0x00000, 0);
            this.jumpingPlatform.push(jumpPlat);
        }
        
        this.jumpingPlatformGroup = this.physics.add.group(this.jumpingPlatform);
        this.jumpingPlatformGroup.children.iterate(function (platform) {
            platform.body.allowGravity = false;
            platform.body.setImmovable(true);
        });
    
        this.physics.add.collider(this.jumpingPlatformGroup, this.player, () => { if (this.player.body.touching.down) {
          this.player.body.setVelocityY(this.player.jumpSpeed - 100)};
      });

      this.banchi = [];

      for (let i=0; i<2; i++){
        let banco = this.add.image(290 + 2900*i, this.floorHeight + 5, "banco");
        banco.setOrigin(0,1).setScale(0.3);
        this.banchi.push(banco);
      } 
      
       
        
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

        this.pauseMenuBottons();

        if (this.player.body.x < this.game.config.width/2 ) {
            this.cameras.main.followOffset.x = -this.game.config.width/2 + this.player.body.x;
        } 
    }

    pauseMenuBottons(){

        this.pauseButton.on("pointerdown", ()=>{
            this.scene.pause();
            this.scene.launch("pause_menu", {sceneName: "scene2"});
        });
    }


    animateBackground() {
        this.background1.tilePositionX = this.cameras.main.scrollX * 0.05;
        this.background1.tilePositionY = this.cameras.main.scrollY * 0.05;
        this.background2.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.background2.tilePositionY = this.cameras.main.scrollY * 0.15;
        this.background3.tilePositionX = this.cameras.main.scrollX * 0.30;
        this.background3.tilePositionY = this.cameras.main.scrollY * 0.30;
        //this.background4.tilePositionX = this.cameras.main.scrollX * 0.50;
        //this.background4.tilePositionY = this.cameras.main.scrollY * 0.50;

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
        if (x_diff < 70 && y_diff < 100) {
            this.sandalo.destroy();
            this.player.jumpSpeed = -600;
        }
    }

    checkSceneEnd() {
        if (//(this.player.x >= this.game.config.width - this.player.displayWidth) &&
            this.key0.isDown) {
            this.scene.start("scene3");
        
        }
    }
}