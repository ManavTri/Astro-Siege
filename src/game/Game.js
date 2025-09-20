class Game {
    /**
     * Constructor for the Game class
     * 
     * @param {number} width Width of the canvas
     * @param {number} height Height of the canvas
     */
    constructor(width = windowWidth, height = windowHeight) {
        // Create a new StarField with 1000 stars
        this.starField = new StarField(1000, width, height);

        // Create a new PlanetPair
        this.planetPair = new PlanetPair(100, color(0, 255, 0), color(0, 0, 255), width, height);

        this.turn = -1;

        this.planetPair.turn = this.turn;
    }

    /**
     * Updates the game elements
     */
    update() {
        
    }

    /**
     * Renders the game elements
     */
    render() {
        this.starField.render();
        this.planetPair.render();
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
}
