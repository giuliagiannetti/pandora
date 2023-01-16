import Player from "../components/player.js"
import movingPlatform from "../components/movingPlatform.js"
import Porta from "../components/porta.js";
import Enemy from "../components/enemy.js";

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
        this.floorHeight = this.game.config.height - 100;
        this.worldWidth = 8500;
        //this.maxHearts = 4;
    }

    preload() {
        console.log("scene1 - Executing preload()");

        //giocatore
        const player_spritesheet_config = {
            frameWidth: 200,
            frameHeight: 340,
        };
        this.load.spritesheet("playerrun", "assets/images/characters/spritesheetmedio.png", player_spritesheet_config);

        //nemico
        const monster_spritesheet_config = {
            frameWidth: 1165,
            frameHeight: 563,
        };
        this.load.spritesheet("enemyrun", "assets/images/characters/enemy.png", monster_spritesheet_config);


        //immagini di sfondo
        //this.load.image("sfondo", "assets/images/background/rosso.png");
        this.load.image("parallax1", "assets/images/background/parallax1.png");
        this.load.image("parallax2", "assets/images/background/parallax2.png");
        this.load.image("parallax3", "assets/images/background/parallax3.png");
        this.load.image("parallax4", "assets/images/background/parallax4.png");

        //elementi della scena
        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("pavement", "assets/images/environment_elements/pavement.png"); //pavimento
        this.load.image("verticale", "assets/images/environment_elements/verticale.png"); //colonna verticale

        this.load.image("colonna", "assets/images/environment_elements/colonna.png");
        this.load.image("porta", "assets/images/environment_elements/casa/parete.png"); //porta
        this.load.image("blocco", "assets/images/environment_elements/blocco.png");//blocco architrave

        this.load.image("colonnaSpezzata", "assets/images/environment_elements/casa/colonna1.png");
        this.load.image("colonnaAppuntita", "assets/images/environment_elements/casa/colonna2.png");
        this.load.image("colonnaCasa", "assets/images/environment_elements/casa/colonna3.png");
        this.load.image("pavimento1", "assets/images/environment_elements/casa/pavimento1.png");
        this.load.image("pavimento2", "assets/images/environment_elements/casa/pavimento2.png");
        this.load.image("pavimento3", "assets/images/environment_elements/casa/pavimento3.png");
        this.load.image("scalino1", "assets/images/environment_elements/casa/scalino1.png");
        this.load.image("scalino2", "assets/images/environment_elements/casa/scalino2.png");
        this.load.image("scalino3", "assets/images/environment_elements/casa/scalino3.png");
        this.load.image("scalino4", "assets/images/environment_elements/casa/scalino4.png");

        this.load.image("moving", "assets/images/environment_elements/casa/scalino4.png");
        this.load.image("tetto", "assets/images/environment_elements/casa/tetto.png");
        this.load.image("tettoPlat", "assets/images/environment_elements/casa/tettoPlat.png");

        this.load.image("movingPlatform", "assets/images/environment_elements/trave.png"); //platform in movimento

        this.load.image("banco", "assets/images/environment_elements/banco.png"); //bancarella
        this.load.image("rimbalzante", "assets/images/environment_elements/rimbalzo.png");//piattaforma rimbalzante

        this.load.image("chiave", "assets/images/environment_elements/chiave3d.png"); //chiave
        this.load.image("chiaveContorno", "assets/images/environment_elements/chiave3dcontorno.png");
        this.load.image("piedistallo", "assets/images/environment_elements/piedistallo.png");
        this.load.image("piedistalloCheck", "assets/images/environment_elements/piedistalloCheck.png");


        //elementi hud
        this.load.image("chiaveicona", "assets/images/hud/chiaveicona.png"); //chiave icona
        this.load.image("life", "assets/images/hud/life.png");
        this.load.image("vaso", "assets/images/hud/vasopausa.png");
        this.load.image("menuPausa", "assets/images/hud/menuPausa.jpg");
        this.load.image("home", "assets/images/hud/home.png");
        this.load.image("play", "assets/images/hud/play.png");


    }

    create() {
        console.log("scene1 - Executing create()");


        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);

        //sfondo parallax
        this.background1 = this.add.tileSprite(0, 0, 1280, 2400, "parallax1");
        this.background1.setOrigin(0, 0.70);
        this.background1.setScrollFactor(0, 0.4);
        this.background2 = this.add.tileSprite(0, 0, 1280, 2400, "parallax2");
        this.background2.setOrigin(0, 0.70);
        this.background2.setScrollFactor(0, 0.4);
        this.background3 = this.add.tileSprite(0, 0, 1280, 2400, "parallax3");
        this.background3.setOrigin(0, 0.70);
        this.background3.setScrollFactor(0, 0.4);
        /*this.background4 = this.add.tileSprite(0, 0, 1280, 2400, "parallax4");
        this.background4.setOrigin(0, 0.698);
        this.background4.setScrollFactor(0,0.38);*/


        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 100, this.game.config.height - this.floorHeight,
            0x260907, 1);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);

        // Chiavi
        this.chiave = this.add.image(5000, -530, "chiave").setScale(0.2);
        this.chiaveContorno = this.add.image(5000, -530, "chiaveContorno").setScale(0.21).setAlpha(0.75).setBlendMode(Phaser.BlendModes.ADD);

        this.tweens.add({
            targets: this.chiaveContorno,
            alpha: 0,
            duration: 1500,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

        this.piedistallo = this.add.image(4920, -370, "piedistallo");
        this.piedistallo.setOrigin(0, 1).setScale(0.19);
        this.piedistalloCheck = this.add.image(4920, -370, "piedistalloCheck");
        this.piedistalloCheck.setOrigin(0, 1).setScale(0.19).setAlpha(0);

        this.piedistallo0 = this.add.image(3865, 500, "piedistallo");
        this.piedistallo0.setOrigin(0, 1).setScale(0.19);
        this.piedistalloCheck0 = this.add.image(3865, 500, "piedistalloCheck");
        this.piedistalloCheck0.setOrigin(0, 1).setScale(0.19).setAlpha(0);


        // Player
        const thePlayer = new Player(this, 680, 400, this.worldWidth - 100, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);
        this.playerHearts = this.game.gameState.lives;


        //enemy
        this.createEnemy();


        //piattaforme
        this.createMovingPlatforms();
        this.createJumpingPlatforms();
        this.createPorta();
        this.createColonnato();
        this.createCasa();
        

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setLerp(0.15, 0.15);
        this.cameras.main.setFollowOffset(0, 300);


        //HUD
        this.createHUD();
    }

    createEnemy() {
        const theEnemy = new Enemy(this, 7300, this.floorHeight);
        this.enemy = this.physics.add.existing(theEnemy);
        this.physics.add.collider(this.enemy, this.floor);
        this.enemy.body.allowGravity = false;

        this.overlapEnemy = this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);

        const followingEnemy = new Enemy(this, 5350, 200)
        this.playerEnemy = this.physics.add.existing(followingEnemy);
        this.playerEnemy.setScale(0.3);
        this.physics.add.collider(this.playerEnemy, this.floor);
        this.playerEnemy.body.allowGravity = false;

        this.overlapEnemyPlayer = this.physics.add.overlap(this.player, this.playerEnemy, this.hitEnemyPlayer, null, this);
    }


    createColonnato() {

        this.colonne = [];

        for (let i = 0; i < 3; i++) {
            let colonna = this.add.image(1850 + 250 * i, 433, "colonna");
            colonna.setScale(0.3);
            this.colonne.push(colonna);
        }


        this.architrave = [];
        let m = 54;

        for (let i = 0; i < 13; i++) {
            let blocco = this.add.image(1770 + m * i, 220, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }

        for (let i = 0; i < 5; i++) {
            let blocco = this.add.image(3300 + m * i, 220, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }

        for (let i = 0; i < 5; i++) {
            let blocco = this.add.image(970 + m * i, 500, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }

        for (let i = 0; i < 5; i++) {
            let blocco = this.add.image(1370 + m * i, 370, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }


        for (let i = 0; i < 4; i++) {
            let blocco = this.add.image(3850 + m * i, 500, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }

        this.colonnato = this.physics.add.group(this.architrave);
        this.colonnato.children.iterate(function (platform) {
            platform.body.allowGravity = false;
            platform.body.setImmovable(true);
        });

        this.physics.add.collider(this.architrave, this.player, () => {
            this.player.isJumping = false;
        })

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(3410, 433, 'colonna').setScale(0.3).refreshBody();//colonna

    }


    createCasa() {
        //casa1
        for (let i = 0; i < 4; i++) {
            let colonnaCasa = this.add.image(4900 + 270 * i, this.floorHeight, "colonnaCasa");
            colonnaCasa.setOrigin(0, 1).setScale(0.35);
        }
        this.colonnaSpezzata = this.add.image(6250, this.floorHeight, "colonnaSpezzata").setOrigin(0, 1).setScale(0.253);
        this.colonnaCasa = this.add.image(6520, this.floorHeight, "colonnaCasa").setOrigin(0, 1).setScale(0.35);

        this.pavimento1 = this.add.image(4850, 280, "pavimento1");
        this.pavimento1.setOrigin(0, 1);
        this.physics.add.existing(this.pavimento1, true);

        this.pavimento2 = this.add.image(5950, 280, "pavimento2");
        this.pavimento2.setOrigin(0, 1);
        this.physics.add.existing(this.pavimento2, true);


        this.pavimenti3 = [];

        for (let i = 0; i < 2; i++) {
            let pavimento3 = this.add.image(4900 + 1000 * i, -330 + 200 * i, "pavimento3");
            pavimento3.setOrigin(0, 1);
            this.pavimenti3.push(pavimento3);
        }

        this.pavimenti3Group = this.physics.add.staticGroup(this.pavimenti3);
        this.physics.add.collider(this.pavimenti3Group, this.player, () => {
            this.player.isJumping = false;
        })

        this.scalino = this.platforms.create(4950, 213, 'scalino2').setOrigin(0, 1).setScale(0.7).refreshBody();//scalino
        this.platforms.create(5000, 179, 'scalino3').setOrigin(0, 1).setScale(0.7).refreshBody();//scalino
        this.platforms.create(5050, 145, 'scalino3').setOrigin(0, 1).setScale(0.7).refreshBody();//scalino
        this.platforms.create(5100, 111, 'scalino4').setOrigin(0, 1).setScale(0.7).refreshBody();//scalino
        this.platforms.create(5150, 75, 'scalino4').setOrigin(0, 1).setScale(0.7).refreshBody();//scalino
        this.platforms.create(5600, -30, 'pavimento3').setScale(0.8).refreshBody();
        this.platforms.create(4700, -400, 'scalino3').setOrigin(0,1).refreshBody();//scalino dopo chiave
        this.platforms.create(4550, -450, 'scalino3').setOrigin(0,1).refreshBody();//scalino dopo chiave
        this.platforms.create(4300, -500, 'scalino2').setOrigin(0,1).refreshBody();//scalino dopo chiave
        this.platforms.create(4400, -550, 'colonnaCasa').setOrigin(0,1).setScale(0.35).refreshBody();//parete
        this.platforms.create(4850, -650, 'scalino4').setOrigin(0,1).refreshBody();

        this.scalinoTetto = this.platforms.create(5870, -530, 'scalino4').setOrigin(0, 1).refreshBody(); 
        this.scalinoTetto.flipX = true;
        this.tetto = this.platforms.create(5350, -650, 'tetto').setOrigin(0, 1).setScale(0.8).refreshBody(); //tetto
        this.platforms.create(5150, -650, 'tettoPlat').setScale(0.95).setOrigin(0, 1).refreshBody(); //piattaforma tetto
        this.platTetto = this.platforms.create(5840, -650, 'tettoPlat').setScale(0.95).setOrigin(0, 1).refreshBody();
        this.platTetto.flipX = true;//piattaforma tetto
        this.platforms.create(6250, -510, 'scalino4').setOrigin(0, 1).refreshBody(); //piattaforma tetto
        
        this.parete = this.platforms.create(6100, 210, 'colonnaCasa').setOrigin(0, 1).setScale(0.35).refreshBody();//parete
        this.parete = this.platforms.create(5980, -200, 'colonnaCasa').setOrigin(0, 1).setScale(0.35).refreshBody();//parete
        this.platforms.create(5984, this.floorHeight, 'colonnaCasa').setOrigin(0, 1).setScale(0.35).refreshBody();//parete


        //casa2
        this.platforms.create(6400, -350, 'scalino3').setOrigin(0, 1).refreshBody(); //piattaforma tetto
        this.platforms.create(6700, -70, 'pavimento1').setOrigin(0,1).refreshBody();
        this.platforms.create(7700, -70, 'pavimento3').setOrigin(0,1).refreshBody();
        this.platforms.create(7750, -140, 'colonnaSpezzata').setOrigin(0,1).setScale(0.235).refreshBody();
        this.platforms.create(7600, -140, 'colonnaCasa').setOrigin(0,1).setScale(0.35).refreshBody();
        this.platforms.create(6600, -15, 'scalino3').setOrigin(0,1).setScale(1.1).refreshBody();//pavimento
        this.platforms.create(6290, 115, 'scalino4').setOrigin(0, 1).setScale(0.9).refreshBody(); //piattaforma tetto
        this.platforms.create(7000, 350, 'scalino1').setOrigin(0,1).refreshBody();
        this.platforms.create(6600, 550, 'scalino4').setOrigin(0,1).setScale(0.8).refreshBody();
        this.platforms.create(6700, 490, 'scalino4').setOrigin(0,1).setScale(0.8).refreshBody();


        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });

        this.physics.add.collider(this.parete, this.playerEnemy);
        this.physics.add.collider(this.tetto, this.playerEnemy);
        this.physics.add.collider(this.pavimento1, this.playerEnemy);
        this.physics.add.collider(this.pavimento1, this.player, () => {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.pavimento2, this.player, () => {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {

        this.movingPlatforms = [];

        this.movingPlatforms.push(new movingPlatform(this, 3000, 220, "trave"));
        this.movingPlatforms.push(new movingPlatform(this, 5800, -290));

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

        let jumpingPlatform = this.add.rectangle(4450, 415, 250, 20, 0x00000, 0);
        this.jumpingPlatforms = this.physics.add.existing(jumpingPlatform);
        this.jumpingPlatforms.body.allowGravity = false;
        this.jumpingPlatforms.body.setImmovable(true);

        this.physics.add.collider(this.jumpingPlatforms, this.player, () => {
            if (this.player.body.touching.down) {
                this.player.body.setVelocityY(this.player.jumpSpeed - 100)
            };
        });

        this.banco = this.add.image(4300, this.floorHeight + 5, "banco");
        this.banco.setOrigin(0, 1).setScale(0.3);


    }


    createPorta() {

        this.porta = [];

        this.porta.push(new Porta(this, 5280, -750));

        this.portaGroup = this.physics.add.group(this.porta);
        this.portaGroup.children.iterate(function (porta) {
            porta.body.allowGravity = false;
            porta.body.setImmovable(true);
        });

        this.physics.add.collider(this.portaGroup, this.player, () => {
            this.player.isJumping = false;
        });

    }


    createHUD() {
        this.skillShow = this.add.circle(600, 30, 40, 0x2f1710);
        this.skillShow.setOrigin(0, 0);
        this.skillShow.setScrollFactor(0, 0);


        this.chiaveIcon1 = this.add.image(230, 30, "chiaveicona").setScale(0.7).setAlpha(0.3);
        this.chiaveIcon1.setOrigin(0, 0);
        this.chiaveIcon1.setScrollFactor(0, 0);


        this.lifeSpan = this.add.rectangle(30, 30, 180, 70, 0x2f1710).setOrigin(0, 0).setScrollFactor(0, 0);


        this.hearts = [];
        for (let i = 0; i < 3; i++) {
            let life = this.add.image(40 + 25.25 + 55 * i, 40 + 25.25, "life"); //i +25.25 sono per riposizionare la vita al centro della barra dato che ho settato il pivot in mezzo
            life.setScale(0.5);
            life.setOrigin(0.5, 0.5); //settato il pivot in mezzo per l'animazione
            life.setScrollFactor(0, 0);
            this.hearts.push(life);
        }


        this.pauseButton = this.add.image(1240, 30, "vaso");
        this.pauseButton.setOrigin(1, 0).setScale(0.25);
        this.pauseButton.setScrollFactor(0, 0);
        this.pauseButton.setInteractive();

    }


    update() {

        this.player.manageMovements();
        this.enemy.animateEnemy();
        this.followPlayer();

        this.animateBackground();

        this.movingPlatformGroup.children.iterate(function (platform) {
            platform.animateMovingPlatform();
        });

        this.checkSceneEnd();

        this.collectChiavi(this.player, this.chiave);

        this.pauseMenuBottons();

        this.checkpoint0();

        // Camera
        if (this.player.body.x < this.game.config.width / 2) {
            this.cameras.main.followOffset.x = -this.game.config.width/2 + this.player.body.x;
        }
        if (this.player.body.x > (this.worldWidth - this.game.config.width / 2)) {
            this.cameras.main.followOffset.x = -(this.worldWidth - this.game.config.width / 2) + this.player.body.x ;
        }
    }



    followPlayer() {
        let followedPlayer = this.player;
        let playerEnemy = this.playerEnemy;
        let enemyX = this.playerEnemy.body.x + this.playerEnemy.displayWidth / 2;
        let enemyY = this.playerEnemy.body.y + this.playerEnemy.displayHeight / 2;
        let playerY = this.player.body.y + this.player.displayHeight / 2;
        let playerX = this.player.body.x + this.player.displayWidth / 2;
        if (followedPlayer.body.x >= 5100 && followedPlayer.body.x <= 6100 && followedPlayer.body.y > -600 && followedPlayer.body.y < 220) {
            if (playerX > enemyX) {
                playerEnemy.body.setVelocityX(15);
                playerEnemy.flipX = true;
            }
            if (playerX < enemyX) {
                playerEnemy.body.setVelocityX(-15);
                playerEnemy.flipX = false;
            }
            if (playerY > enemyY) {
                playerEnemy.body.setVelocityY(19);
            }
            if (playerY < enemyY) {
                playerEnemy.body.setVelocityY(-19);
            }
        } else {
            playerEnemy.animateEnemyHouse();
            playerEnemy.returnToInitialY();
        }

    }

    hitEnemyPlayer() {
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
            this.scene.start("gameover1");
            this.scene.stop();
        } else {
            this.player.body.x = this.piedistallo0.x + 20;
            this.player.body.y = this.piedistallo0.y - 300;
            this.playerEnemy.x = this.playerEnemy.initialPosition;
            this.playerEnemy.y = this.playerEnemy.floorHeight;
            this.scene.resume(this.followPlayer);
            this.playerEnemy.body.setVelocityY(0);
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
            this.scene.start("gameover1");
        } else {
            this.player.body.x = this.chiave.x;
            this.player.body.y = this.chiave.y;
            this.scene.resume(this.collectChiavi);
        }

    }


    pauseMenuBottons() {

        this.pauseButton.on("pointerdown", () => {
            this.scene.pause();
            this.scene.launch("pause_menu", { sceneName: "scene1" });
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
        const shiftCameraMax = 100;
        if (this.player.body.y + this.player.height / 2 < startLineCamera) {
            this.cameras.main.followOffset.y = Math.max(300 - shiftCameraMax, 300 - (startLineCamera - (this.player.body.y + this.player.height / 2)));
            console.log(this.cameras.main.followOffset.y);
        }
    }


    collectChiavi() {
        let x_diff = Math.abs(this.player.x - this.chiave.x);
        let y_diff = Math.abs(this.player.y - this.chiave.y); 
        //let portaFermaY = this.portaGroup.y;
        let icon = this.chiaveIcon1;
        if (x_diff < 75 && y_diff < 100) {
            this.chiave.destroy();
            this.chiaveContorno.destroy();
            this.portaGroup.children.iterate(function (porta) { porta.movePorta(); });
            icon.setAlpha(1);
            this.playerEnemy.animateEnemyHouse();
            this.tweens.add({
                targets: this.piedistalloCheck,
                alpha: 1,
                ease: 'Linear',
                duration: 250
            });
        }
    }

    checkpoint0() {
        let x_diff0 = Math.abs(this.player.x - this.piedistallo0.x);
        let y_diff0 = Math.abs(this.player.y - this.piedistallo0.y); 
        //let portaFermaY = this.portaGroup.y;
        if (x_diff0 < 75 && y_diff0 < 100) {
            this.tweens.add({
                targets: this.piedistalloCheck0,
                alpha: 1,
                ease: 'Linear',
                duration: 250
            });
        }
    }


    checkSceneEnd() {
        if ( this.key0.isDown)
            //this.player.x >= this.worldWidth - 300)
            {
            this.scene.start("scene2");
        }
    }
}