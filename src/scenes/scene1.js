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
        this.worldWidth = 8426;
        this.maxHearts = 4;
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
        this.load.image("porta", "assets/images/environment_elements/verticale.png"); //porta
        this.load.image("blocco", "assets/images/environment_elements/blocco.png")//blocco architrave
        this.load.image("rimbalzante", "assets/images/environment_elements/rimbalzo.png");//piattaforma rimbalzante
        this.load.image("movingPlatform", "assets/images/environment_elements/trave.png"); //platform in movimento
        this.load.image("chiave", "assets/images/environment_elements/chiave.png"); //chiave
        this.load.image("banco", "assets/images/environment_elements/banco.png"); //bancarella

     //elementi hud
        this.load.image("chiaveicona", "assets/images/hud/chiaveicona.png"); //chiave icona
        this.load.image("life", "assets/images/hud/life.png");
        this.load.image("vaso", "assets/images/hud/vasopausa.png");
        this.load.image("menuPausa", "assets/images/hud/menuPausa.jpg");
        this.load.image("home","assets/images/hud/home.png");
        this.load.image("play", "assets/images/hud/play.png");


    }

    create() {
        console.log("scene1 - Executing create()");


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
        this.background4.setOrigin(0, 0.698);
        this.background4.setScrollFactor(0,0.4);


        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth + 100, this.game.config.height - this.floorHeight,
            0xFFFFFF, 0);
        this.floor.setOrigin(0, 1);
        this.physics.add.existing(this.floor, true);


        // Player
        const thePlayer = new Player(this, 200, this.floorHeight, this.worldWidth, -400);
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);
        this.playerHearts = this.maxHearts;
       
       

        //enemy
        this.createEnemy();

        //piattaforme
        this.createStaticPlatforms();
        this.createMovingPlatforms();
        this.createJumpingPlatforms();
        this.createPorta();
        this.createColonnato();


        // Chiavi
        this.chiave = this.add.image(5000, -490, "chiave").setScale(0.08);
        //this.physics.add.overlap(this.player, this.chiave, this.collectChiavi, null, this);
        this.piedistallo = this.add.rectangle(5000, -420, 80, 40, 0x000000);
        

