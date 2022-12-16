import Player from "../components/player.js"
import movingPlatform from "../components/movingPlatform.js"
import Porta from "../components/porta.js";

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
        this.worldWidth = 8426;
    }

    preload() {
        console.log("scene1 - Executing preload()");

        this.load.image("polis", "assets/images/background/tutorial.jpg") //sfondo: uno in primo piano, con platform, costruzioni principali

        this.load.image("platform1", "assets/images/environment_elements/platform1.png"); //platform statico
        this.load.image("pavement", "assets/images/environment_elements/pavement.png"); //pavimento
        this.load.image("verticale", "assets/images/environment_elements/verticale.png"); //colonna verticale
        this.load.image("porta", "assets/images/environment_elements/verticale.png"); //porta
        this.load.image("rimbalzante", "assets/images/environment_elements/rimbalzo.png");//piattaforma rimbalzante
        this.load.image("movingPlatform", "assets/images/environment_elements/movingPlatform.png"); //platform in movimento

        this.load.image("chiave", "assets/images/environment_elements/chiave.png"); //chiave
        this.load.image("chiaveicona", "assets/images/environment_elements/chiaveicona.png"); //chiave icona

    }

    create() {
        console.log("scene1 - Executing create()");
                
       
        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);


        this.background = this.add.image(0, 0, "polis");
        this.background.setOrigin(0, 0.55);
        this.background.setScale(2);


        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 100, this.game.config.height - this.floorHeight,
            0x000000, 100);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);


        // Player
        const thePlayer = new Player(this, 5000, 80, this.worldWidth, -400);
        
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);


        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 300);

        
        // Nemico


        // Chiavi
        this.chiave = this.add.image(5000, -450, "chiave").setScale(0.08);
        this.physics.add.overlap(this.player, this.chiave, this.collectChiavi);


        this.createStaticPlatforms();
        this.createMovingPlatforms();
        this.createJumpingPlatforms();
        this.createPorta();

        this.chiaveIcon1 = this.add.image(30, 30, "chiaveicona").setScale(0.5).setAlpha(0);
        this.chiaveIcon1.setOrigin(0,0);
        this.chiaveIcon1.setScrollFactor(0,0);

    }


    
    createStaticPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti statici
        this.platforms = this.physics.add.staticGroup()
        //this.platforms.create(800, 600, 'platform1').setScale(0.25).refreshBody();
        this.platforms.create(1080, 520, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(1500, 375, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(2100, 220, 'pavement').setScale(0.3).refreshBody();//architrave
        this.platforms.create(3400, 490, 'verticale').setScale(0.5).refreshBody();
        this.platforms.create(3400, 210, 'platform1').setScale(0.5).refreshBody();
        this.platforms.create(4000, 500, 'platform1').setScale(0.3).refreshBody();

       //casa1
        this.platforms.create(5490, 260, 'pavement').setScale(0.5).refreshBody();//pavimento
        this.platforms.create(5060, 184, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(5130, 122, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(5200, 60, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(5270, -2, 'platform1').setScale(0.4).refreshBody();//scalino
        this.chiavePlatform = this.platforms.create(5100, -350, 'platform1').setScale(0.7).refreshBody();//piattaforma chiave
        this.platforms.create(5600, -30, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(6000, -150, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(6100, -230, 'verticale').setScale(0.5).refreshBody();//parete
        this.platforms.create(5600, -680, 'pavement').setScale(0.4).refreshBody(); //tetto
        this.platforms.create(4750, -525, 'platform1').setScale(0.4).refreshBody();

        
        
      
       //casa2
        this.platforms.create(6700, -20, 'pavement').setScale(0.2).refreshBody();//pavimento
        this.platforms.create(7580, -20, 'pavement').setScale(0.2).refreshBody();//pavimento
        this.platforms.create(7859, 34, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(7939, 96, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(8019, 158, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(8099, 220, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(8317, 220, 'platform1').setScale(0.4).refreshBody();
      


        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });
    }

    createMovingPlatforms() {
        // Inserisci delle piattaforme in movimento
        this.movingPlatforms = [];
        //inserite le vostre piattaforme qua
        this.movingPlatforms.push(new movingPlatform(this, 3100, 200));
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


    createJumpingPlatforms(){             

          this.jumpingPlatforms = this.physics.add.staticGroup()

          this.jumpingPlatforms.create(4500, 415, 'rimbalzante').setScale(0.2).refreshBody();  
          
          this.physics.add.collider(this.jumpingPlatforms, this.player, () => { if (this.player.body.touching.down) {
            this.player.body.setVelocityY(-500)};
        });
          
    }

    createPorta(){
        
        this.porta = [];

        this.porta.push(new Porta(this, 5230, -750));
        
        this.portaGroup = this.physics.add.group(this.porta);
        this.portaGroup.children.iterate(function (porta) {
            porta.body.allowGravity = false;
            porta.body.setImmovable(true);
        });

        this.physics.add.collider(this.portaGroup, this.player, () => {
            this.player.isJumping = false;
        });

    }


    update() {

        this.player.manageMovements();

        this.animateBackground();

        this.movingPlatformGroup.children.iterate(function (platform) {
            platform.animateMovingPlatform();
        });


        this.checkSceneEnd();

        this.collectChiavi(this.player, this.chiave);
    }


    animateBackground() {
        this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.background.tilePositionY = this.cameras.main.scrollY * 0.5;
        const startLineCamera = 400;
        const shiftCameraMax = 100;
        if (this.player.body.y + this.player.height / 2 < startLineCamera) {
            this.cameras.main.followOffset.y = Math.max(300 - shiftCameraMax, 300 - (startLineCamera - (this.player.body.y + this.player.height / 2)));
            console.log(this.cameras.main.followOffset.y);
        }
    }


     
    collectChiavi() {
        let x_diff = Math.abs(this.player.x-this.chiave.x);
        let y_diff = Math.abs(this.player.y-this.chiave.y);
        //let portaFermaY = this.portaGroup.y;
        let icon = this.chiaveIcon1;
        if(x_diff < 75 && y_diff < 100) {
            this.chiave.destroy();
            this.portaGroup.children.iterate(function (porta) { porta.movePorta();});
            icon.setAlpha(1);
        }
    }



    checkSceneEnd() {
        if ((this.player.x >= this.game.config.width - this.player.displayWidth) && 
            this.key0.isDown) {
            this.scene.start("scene2");
        }
    }
}