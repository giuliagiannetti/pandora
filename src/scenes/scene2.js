import Player from "../components/player.js";
import Enemy from "../components/enemy.js";
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
        this.worldWidth = 5200;
        this.collectedChiavi = false;
    }

    preload() {
        console.log("scene2 - Executing preload()");

        this.load.image("cassa", "assets/images/environment_elements/cassa.png");
        this.load.image("cart", "assets/images/environment_elements/cart.png");
        this.load.image("scalino3", "assets/images/environment_elements/casa/scalino3.png");

        this.load.image("sandalo", "assets/images/weapons/sandali.png"); //sandali di hermes

        this.load.image("sandaloIcona", "assets/images/hud/sandaloIcona.png");
        this.load.image("chiave", "assets/images/environment_elements/chiave3d.png"); //chiave
        this.load.image("chiaveContorno", "assets/images/environment_elements/chiave3dcontorno.png");
        this.load.image("piedistallo", "assets/images/environment_elements/piedistallo.png");
        this.load.image("piedistalloCheck", "assets/images/environment_elements/piedistalloCheck.png");

        this.load.image("colonna", "assets/images/environment_elements/colonna.png");//colonna separatoria

        this.load.image("tempio", "assets/images/environment_elements/tempio.png");
        this.load.image("scalino", "assets/images/environment_elements/scalino.png");
        this.load.image("basamento", "assets/images/environment_elements/basamento.png");
        this.load.image("mela", "assets/images/environment_elements/mela.png");
        this.load.image("mela1", "assets/images/environment_elements/mela1.png");
        this.load.image("mela2", "assets/images/environment_elements/mela2.png");

        this.load.image("sfondo", "assets/images/background/sfondo_con_sole.png")
        this.load.image("parallax1", "assets/images/background/parallax1.png");
        this.load.image("parallax2", "assets/images/background/parallax2.png");

        this.load.image("tutorial3", "assets/images/tutorial/tutorial_3.png");

    }

    create() {
        console.log("scene2 - Executing create()");


        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);


        //sfondo parallax
        this.background0=this.add.image(0, 0, "sfondo");
		this.background0.setScrollFactor(0, 0.5);
        this.background0.setOrigin(0, 0.65)
        this.background1 = this.add.tileSprite(-3, 0, 2190, 2400, "parallax1");
        this.background1.setOrigin(0, 0.65);
        this.background1.setScrollFactor(0, 0.4);
        this.background2 = this.add.tileSprite(0, 0, 2190, 2400, "parallax2");
        this.background2.setOrigin(0, 0.65);
        this.background2.setScrollFactor(0, 0.4);


        this.floor = this.add.rectangle(-700, this.game.config.height,
            this.worldWidth + 700, this.game.config.height - this.floorHeight,
            0x260907, 1);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);


        //scritte per tutorial
        this.createTutorial();


        //sandali di Hermes
        this.sandalo = this.add.image(1900, -200, "sandalo");
        this.sandalo.setScale(0.15);


        //chiave
        this.chiave = this.add.image(3350, -845, "chiave").setScale(0.2);
        this.chiaveContorno = this.add.image(3350, -845, "chiaveContorno").setScale(0.21).setAlpha(0.75).setBlendMode(Phaser.BlendModes.ADD);

        this.tweens.add({
            targets: this.chiaveContorno,
            alpha: 0,
            duration: 1500,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

        //piedistallo
        this.piedistallo = this.add.image(1845, -40, "piedistallo");
        this.piedistallo.setOrigin(0, 1).setScale(0.19);
        this.piedistalloCheck = this.add.image(1845, -40, "piedistalloCheck");
        this.piedistalloCheck.setOrigin(0, 1).setScale(0.19).setAlpha(0);

        this.piedistallo0 = this.add.image(3270, -685, "piedistallo");
        this.piedistallo0.setOrigin(0, 1).setScale(0.19);
        this.piedistalloCheck0 = this.add.image(3270, -685, "piedistalloCheck");
        this.piedistalloCheck0.setOrigin(0, 1).setScale(0.19).setAlpha(0);


        //casse
        this.cassa1 = this.add.image(950, 200, "cassa");
        this.cassa1.setScale(0.19);
        this.cassa2 = this.add.image(1400, 70, "cassa");
        this.cassa2.setScale(0.28);
        this.cassa3 = this.add.image(2680, -560, "cassa");
        this.cassa3.setScale(0.19);
        this.cassa4 = this.add.image(3100, -290, "cassa");
        this.cassa4.setScale(0.19);
        this.cassa5 = this.add.image(2800, -90, "cassa");
        this.cassa5.setScale(0.19);
        this.cassa6 = this.add.image(2890, 120, "cassa");
        this.cassa6.setScale(0.19);
        this.cassa7 = this.add.image(2420, 400, "cassa");
        this.cassa7.setAngle(240).setScale(0.28);


        // Player
        const thePlayer = new Player(this, 4000, 0, this.worldWidth, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.player.body.setSize(195, 340);
        this.player.body.setOffset(-10, 30);
        this.physics.add.collider(this.player, this.floor);
        this.playerHearts = this.game.gameState.lives;
  

        // Camera
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setFollowOffset(0, 300);
        this.cameras.main.setDeadzone(0, 0);


        // Piattaforme
        this.createStaticPlatforms();
        this.createMovingPlatforms();
        this.createJumpingPlatforms();


        //mele
        this.mele = [];

        for (let i = 0; i < 3; i++) {
            let mela = this.add.image(750 + 310 * i, 50 - 100 * i, "mela");
            mela.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela);

            let mela1 = this.add.image(900 + 250 * i, 300 - 120 * i, "mela1");
            mela1.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela1);

            let mela2 = this.add.image(1000 + 280 * i, 100 - 100 * i, "mela2");
            mela2.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela2);

            let mela3 = this.add.image(2650 + 90 * i, -600 - 130 * i, "mela");
            mela3.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela3);

            let mela4 = this.add.image(2500 + 150 * i, -900 + 90 * i, "mela2");
            mela4.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela4);

            let mela5 = this.add.image(2750 + 150 * i, -230 + 210 * i, "mela");
            mela5.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela5);

            let mela6 = this.add.image(2820 + 120 * i, -200 - 150 * i, "mela");
            mela6.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela6);

            let mela7 = this.add.image(3200 - 100 * i, 10 - 90 * i, "mela");
            mela7.setOrigin(0, 1).setScale(0.1);
            this.mele.push(mela7);
        }


        //enemy
        this.createEnemy();


        //HUD
        this.createHUD();
    }

    createHUD() {
        this.skillShow = this.add.circle(this.game.config.width/2, 65, 40, 0x2f1710);
        this.skillShow.setOrigin(0.5, 0.5);
        this.skillShow.setScrollFactor(0, 0);

        this.sandaloIcon1 = this.add.image(this.game.config.width/2-1, 65, "sandaloIcona").setScale(0.55);
        this.sandaloIcon1.setOrigin(0.5, 0.5);
        this.sandaloIcon1.setScrollFactor(0, 0);

        this.sandaloIcon2 = this.add.image(this.game.config.width/2-1, 65, "sandalo").setScale(0.1).setAlpha(0);
        this.sandaloIcon2.setOrigin(0.5, 0.5);
        this.sandaloIcon2.setScrollFactor(0, 0);

        this.chiaveIcon1 = this.add.image(290, 66, "chiaveicona").setScale(0.45).setAlpha(0.3);
        this.chiaveIcon1.setOrigin(0.5, 0.5);
        this.chiaveIcon1.setScrollFactor(0, 0);

        this.lifeSpan = this.add.rectangle(140, 65, 180, 70, 0x2f1710).setOrigin(0.5, 0.5).setScrollFactor(0, 0);


        this.hearts = [];
        for (let i = 0; i < 3; i++) {
            let life = this.add.image(60 + 25.25 + 55 * i, 40 + 25.25, "life"); 
            life.setScale(0.5);
            life.setOrigin(0.5, 0.5);
            life.setScrollFactor(0, 0);
            this.hearts.push(life);
        }

        
        this.pauseButtonBorder = this.add.image(this.game.config.width-80, 65, "vasoBorder");
        this.pauseButtonBorder.setOrigin(0.5, 0.5).setScale(0.13);
        this.pauseButtonBorder.setScrollFactor(0, 0);

        this.pauseButton = this.add.image(this.game.config.width-80, 65, "vaso");
        this.pauseButton.setOrigin(0.5, 0.5).setScale(0.13);
        this.pauseButton.setScrollFactor(0, 0);
        this.pauseButton.setInteractive();

    }

    createTutorial(){
        this.tutorial3 = this.add.image(100, this.game.config.height/2 -100, "tutorial3");
        this.tutorial3.setOrigin(0, 0.5);
    }


    createEnemy() {
        const theEnemy = new Enemy(this, 2550, -340);
        this.enemy = this.physics.add.existing(theEnemy);
        this.enemy.body.setSize(400, 225);
        this.enemy.setScale(0.4);
        this.physics.add.collider(this.enemy, this.floor);
        this.enemy.body.allowGravity = false;

        this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);

        const EnemyTempio = new Enemy(this, 4080, -300);
        this.enemyTempio = this.physics.add.existing(EnemyTempio);
        this.enemyTempio.body.setSize(800, 450);
        this.physics.add.collider(this.enemyTempio, this.floor);
        this.enemyTempio.body.allowGravity = false;

        this.physics.add.overlap(this.player, this.enemyTempio, this.hitEnemyTempio, null, this);

        const EnemyTempio2 = new Enemy(this, 3480, 330);
        this.enemyTempio2 = this.physics.add.existing(EnemyTempio2);
        this.enemyTempio2.body.setSize(400, 225);
        this.enemyTempio2.setScale(0.4);
        this.physics.add.collider(this.enemyTempio2, this.floor);
        this.enemyTempio2.body.allowGravity = false;

        this.physics.add.overlap(this.player, this.enemyTempio2, this.hitEnemyTempio2, null, this);

    }

    createStaticPlatforms() {

        this.platforms = this.physics.add.staticGroup()

        let cassa1 = this.add.rectangle(950, 200, 130, 30, 0x00000, 0);
        let cassa2 = this.add.rectangle(1400, 70, 200, 30, 0x00000, 0);
        let cassa3 = this.add.rectangle(2680, -560, 130, 30, 0x00000, 0);
        let cassa4 = this.add.rectangle(3100, -290, 130, 30, 0x00000, 0);
        let cassa5 = this.add.rectangle(2800, -90, 130, 30, 0x00000, 0);
        let cassa6 = this.add.rectangle(2890, 120, 130, 30, 0x00000, 0);
        //cassa ribaltata
        let cassa7 = this.add.rectangle(2390, 350, 60, 60, 0x00000, 0);
        let cassa7Bis = this.add.rectangle(2440, 450, 50, 115, 0x00000, 0);

        let carretto = this.add.rectangle(1000, 500, 300, 50, 0x00000, 0);
        let carretto1 = this.add.rectangle(3430, -490, 300, 50, 0x00000, 0);


        this.casse = [cassa1, cassa2, cassa3, cassa4, cassa5, cassa6, cassa7, cassa7Bis, carretto, carretto1, /*carretto2, carretto2Bis*/ ];
        this.cassaGroup = this.physics.add.staticGroup(this.casse);

        //cart
        this.cart = this.add.image(850, this.floorHeight + 2, "cart");
        this.cart.setOrigin(0, 1).setScale(0.5);

        this.cart1 = this.add.image(3250, -430, "cart");
        this.cart1.flipY = true
        this.cart1.setOrigin(0, 1).setScale(0.5);

        
        this.platforms.create(2300, -10, 'colonnaSpezzata').setAngle(10).setScale(0.3).setOrigin(0,1).refreshBody();
        this.platforms.create(2250, 230, 'colonnaAppuntita').setAngle(-10).setScale(0.5).setOrigin(0,1).refreshBody();
        this.platforms.create(1800, -75, 'scalino3').setScale(1).setOrigin(0, 0).refreshBody(); //piattaforma sandali
        this.platforms.create(3200, -715, 'scalino3').setScale(1.2).setOrigin(0, 0).refreshBody(); //piattaforma 
        this.platforms.create(3650, 130, 'scalino3').setScale(0.8).setOrigin(0, 0).refreshBody(); //piattaforma male tempio

        let tempioPav = this.add.rectangle(4950, 290 - 230, 1000, 100, 0x000000, 0);
        tempioPav.setOrigin(0, 1);
        this.physics.add.existing(tempioPav, true);

        this.physics.add.collider(tempioPav, this.player, () => {
            this.player.isJumping = false;
        })

        this.tempio = this.add.image(4950, 350 - 230, "tempio");
        this.tempio.setOrigin(0, 1);

        this.scale = [];

        for (let i = 0; i < 4; i++) {
            let scalino = this.add.image(3900 + 250 * i, (this.floorHeight - 195) - 93 * i, "scalino");
            scalino.setOrigin(0, 1).setScale(0.9);
            this.scale.push(scalino);

            let scalino1 = this.add.image(4895 + 250 * i, (this.floorHeight - 195) - 93 * i, "scalino");
            scalino1.setOrigin(0, 1).setScale(0.9).setFlipX(true);
            this.scale.push(scalino1);
        }


        let basamento = this.add.image(3650, this.floorHeight, "basamento");
        basamento.setOrigin(0, 1).setScale(0.85);
        this.physics.add.existing(basamento, true);

        this.physics.add.collider(basamento, this.player, () => {
            this.player.isJumping = false;
        });

        this.scaleGroup = this.physics.add.staticGroup(this.scale);


        this.physics.add.collider(this.scaleGroup, this.player, () => {
            this.player.isJumping = false;
        });

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
        this.movingPlatforms.push(new movingPlatform(this, 3500, 330));

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

        this.jumpingPlatform = [];

        for (let i = 0; i < 2; i++) {
            let jumpPlat = this.add.rectangle(540 + 1300 * i, 415, 250, 20, 0x00000, 0);
            this.jumpingPlatform.push(jumpPlat);
        }

        this.jumpingPlatformGroup = this.physics.add.group(this.jumpingPlatform);
        this.jumpingPlatformGroup.children.iterate(function (platform) {
            platform.body.allowGravity = false;
            platform.body.setImmovable(true);
        });

        this.physics.add.collider(this.jumpingPlatformGroup, this.player, () => {
            if (this.player.body.touching.down) {
                this.player.body.setVelocityY(this.player.jumpSpeed - 100)
            };
        });

        this.banchi = [];

        for (let i = 0; i < 2; i++) {
            let banco = this.add.image(390 + 1300 * i, this.floorHeight, "banco");
            banco.setOrigin(0, 1).setScale(0.3);
            this.banchi.push(banco);
        }

    }


    update() {
        this.player.manageMovements();

        this.enemy.animateEnemy();
        this.enemyTempio.animateEnemy();
        this.enemyTempio2.animateEnemytempio();
        this.followPlayer();

        this.animateBackground();

        this.movingPlatformGroup.children.iterate(function (platform) {
            platform.animateMovingPlatform();
        });

        this.collectSandalo(this.player, this.sandalo);

        this.collectChiavi(this.player, this.chiave);

        this.checkSceneEnd();

        this.pauseMenuBottons();

        this.fadeOutTutorial();


        if (this.player.body.x < this.game.config.width / 2.5) {
            this.cameras.main.followOffset.x = -this.game.config.width / 2 + this.player.body.x;
            this.cameras.main.deadzone.x = 300;
        }

        if (this.player.body.x > (this.worldWidth - this.game.config.width / 1.5 + 300)) {
            this.cameras.main.followOffset.x = -(this.worldWidth - this.game.config.width / 1.5 + 300) + this.player.body.x;
        }
    }


    fadeOutTutorial(){
        if (this.player.x > this.tutorial3.x + 400) {
            this.tweens.add({
                targets: this.tutorial3,
                alpha: 0,
                ease: 'Linear',
                duration: 300
            });
        }

        if (this.player.x <= this.tutorial3.x + 400) {
            this.tweens.add({
                targets: this.tutorial3,
                alpha: 1,
                ease: 'Linear',
                duration: 300
            });
        }
    }

    pauseMenuBottons() {

        this.pauseButton.on("pointerdown", () => {
            this.scene.pause();
            this.scene.launch("pause_menu", { sceneName: "scene2" });
        });
    }

    animateBackground() {
        this.background1.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.background1.tilePositionY = this.cameras.main.scrollY * 0.05;
        this.background2.tilePositionX = this.cameras.main.scrollX * 0.20;
        this.background2.tilePositionY = this.cameras.main.scrollY * 0.15;

        const startLineCamera = 400;
        const shiftCameraMax = 150;
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
            this.sandaloIcon1.destroy();
            this.player.jumpSpeed = -600;
            this.tweens.add({
                targets: this.piedistalloCheck,
                alpha: 1,
                ease: 'Linear',
                duration: 250
            });
            this.tweens.add({
                targets: this.sandaloIcon2,
                alpha: 1,
                ease: 'Linear',
                duration: 250
            });
        }
    }


    collectChiavi() {
        let x_diff = Math.abs(this.player.x - this.chiave.x);
        let y_diff = Math.abs(this.player.y - this.chiave.y); 4
        let icon = this.chiaveIcon1;
        if (x_diff < 80 && y_diff < 100) {
            this.chiave.destroy();
            this.chiaveContorno.destroy();
            icon.setAlpha(1);
            this.tweens.add({
                targets: this.piedistalloCheck0,
                alpha: 1,
                ease: 'Linear',
                duration: 250
            });
            this.collectedChiavi = true;
        }
    }



    hitEnemy() {
        this.playerHearts -= 1;
        this.currentHeart = this.hearts[this.playerHearts];
        var heartFade = this.tweens.add({
            targets: this.currentHeart,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        });


        if (this.playerHearts <= 0) {
            this.scene.start("gameover2");
        } else {
            if (this.collectedChiavi){
                this.player.body.x = this.chiave.x + 10;
                this.player.body.y = this.chiave.y - 150;
            } else {
                this.player.body.x = this.sandalo.x - 10;
                this.player.body.y = this.sandalo.y - 100;
            } 
        }
    }

    hitEnemyTempio() {
        this.playerHearts -= 1;
        this.currentHeart = this.hearts[this.playerHearts];
        var heartFade = this.tweens.add({
            targets: this.currentHeart,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        });


        if (this.playerHearts <= 0) {
            this.scene.start("gameover2");
        } else {
            if (this.collectedChiavi){
                this.player.body.x = this.chiave.x + 10;
                this.player.body.y = this.chiave.y - 150;
            } else {
                this.player.body.x = this.sandalo.x - 10;
                this.player.body.y = this.sandalo.y - 100;
            } 
        }

    }

    hitEnemyTempio2() {
        this.playerHearts -= 1;
        this.currentHeart = this.hearts[this.playerHearts];
        var heartFade = this.tweens.add({
            targets: this.currentHeart,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        });


        if (this.playerHearts <= 0) {
            this.scene.start("gameover2");
        } else {
            if (this.collectedChiavi){
                this.player.body.x = this.chiave.x + 10;
                this.player.body.y = this.chiave.y - 150;
            } else {
                this.player.body.x = this.sandalo.x - 10;
                this.player.body.y = this.sandalo.y - 100;
            } 
        }

    }


    followPlayer() {
        let followedPlayer = this.player;
        let enemyTempio = this.enemyTempio;
        let enemyX = this.enemyTempio.body.x + this.enemyTempio.displayWidth / 2;
        let enemyY = this.enemyTempio.body.y + this.enemyTempio.displayHeight / 2;
        let playerY = this.player.body.y + this.player.displayHeight / 2;
        let playerX = this.player.body.x + this.player.displayWidth / 2;
        if (followedPlayer.body.x >= 3530 && followedPlayer.body.x <= 4900 && followedPlayer.body.y > -900 && followedPlayer.body.y < -170) {
            if (playerX >= enemyX) {
                enemyTempio.body.setVelocityX(260);
                enemyTempio.flipX = true;
            }
            if (playerX < enemyX) {
                enemyTempio.body.setVelocityX(-260);
                enemyTempio.flipX = false;
            }
            if (playerY >= enemyY) {
                enemyTempio.body.setVelocityY(180);
            }
            if (playerY < enemyY) {
                enemyTempio.body.setVelocityY(-180);
            }
        } else {
            enemyTempio.animateEnemy();
        }

    }

    checkSceneEnd() {
        if (this.player.x >= (this.worldWidth - this.player.body.width) && this.collectedChiavi) {
            this.scene.start("scene3");

        }
    }
}