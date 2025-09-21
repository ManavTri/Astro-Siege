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
        
        this.scores = [0, 0]; // player 1 score, player 2 score

        this.obstacles = [];

        this.playing = false;

        this.turnBuffer = 0;

        this.createShip();

        this.createToolbar();

        this.winner = 0; // no winner yet

        this.maxScore = 50; // score to win

        this.maxRounds = 15; // max rounds until game over

        this.round = 1;

        this.gameOver = false;

        this.curObstacleCount = this.obstacles.length; // count for obstacles that can't be removed
    }

    /**
     * Updates the game elements
     */
    update() {
        if (this.scores[0] >= this.maxScore || this.scores[1] >= this.maxScore) {
            this.winner = this.turn;
            this.gameOver = true;
            return;
        } else if (Math.floor(this.round) > this.maxRounds) {
            this.gameOver = true;
            this.winner = (this.scores[0] == this.scores[1]) ? 0 : Math.max(this.scores[0], this.scores[1]);
            return;
        }
        if (this.ship !== null) {
            // console.log("updating ship for player " + this.ship.player);
            if (!this.playing) {
                // console.log("waiting to start game for player " + this.ship.player);
                this.turnBuffer++;
                this.startGame();
                this.ship.moveArc(this.getPlanetPos(), this.getPlanet().size * 0.85);
                if (this.playing) {
                    this.ship.resetVelocity();
                    this.curObstacleCount = this.obstacles.length; // makes new obstacles unremovable
                }
            } else {
                // console.log("playing game for player " + this.ship.player);
                this.keyHeld();
                this.ship.update();
                if (this.ship.isOffScreen(this.width, this.height)) {
                    // console.log("player " + this.ship.player + " went off screen");
                    // doesn't end turn if ship goes off screen, just resets ship
                    this.removeShip();
                    this.createShip();
                    return;
                }
                for (let obstacle of this.obstacles) {
                    if (obstacle.playerCollision(this.ship)) {
                        // console.log("player " + this.ship.player + " hit an obstacle");
                        //doesn't end turn if ship hits obstacle, just resets ship
                        this.removeShip();
                        this.createShip();
                        return;
                    }
                }
                if (this.planetPair.playerCollision(this.ship)) {
                    // console.log("player " + this.ship.player + " hit the opposite planet");
                    this.removeShip();
                    if (this.turn === -1) {
                        this.scores[0]++;
                    } else {
                        this.scores[1]++;
                    }
                    this.createShip();
                }
                this.currentTime=millis();
                console.log(this.currentTime-this.initialTime);
                //if 10 seconds have passed, end turn
                if(this.currentTime-this.initialTime>50000){ // change back to 50000
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
        this.round += 0.5;
        this.toolbar.points = 5;
        this.turn *= -1;
        this.playing = false;
        this.createShip();
        cursor(ARROW);
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
        for (let obstacle of this.obstacles) {
            obstacle.render();
        }
        if(!this.playing) {
            this.toolbar.render();
        }
        
        // Display scores, turns, and timer
        push();
            fill(255);
            textFont(subFont);
            textSize(20);
            textAlign(LEFT, TOP);
            text("Player 1 Score: " + this.scores[0], 10, 10);
            textAlign(RIGHT, TOP);
            text("Player 2 Score: " + this.scores[1], this.width - 10, 10);
            textAlign(CENTER, TOP);
            
            if (this.playing) {
                text("Player " + (this.turn === -1 ? "1" : "2") + " Turn", this.width / 2, 10);
                let timeLeft = Math.max(0, 50 - Math.floor((millis() - this.initialTime) / 1000));
                text("Time Left: " + timeLeft, this.width / 2, 30);
            }else{
                text("Build Phase For Player " + (this.turn === 1 ? "1" : "2") + " - When Ready, Player " + (this.turn !== 1 ? "1" : "2") + " Launch your Rocket!", this.width / 2, 10);
            }
        pop();
    }

    /**
     * Creates a new ship at the specified position with the given velocity
     * 
     * @param {p5.Vector} pos Starting position of the ship (default: left or right side based on turn)
     * @param {p5.Vector} vel Starting velocity of the ship (default: towards center based on turn)
     */
    createShip(pos = this.getPlanetPos(), vel = createVector(this.turn * (-200-50*((this.turn === -1) ? this.scores[0] : this.scores[1])), 0).limit(2000)) {
        // console.log("creating ship for player " + this.turn);
        if (this.ship === null) {
            this.ship = new Ship(pos.x-(60*this.turn), pos.y, vel.x, vel.y, this.turn);
            // console.log("created ship for player " + this.turn);
        }
    }

    /**
     * Creates the toolbar for selecting obstacles
     */
    createToolbar() {
        this.toolbar = new Toolbar();
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
     * Adds an obstacle to the game
     * 
     * @param {Obstacle} obstacle The obstacle to add
     */
    addObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }

    /**
     * Removes obstacles added during the current turn
     * 
     * Keeps obstacles that were present at the start of the turn
     */
    removeNewObstacles() {
        for (let i = this.obstacles.length - 1; i >= this.curObstacleCount; i--) {
            this.obstacles.pop();
        }
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
        if (this.turnBuffer > 15 && (keyIsDown(32) || keyIsDown(87) || keyIsDown(UP_ARROW))) { // Spacebar or 'W' key or Up Arrow
            this.playing = true;
            this.turnBuffer = 0;
            this.initialTime = millis();
            noCursor();
        }
    }
}
