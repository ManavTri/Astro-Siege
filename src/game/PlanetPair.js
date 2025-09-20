class PlanetPair {
    /**
     * Creates a pair of planets on opposite sides of the screen.
     * 
     * @param {number} size Size (diameter) of each planet (default: 100)
     * @param {p5.Color} color1 Color of the left planet (default: green)
     * @param {p5.Color} color2 Color of the right planet (default: blue)
     * @param {number} width Width of the canvas (default: windowWidth)
     * @param {number} height Height of the canvas (default: windowHeight)
     */
    constructor(size = 100, color1 = color(0, 255, 0), color2 = color(0, 0, 255), width = windowWidth, height = windowHeight) {
        this.planets = [
            new Planet(-1, size, color1, width, height), // left planet
            new Planet(1, size, color2, width, height) // right planet
        ];
    }

    /**
     * Renders both planets in the pair.
     */
    render() {
        for (let planet of this.planets) {
            planet.render();
        }
    }

    /**
     * Switches the sides of both planets.
     */
    switchSides() {
        for (let planet of this.planets) {
            planet.switchSide();
        }
    }

    /**
     * Checks for collision between the ship and either planet.
     * 
     * @returns {boolean} True if the ship collides with opposite player's planet, false otherwise
     * 
     * @param {Ship} ship The ship to check for collision
     */
    playerCollision(ship) {
        for (let planet of this.planets) {
            if (planet.side !== ship.player) {
                let vertices = ship.getVertices();
                if (planet.playerCollision(vertices[0], vertices[1], vertices[2])) {
                    return true;
                }
            }
        }
        return false;
    }
}