// ho spostato la camera nell'update per fare in modo che segua il giocatore solo dopo un certo punto
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 300);

        //HUD
        this.createHUD();
    }
    
    createEnemy() {
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
    }


    createColonnato(){

        this.colonne = [];

        for (let i=0; i<3; i++) {
            let colonna = this.add.image(1850+250*i, 433, "colonna");
            colonna.setScale(0.3);
            this.colonne.push(colonna);
        }


        this.architrave = [];
        let m = 54;
        
        for (let i=0; i<13; i++) {
            let blocco = this.add.image(1770+m*i, 220, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }
        
        for (let i=0; i<5; i++) {
            let blocco = this.add.image(3300+m*i, 220, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }

        for (let i=0; i<5; i++) {
            let blocco = this.add.image(970+m*i, 500, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);
        }

        for (let i=0; i<5; i++) {
            let blocco = this.add.image(1370+m*i, 370, "blocco");
            blocco.setScale(0.1);
            this.architrave.push(blocco);

    
        for (let i=0; i<4; i++) {
            let blocco = this.add.image(3850+m*i, 500, "blocco");
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
    }
}


    createStaticPlatforms() {
        // Aggiungi le piattaforme come un gruppo di oggetti statici
        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(3410, 433, 'colonna').setScale(0.3).refreshBody();//colonna

       //casa1
        this.pavimento = this.platforms.create(5490, 260, 'pavement').setScale(0.5).refreshBody();//pavimento
        this.scalino = this.platforms.create(5060, 184, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(5130, 122, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(5200, 60, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(5270, -2, 'platform1').setScale(0.4).refreshBody();//scalino
        this.chiavePlatform = this.platforms.create(5100, -350, 'platform1').setScale(0.7).refreshBody();//piattaforma chiave
        this.platforms.create(5600, -30, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(6000, -150, 'platform1').setScale(0.4).refreshBody();
        this.parete = this.platforms.create(6100, -230, 'verticale').setScale(0.5).refreshBody();//parete
        this.tetto = this.platforms.create(5600, -680, 'pavement').setScale(0.4).refreshBody(); //tetto
        this.platforms.create(4750, -525, 'platform1').setScale(0.4).refreshBody();
      
       //casa2
        this.platforms.create(6700, -20, 'pavement').setScale(0.2).refreshBody();//pavimento
        this.platforms.create(7580, -20, 'pavement').setScale(0.2).refreshBody();//pavimento
        this.platforms.create(7859, 34, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(7939, 96, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(8019, 158, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(8099, 220, 'platform1').setScale(0.4).refreshBody();//scalino
        this.platforms.create(8317, 220, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(7200, 300, 'platform1').setScale(0.5).refreshBody();

        this.physics.add.collider(this.platforms, this.player, () => {
            this.player.isJumping = false;
        });

        this.physics.add.collider(this.parete, this.playerEnemy);
        this.physics.add.collider(this.tetto, this.playerEnemy);
        this.physics.add.collider(this.pavimento, this.playerEnemy);


    }


    createMovingPlatforms() {

        this.movingPlatforms = [];

        this.movingPlatforms.push(new movingPlatform(this, 3000, 220));
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

          let jumpingPlatform = this.add.rectangle(4450, 415, 250, 20, 0x00000, 0);
          this.jumpingPlatforms = this.physics.add.existing(jumpingPlatform);
          this.jumpingPlatforms.body.allowGravity = false;
          this.jumpingPlatforms.body.setImmovable(true);
      
          this.physics.add.collider(this.jumpingPlatforms, this.player, () => { if (this.player.body.touching.down) {
            this.player.body.setVelocityY(this.player.jumpSpeed - 100)};
        });

        this.banco = this.add.image(4300, this.floorHeight, "banco");
        this.banco.setOrigin(0,1).setScale(0.3);
         
          
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
    

    createHUD() {
        this.skillShow = this.add.circle(600, 30, 40, 0x2f1710);
        this.skillShow.setOrigin(0,0);
        this.skillShow.setScrollFactor(0,0);


        this.chiaveIcon1 = this.add.image(230, 30, "chiaveicona").setScale(0.7).setAlpha(0.3);
        this.chiaveIcon1.setOrigin(0,0);
        this.chiaveIcon1.setScrollFactor(0,0);


        /*this.chiaviIcons = [];
        for (let i=0; i<3; i++) {
            let chiave = this.add.image(355-60*i, 30, "chiaveicona");
            chiave.setScale(0.7);
            chiave.setOrigin(0,0);
            chiave.setAlpha(0.3);
            chiave.setScrollFactor(0,0);
            this.chiaviIcons.push(chiave);}*/


        this.lifeSpan = this.add.rectangle(30, 30, 180, 70, 0x2f1710).setOrigin(0,0).setScrollFactor(0,0);

       
        this.hearts = [];
        for (let i=0; i<3; i++) {
            let life = this.add.image(40 + 25.25 +55*i, 40 + 25.25, "life"); //i +25.25 sono per riposizionare la vita al centro della barra dato che ho settato il pivot in mezzo
            life.setScale(0.5);
            life.setOrigin(0.5,0.5); //settato il pivot in mezzo per l'animazione
            life.setScrollFactor(0,0);
            this.hearts.push(life);}
        
        
        this.pauseButton = this.add.image(1240, 30, "vaso");
        this.pauseButton.setOrigin(1,0).setScale(0.25);
        this.pauseButton.setScrollFactor(0,0);
        this.pauseButton.setInteractive();

        
        /*this.pausePanel = this.add.image(this.game.config.width/2, 100, "menuPausa");
        this.pausePanel.setOrigin(0.5,0).setScale(0.7);
        this.pausePanel.setVisible(false); 
        this.pausePanel.setScrollFactor(0,0);
        
        this.pauseHome = this.add.image(510, 300, "home");
        this.pauseHome.setOrigin(0.5,0).setScale(0.2);
        this.pauseHome.setVisible(false); 
        this.pauseHome.setScrollFactor(0,0);
        this.pauseHome.setInteractive();

        this.pausePlay = this.add.image(770, 300, "play");
        this.pausePlay.setOrigin(0.5,0).setScale(0.18);
        this.pausePlay.setVisible(false); 
        this.pausePlay.setScrollFactor(0,0);
        this.pausePlay.setInteractive();*/
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

         // Camera
         if (this.player.body.x < this.game.config.width/2 ) {
            this.cameras.main.followOffset.x = -this.game.config.width/2 + this.player.body.x;
        } 

    }
    
    

    followPlayer(){
        let followedPlayer = this.player;
        let playerEnemy = this.playerEnemy;
        let enemyX = this.playerEnemy.body.x + this.playerEnemy.displayWidth/2 + 10;
        let enemyY = this.playerEnemy.body.y + this.playerEnemy.displayHeight/2 + 50;
        if (followedPlayer.body.x >= 5100 && followedPlayer.body.x <= 6100 && followedPlayer.body.y > -600 && followedPlayer.body.y < 220){
        if(followedPlayer.body.x > enemyX) {
            playerEnemy.body.setVelocityX(15);
        }
        if(followedPlayer.body.x < enemyX) {
            playerEnemy.body.setVelocityX(-15);
        }
        if(followedPlayer.body.y > enemyY) {
            playerEnemy.body.setVelocityY(19);
        }
        if(followedPlayer.body.y < enemyY) {
            playerEnemy.body.setVelocityY(-19);
        }
        } else {playerEnemy.animateEnemyHouse();
        }
        
    }

    hitEnemyPlayer () {
        this.playerHearts -= 1;
        this.currentHeart = this.hearts[this.playerHearts - 1];
        var heartFade = this.tweens.add({  
            targets: this.currentHeart,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        }); //sostituito il setAlpha con l'animazione, vscode mi dice che heartFade non è mai letto ma il codice va so idk

            if (this.playerHearts <= 1) {
                this.scene.start("scene0_welcome");
            } else {
                this.player.body.x = this.scalino.x - 200;
                this.player.body.y = this.scalino.y - 110;
                this.playerEnemy.x = this.playerEnemy.initialPosition;
                this.playerEnemy.y = this.playerEnemy.floorHeight;
                this.scene.resume(this.followPlayer);
            }

    }

    hitEnemy () {
        this.playerHearts -= 1;
        this.currentHeart = this.hearts[this.playerHearts - 1];
        this.currentHeart.setAlpha(0);

        if (this.playerHearts <= 1) {
            this.scene.start("scene0_welcome");
        } else {
            this.player.x = this.chiave.x;
            this.player.y = this.chiave.y;
            this.playerEnemy.x = this.playerEnemy.initialPosition;
            this.playerEnemy.y = this.playerEnemy.floorHeight;
            this.scene.resume(this.collectChiavi);
        }
            
    }
    

    pauseMenuBottons(){

        this.pauseButton.on("pointerdown", ()=>{
            this.scene.pause();
            this.scene.launch("pause_menu", {sceneName: "scene1"});
        });

        /*this.pausePlay.on("pointerdown", ()=>{
            this.pauseButton.setVisible(true);
            this.pausePanel.setVisible(false);
            this.pauseHome.setVisible(false);
            this.pausePlay.setVisible(false);
            this.physics.resume();
        });

        this.pauseButton.on("pointerdown", ()=>{
            this.pauseButton.setVisible(false);
            this.pausePanel.setVisible(true);
            this.pauseHome.setVisible(true);
            this.pausePlay.setVisible(true);
            this.physics.pause();
        });

        this.pauseHome.on("pointerdown", ()=> {
            this.scene.start("scene0_welcome");
        })*/
    }


    animateBackground() {
        this.background1.tilePositionX = this.cameras.main.scrollX * 0.05;
        this.background1.tilePositionY = this.cameras.main.scrollY * 0.05;
        this.background2.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.background2.tilePositionY = this.cameras.main.scrollY * 0.15;
        this.background3.tilePositionX = this.cameras.main.scrollX * 0.30;
        this.background3.tilePositionY = this.cameras.main.scrollY * 0.30;
        this.background4.tilePositionX = this.cameras.main.scrollX * 0.50;
        this.background4.tilePositionY = this.cameras.main.scrollY * 0.50;

        const startLineCamera = 400;
        const shiftCameraMax = 100;
        if (this.player.body.y + this.player.height / 2 < startLineCamera) {
            this.cameras.main.followOffset.y = Math.max(300 - shiftCameraMax, 300 - (startLineCamera - (this.player.body.y + this.player.height / 2)));
            console.log(this.cameras.main.followOffset.y);
        }
    }


    collectChiavi() {
        let x_diff = Math.abs(this.player.x-this.chiave.x);
        let y_diff = Math.abs(this.player.y-this.chiave.y);4
        //let portaFermaY = this.portaGroup.y;
        let icon = this.chiaveIcon1;
        if(x_diff < 75 && y_diff < 100) {
            this.chiave.destroy();
            this.portaGroup.children.iterate(function (porta) {porta.movePorta();});
            icon.setAlpha(1);
            this.playerEnemy.animateEnemyHouse();
        }
    }



    checkSceneEnd() {
        if (//(this.player.x >= this.game.config.width - this.player.displayWidth) && 
            this.key0.isDown) {
            this.scene.start("scene2");
        }
    }
}