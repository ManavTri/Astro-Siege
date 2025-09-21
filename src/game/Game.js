class Game {
    /**
     * Constructor for the Game class
     * 
     * @param {number} width Width of the canvas (default: windowWidth)
     * @param {number} height Height of the canvas (default: windowHeight)
     */
    constructor(width = windowWidth, height = windowHeight) {
        this.width = width;
        this.height = height;

        this.ship = null;
        
        // Create a new StarField with 1000 stars
        this.starField = new StarField(1000, width, height);

        // Create a new PlanetPair
        this.planetPair = new PlanetPair(100, color(0, 255, 0), color(0, 0, 255), width, height);

        this.turn = -1;

        this.obstacles = [];

        this.playing = false;

        this.count = 0;

        this.createShip();
    }

    /**
     * Updates the game elements
     */
    update() {
        if (this.ship !== null) {
            // console.log("updating ship for player " + this.ship.player);
            if (!this.playing) {
                // console.log("waiting to start game for player " + this.ship.player);
                this.count++;
                this.startGame();
                this.ship.moveArc(this.getPlanetPos(), this.getPlanet().size * 1.1);
                if (this.playing) {
                    this.ship.resetVelocity();
                }
            } else {
                // console.log("playing game for player " + this.ship.player);
                this.keyHeld();
                this.ship.update();
                if (this.ship.isOffScreen(this.width, this.height)) {
                    console.log("player " + this.ship.player + " went off screen");
                    this.removeShip();
                    this.nextTurn();
                    return;
                }
                for (let obstacle of this.obstacles) {
                    if (obstacle.playerCollision(this.ship)) {
                        console.log("player " + this.ship.player + " hit an obstacle");
                        this.removeShip();
                        this.nextTurn();
                        return;
                    }
                }
                if (this.planetPair.playerCollision(this.ship)) {
                    console.log("player " + this.ship.player + " hit the opposite planet");
                    this.removeShip();
                    this.nextTurn();
                }
            }
        }
    }

    /**
     * Advances to the next turn
     */
    nextTurn() {
        this.turn *= -1;
        this.playing = false;
        this.createShip();
    }

    /**
     * Renders the game elements
     */
    render() {
        this.starField.render();
        this.planetPair.render();
        if (this.ship !== null) {
            this.ship.render();
        }
    }

    /**
     * Creates a new ship at the specified position with the given velocity
     * 
     * @param {p5.Vector} pos Starting position of the ship (default: left or right side based on turn)
     * @param {p5.Vector} vel Starting velocity of the ship (default: towards center based on turn)
     */
    createShip(pos = this.getPlanetPos(), vel = createVector(this.turn * -200, 0)) {
        // console.log("creating ship for player " + this.turn);
        if (this.ship === null) {
            this.ship = new Ship(pos.x, pos.y, vel.x, vel.y, this.turn);
            // console.log("created ship for player " + this.turn);
        }
    }

    /**
     * Get planet in PlanetPair for the current turn
     * 
     * @returns {Planet} Planet for the current turn
     */
    getPlanet() {
        return (this.turn < 0) ? this.planetPair.planets[0] : this.planetPair.planets[1];
    }

    /**
     * Gets the position of the planet for the current turn
     * 
     * @returns {p5.Vector} Position of the planet for the current turn
     */
    getPlanetPos() {
        return (this.turn < 0) ? this.planetPair.planets[0].pos : this.planetPair.planets[1].pos;
    }

    /**
     * Removes the ship from the game
     */
    removeShip() {
        this.ship = null;
    }

    /**
     * Handles user input for steering the ship
     * 
     * Uses 'A' and 'D' keys or Left and Right arrow keys to steer the ship
     */
    keyHeld() {
        if (keyIsDown(65) || keyIsDown(37)) { // 'A' or Left Arrow
            this.ship.steerLeft();
        }
        if (keyIsDown(68) || keyIsDown(39)) { // 'D' or Right Arrow
            this.ship.steerRight();
        }
    }

    /**
     * Starts the game, allowing the ship to move freely
     */
    startGame() {
        if (this.count > 15 && keyIsDown(32)) { // Spacebar
            this.playing = true;
            this.count = 0;
        }
    }
}
