export default class Player extends Phaser.GameObjects.Sprite {

    cursorKeys;
    keySpace;
    floorHeight;
    stepLength;       // lunghezza del passo
    gravityPull;      // intensità della forza di attrazione che fa cadere il personaggio
    isMoving;         // verifichiamo se l'animazione del giocatore è già in movimento o se è ferma
    isJumping;        // verifichiamo se l'animazione del giocatore è già in salto o no
    jumpStep;         // l'ampiezza del salto del giocatore
    maxWidth;

    constructor(scene, x, y, maxWidth) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "playerrun");
        scene.add.existing(this);

        this.floorHeight = y;

        this.setOrigin(0, 1); // Punto pivot in basso a sinistra
        this.setScale(0.5);   // Scala le dimensioni del giocatore

        // Inizializziamo i valori di alcune proprietà
        this.isMoving = false; //di default il giocatore parte fermo
        this.isJumping = false; //di default il giocatore non sta saltando
        this.jumpStep = 10;
        this.gravityPull = 2;
        this.stepLength  = 5;
        this.maxWidth = maxWidth;