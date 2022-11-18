export default class SceneWelcome extends Phaser.Scene {

    background0;       // oggetto relativo all'elemento "sfondo"
    textStart;         // testo

    constructor(){
        // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
		super("scene_welcome");
    }

    init(){
        console.log("scene_welcome - Executing init()");
    }

    preload() {
        console.log("scene_welcome - Executing preload()");
        // Carichiamo gli asset grafici
        this.load.image("background_base", "assets/images/background/background.png"); // carica l'immagine di sfondo

        // Carichiamo l'immagine del giocatore in formato spritesheet (ci servirà nelle prossime scene)
        let spritesheet_config = {
            frameWidth:  280,
            frameHeight: 335,
        };
        this.load.spritesheet("playerrun", "assets/images/characters/playerrunandjump.png", spritesheet_config);
    }