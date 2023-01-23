import Player from "../components/player.js"
import movingPlatform from "../components/movingPlatform.js"
import Hope from "../components/hope.js";
import Enemy from "../components/enemy.js";

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
        this.worldWidth = 3200;
        this.collectedChiavi = false;
        this.movedCancello = false;
    }

    preload() {
        console.log("scene3 - Executing preload()");
        
        this.load.image("traveTempio", "assets/images/environment_elements/traveTempio.png"); //pavimento
        this.load.image("movingPlatform", "assets/images/environment_elements/platform1.png"); //platform in movimento
        this.load.image("colonnaTempio", "assets/images/environment_elements/colonnaolimpo.png");

        this.load.image("parallax0", "assets/images/background/sfondo_luce.png");
        this.load.image("parallax01", "assets/images/background/parallax01.png");

        this.load.image("fuoco", "assets/images/environment_elements/fuoco.png");
        this.load.image("statua", "assets/images/environment_elements/statua.png");

        this.load.image("mask", "assets/images/environment_elements/mask1.png");

        this.load.image("cancello", "assets/images/environment_elements/cancello/cancello.png")
        this.load.image("portale", "assets/images/environment_elements/cancello/portale.png")
        this.load.image("speranza", "assets/images/environment_elements/cancello/speranza.png")

    }

    create() {
        console.log("scene3 - Executing create()");
                
       
        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        
        this.background0 = this.add.image(0,720, "parallax01");
        this.background0.setOrigin(0,1);
        this.background0 = this.add.image(0,720, "parallax01");
        this.background0.setOrigin(1,1);
        
        
        this.floor = this.add.rectangle(-700, this.game.config.height,
            this.worldWidth + 700, this.game.config.height - this.floorHeight,
            0x260907, 1);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);


        this.colonne = [];

        for (let i=0; i<20; i++) {
            let colonna = this.add.image(-600 + 300*i, this.floorHeight +5, "colonnaTempio");
            colonna.setOrigin(0,1).setScale(0.5);
            this.colonne.push(colonna);
        }


        this.fuoco = this.add.image(230, this.floorHeight, "fuoco");
        this.fuoco.setOrigin(0,1).setScale(0.3);
        this.physics.add.existing(this.fuoco, true);


        this.portale = this.add.image (3000 -80, -55, "portale").setOrigin(0,1).setScale(0.162, 0.2);
        this.portale1 = this.add.image (3140 -80, -55, "portale").setOrigin(0,1).setScale(0.162, 0.2);
        this.portale1.flipX = true;

        this.createCancello();


        this.chiave = this.add.image(570, -470, "chiave").setScale(0.2);

        this.piedistallo = this.add.image(500, -300, "piedistallo");
        this.piedistallo.setOrigin(0, 1).setScale(0.19);
        this.piedistalloCheck = this.add.image(500, -300, "piedistalloCheck");
        this.piedistalloCheck.setOrigin(0, 1).setScale(0.19).setAlpha(0);

        this.piedistallo0 = this.add.image(535, 530, "piedistallo");
        this.piedistallo0.setOrigin(0, 1).setScale(0.19);
        this.piedistalloCheck0 = this.add.image(535, 530, "piedistalloCheck");
        this.piedistalloCheck0.setOrigin(0, 1).setScale(0.19).setAlpha(0);

       
        // Player
        const thePlayer = new Player(this, 0, this.floorHeight, this.worldWidth, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);
        this.playerHearts = this.game.gameState.lives;


        // Nemico
        this.createEnemy();

        // Inserisci delle piattaforme statiche
        this.createStaticPlatforms();
        this.createMovingPlatforms();


        this.background = this.add.image(-100, 720, "parallax0");
        this.background.setOrigin(0, 1);
        this.background1 = this.add.image(-100, 720, "parallax0");
        this.background1.setOrigin(1, 1);


        this.background.setPipeline('Light2D').setAlpha(0.7);
        this.background1.setPipeline('Light2D').setAlpha(0.7);
        this.playerLight = this.lights.addLight(270, 510, 400).setIntensity(2);
        this.lights.enable();
        this.lights.setAmbientColor(0x000000);
        this.make.sprite({
            x: 0,
            y: 800,
            key: 'mask',
            add: true,
        });


        const TheHopeGlow = new Hope(this, 3050 -50, -55);
        this.hopeGlow = this.physics.add.existing(TheHopeGlow);
        this.hopeGlow.setAlpha(0.75).setBlendMode(Phaser.BlendModes.ADD);
        this.hopeGlow.body.allowGravity = false;
        

        this.tweens.add({
            targets: this.hopeGlow,
            alpha: 0,
            duration: 1500,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

        this.chiaveContorno = this.add.image(570, -470, "chiaveContorno").setScale(0.21).setAlpha(0.75).setBlendMode(Phaser.BlendModes.ADD);

        this.tweens.add({
            targets: this.chiaveContorno,
            alpha: 0,
            duration: 1500,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

        // Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 300);
        this.cameras.main.setLerp(0.1, 0.1);
        this.cameras.main.setDeadzone(0, 0);
        this.cameras.main.fadeIn(3000);

        //HUD
        this.createHUD();

    }

    createEnemy() {
        const theEnemy = new Enemy(this, 580, -50);
        this.enemy = this.physics.add.existing(theEnemy);
        this.physics.add.collider(this.enemy, this.floor);
        this.enemy.body.allowGravity = false;

        this.overlapEnemy = this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);

        const theEnemy1 = new Enemy(this, 1450, this.floorHeight)
        this.enemy1 = this.physics.add.existing(theEnemy1);
        this.physics.add.collider(this.enemy1, this.floor);
        this.enemy1.body.allowGravity = false;

        this.overlapEnemyPlayer = this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy1, null, this);
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
            let life = this.add.image(40 + 25.25 + 55 * i, 40 + 25.25, "life");
            life.setScale(0.5);
            life.setOrigin(0.5, 0.5);
            life.setScrollFactor(0, 0);
            this.hearts.push(life);
        }


        this.pauseButton = this.add.image(1240, 30, "vaso");
        this.pauseButton.setOrigin(1, 0).setScale(0.25);
        this.pauseButton.setScrollFactor(0, 0);
        this.pauseButton.setInteractive();

    }


    createCancello(){
        const TheHope = new Hope(this, 3050 -50, -55);
        this.hope = this.physics.add.existing(TheHope);
        this.hope.body.allowGravity = false;


        this.cancello = this.add.image(3000 -80, -55, "cancello").setScale(0.4).setOrigin(0,1);
        this.physics.add.existing(this.cancello, false);
        this.cancello.body.allowGravity = false;
        this.cancello.body.setImmovable(true);
        this.cancello.body.setVelocityY(0);

        this.cancello1 = this.add.image(3232 -30, -55, "cancello").setScale(0.4).setOrigin(1,1);
        this.cancello1.flipX = true;
        this.physics.add.existing(this.cancello1, false);
        this.cancello1.body.allowGravity = false;
        this.cancello1.body.setImmovable(true);
        this.cancello1.body.setVelocityY(0);


    }
    
    createStaticPlatforms() {
        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(0, 20, 'traveTempio').setOrigin(0,1).refreshBody();//pavimento
        this.platforms.create(0, 20, 'traveTempio').setOrigin(1,1).refreshBody();//pavimento
        this.platforms.create(2000, 20, 'traveTempio').setOrigin(0,1).refreshBody();//pavimento
        this.platforms.create(600, 520, 'scalino3').refreshBody();
        this.platforms.create(1400, 260, 'scalino3').refreshBody();
        this.platforms.create(2050, 390, 'scalino3').setOrigin(0,1).refreshBody();
        this.platforms.create(1900, 260, 'scalino4').setOrigin(0,1).setScale(0.9).refreshBody();
        this.platforms.create(1000, -170, 'scalino3').refreshBody();
        this.platforms.create(570, -310, 'scalino3').refreshBody();

        //ferma porta
        this.fermaPorta = this.add.rectangle(2890 -50, -55, 10, 10, 0x000000, 0);
        this.fermaPorta.setOrigin(0, 1);
        this.physics.add.existing(this.fermaPorta, true);
        this.physics.add.collider(this.fermaPorta, this.cancello, ()=> {
            this.cancello.setPosition(2902 -50, -55);
            this.cancello.body.stop();
            this.movedCancello = true;
         });
        
        this.fermaPorta1 = this.add.rectangle(3330 -60, -55, 10, 10, 0x000000, 0);
        this.fermaPorta1.setOrigin(0, 1);
        this.physics.add.existing(this.fermaPorta1, true);
        this.physics.add.collider(this.fermaPorta1, this.cancello1, ()=> {
            this.cancello1.setPosition(3268, -55);
            this.cancello1.body.stop();
            this.movedCancello = true;
          });
         

        //statua
        let statuaGradino = this.add.rectangle(2501, this.floorHeight - 135, 400,270, 0x000000, 0);
        statuaGradino.setOrigin(0,1);
        let statuaPav = this.add.rectangle(2400, this.floorHeight, 500,135, 0x000000, 0);
        statuaPav.setOrigin(0,1);
        let statuaPav1 = this.add.rectangle(2450, this.floorHeight - (135+270), 500,180, 0x000000, 0);
        statuaPav1.setOrigin(0,1);

        
        this.statuaBase = [statuaGradino, statuaPav, statuaPav1];
        this.statuabaseGroup = this.physics.add.staticGroup(this.statuaBase);
        this.physics.add.collider(this.statuabaseGroup, this.player, () => {
            this.player.isJumping = false;
        });


        this.statua = this.add.image(2300, this.floorHeight, "statua");
        this.statua.setOrigin(0,1);


        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {
      
        this.movingPlatforms = [];
        this.movingPlatforms.push(new movingPlatform(this, 1150, 380));
        this.movingPlatforms.push(new movingPlatform(this, 1890, 115));
    
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



    update() {
        this.player.manageMovements();
        this.animateBackground();
        this.movingPlatformGroup.children.iterate(function (platform) {
            platform.animateMovingPlatform();
        });

        this.collectFuoco();

        this.hope.animateHope();
        this.hopeGlow.animateHope();

        this.enemy.animateEnemy();
        this.enemy1.animateEnemy();

        this.collectChiavi(this.player, this.chiave);

        this.checkpoint0();

        this.pauseMenuBottons();

         // Camera
        if (this.player.body.x < this.game.config.width/2 ) {
            this.cameras.main.followOffset.x = -600 + this.player.body.x;
            this.cameras.main.deadzone.x = 100;
        } 
     
        if (this.player.body.x > (this.worldWidth - this.game.config.width / 2) ) {
            this.cameras.main.followOffset.x = -(this.worldWidth - this.game.config.width / 2) + this.player.body.x;
        } 

        this.moveCancello();

        this.checkSceneEnd();
    }

    collectFuoco() {
        if (this.player.y < this.fuoco.y) {
            this.playerLight.x = this.player.body.x + this.player.body.width/2;
            this.playerLight.y = this.player.body.y + this.player.body.height/2; 
            
        }
        if (this.player.x > this.fuoco.x) {
            this.playerLight.x = this.player.body.x + this.player.body.width/2;
            this.playerLight.y = this.player.body.y + this.player.body.height/2;  
 
        }
        
        if (this.player.x <= this.fuoco.x && this.player.y <= this.fuoco.y && this.player.y >= 400 ){
            this.playerLight.x = 270
            this.playerLight.y = 510;    
        }
    }

    animateBackground() {
        const startLineCamera = 500;
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
        if (x_diff < 110 && y_diff < 110) {
            this.chiave.destroy();
            this.chiaveContorno.destroy();
            //this.portaGroup.children.iterate(function (porta) { porta.movePorta(); });
            icon.setAlpha(1);
            this.tweens.add({
                targets: this.piedistalloCheck,
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
            this.scene.start("gameover3");
        } else { if (this.collectedChiavi) {
            this.player.x = this.chiave.x;
            this.player.y = this.chiave.y -10;
            this.scene.resume();
        } else {
            this.player.body.x = this.piedistalloCheck0.x;
            this.player.body.y = this.piedistalloCheck0.y -300;
            this.scene.resume();
        }
            
        }
    }

    hitEnemy1() {
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
            this.scene.start("gameover3");
        } else { if (this.collectedChiavi) {
            this.player.x = this.chiave.x;
            this.player.y = this.chiave.y -10;
            this.scene.resume();
        } else {
            this.player.body.x = this.piedistalloCheck0.x;
            this.player.body.y = this.piedistalloCheck0.y -200;
            this.scene.resume();
        }
            
        }

    }

    moveCancello() {
        let x_diff = Math.abs(this.player.x - this.hope.x);
        let y_diff = Math.abs(this.player.y - this.hope.y); 
        if (x_diff < 110 && y_diff < 110) {   
            if(this.collectedChiavi){
                let anta = this.cancello;
                let anta1 = this.cancello1;
                let antaX = this.cancello.body.x;
                let anta1X = this.cancello1.body.x;
                if (anta.body.x >= antaX) {
                    anta.body.setVelocityX(-50);
                }

                if (anta1.body.x >= anta1X) {
                    anta1.body.setVelocityX(50);
                }
            }
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

    pauseMenuBottons() {

        this.pauseButton.on("pointerdown", () => {
            this.scene.pause();
            this.scene.launch("pause_menu", { sceneName: "scene3" });
        });

    }

    checkSceneEnd() {
        if (this.collectedChiavi && this.movedCancello) {
            this.cameras.main.fadeOut(6000, 255, 255, 255, ()=> {
                this.scene.start("good_finale");
                this.scene.stop();
            });
            
        }
    }


}