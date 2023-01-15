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
        this.worldWidth = 3200;
    }

    preload() {
        console.log("scene3 - Executing preload()");

        this.load.image("polis2", "assets/images/background/sfondo_3.png");

        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("traveTempio", "assets/images/environment_elements/traveTempio.png"); //pavimento
        this.load.image("movingPlatform", "assets/images/environment_elements/platform1.png"); //platform in movimento
        this.load.image("colonnaTempio", "assets/images/environment_elements/colonnaolimpo.png");

        this.load.image("parallax0", "assets/images/background/parallax0.png");
        this.load.image("parallax01", "assets/images/background/parallax01.png");

        this.load.image("fuoco", "assets/images/environment_elements/fuoco.png");
        this.load.image("statua", "assets/images/environment_elements/statua.png");

    }

    create() {
        console.log("scene3 - Executing create()");
                
       
        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        
        this.background0 = this.add.tileSprite(0, 0, 1280, 2400, "parallax01");
        this.background0.setOrigin(0, 0.70);
        this.background0.setScrollFactor(0,0.4);

        this.colonne = [];

        for (let i=0; i<20; i++) {
            let colonna = this.add.image(-600 + 300*i, this.floorHeight +5, "colonnaTempio");
            colonna.setOrigin(0,1).setScale(0.5);
            this.colonne.push(colonna);
        }

        
        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 150, this.game.config.height - this.floorHeight,
            0x260907, 1);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);


        this.fuoco = this.add.image(230, this.floorHeight, "fuoco");
        this.fuoco.setOrigin(0,1).setScale(0.3);
        this.physics.add.existing(this.fuoco, true);
       


        // Player
        const thePlayer = new Player(this, 100, this.floorHeight, this.worldWidth, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);


        // Nemico


        // Inserisci delle piattaforme statiche
        this.createStaticPlatforms();
        this.createMovingPlatforms();

        this.background = this.add.tileSprite(0, 0, 1280, 2400, "parallax0");
        this.background.setOrigin(0, 0.70);
        this.background.setScrollFactor(0,0.4);

        //this.background = this.add.image(0, 0, "polis2");
        //this.background.setOrigin(0, 0.55).setAlpha(0);

        /*this.darker = this.add.image(0, 0,  "darker");
        this.darker.setOrigin(0, 0.70);
        this.darker.setScrollFactor(0,0.4);
        this.darker.setAlpha(0.4);*/

        // Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 300);


        this.background.setPipeline('Light2D').setAlpha(0.7);
        this.playerLight = this.lights.addLight(270, 510, 850).setIntensity(2.8).setColor(0xffffff);
        this.lights.enable();
        //this.lights.setAmbientColor(0x000000);
        

    }


    
    createStaticPlatforms() {
        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(60, 20, 'traveTempio').setOrigin(0,1).refreshBody();//pavimento
        this.platforms.create(2000, 20, 'traveTempio').setOrigin(0,1).refreshBody();//pavimento
        this.platforms.create(600, 520, 'scalino3').refreshBody();
        this.platforms.create(1400, 260, 'scalino3').refreshBody();
        this.platforms.create(2050, 390, 'scalino3').setOrigin(0,1).refreshBody();
        this.platforms.create(1900, 260, 'scalino4').setOrigin(0,1).setScale(0.9).refreshBody();
        this.platforms.create(1000, -170, 'scalino3').refreshBody();
        this.platforms.create(570, -310, 'scalino3').refreshBody();
        

        //statua
        let statuaGradino = this.add.rectangle(2501, this.floorHeight - 135, 400,270, 0x000000, 0);
        statuaGradino.setOrigin(0,1);
        let statuaPav = this.add.rectangle(2400, this.floorHeight, 500,135, 0x000000, 0);
        statuaPav.setOrigin(0,1);
        
        this.statuaBase = [statuaGradino, statuaPav];
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

         // Camera
         if (this.player.body.x < this.game.config.width/2 ) {
            this.cameras.main.followOffset.x = -700 + this.player.body.x;
        } 
     
        if (this.player.body.x > 2650 ) {
            this.cameras.main.followOffset.x = -2710 + this.player.body.x;
        } 
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
        
        if (this.player.x <= this.fuoco.x && this.player.y <= this.fuoco.y){
            this.playerLight.x = 270;
            this.playerLight.y = 510;    
        }
    }


    animateBackground() {
        this.background0.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.background0.tilePositionY = this.cameras.main.scrollY * 0.5;

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