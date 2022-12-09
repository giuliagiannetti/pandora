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

        this.load.image("polis", "assets/images/background/sfondo_2.png") //sfondo: uno in primo piano, con platform, costruzioni principali

        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("pavement", "assets/images/environment_elements/pavement.png"); //pavimento
        this.load.image("rimbalzante", "assets/images/environment_elements/rimbalzo.png");//piattaforma rimbalzante
        this.load.image("movingPlatform", "assets/images/environment_elements/movingPlatform.png"); //platform in movimento

    }

    create() {
        console.log("scene2 - Executing create()");
                
       
        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);

        this.background = this.add.image(0, 0, "polis");
        this.background.setOrigin(0, 0.55);
       


        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 100, this.game.config.height - this.floorHeight,
            0x000000, 100);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);

        // Player
        const thePlayer = new Player(this, 100, 160, this.worldWidth);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);


        // Imposta la camera per seguire i movimenti del giocatore lungo l'asse x
        
     
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 300);

        

        // Nemico

        // Inserisci delle piattaforme statiche
        this.createStaticPlatforms();
        this.createMovingPlatforms();
        this.createJumpingPlatforms();

    }


    
    createStaticPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti statici
        this.platforms = this.physics.add.staticGroup()
      
        this.platforms.create(137, 200, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1000, 480, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(850, 40, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1150, 50, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(1600, -130, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1500, 210, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(2750, -350, 'platform1').setScale(0.5).refreshBody();
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
        this.movingPlatforms.push(new movingPlatform(this, 2400, -230));
        
 
        
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

        this.jumpingPlatforms = this.physics.add.staticGroup()

        this.jumpingPlatforms.create(500, 330, 'rimbalzante').setScale(0.2).refreshBody();  
        this.jumpingPlatforms.create(3300, 230, 'rimbalzante').setScale(0.2).refreshBody();
        
        this.physics.add.collider(this.jumpingPlatforms, this.player, () => { if (this.player.body.touching.down) {
          this.player.body.setVelocityY(-500)};
      });
        
      }



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
        const shiftCameraMax = 70;
        if (this.player.body.y + this.player.height / 2 < startLineCamera) {
            this.cameras.main.followOffset.y = Math.max(300 - shiftCameraMax, 300 - (startLineCamera - (this.player.body.y + this.player.height / 2)));
            console.log(this.cameras.main.followOffset.y);
        }
    }



    checkSceneEnd() {
        if (this.key0.isDown) {
            this.scene.start("scene3");
        }
    }
}