class Star {
    /**
     * Creates a new star object at position `pos`, with size `size`, moving in `direction`.
     * 
     * @param {p5.Vector} pos Starting position of the star (default: random position within canvas)
     * @param {number} size Size of the star (diameter) (default: random between 1 and 5)
     * @param {p5.Vector} direction Direction vector the star moves in (default: left)
     */
    constructor(pos, size = random(1, 5), direction = createVector(-1, 0)) {
        this.pos = pos || createVector(random(size, windowWidth - size), random(size, windowHeight - size));
        this.direction = direction;
        this.size = size;
    }

    /**
     * Updates the star's position based on its direction and size. Stars move faster if they are larger.
     */
    update() {
        this.pos.add(this.direction.normalize().mult(this.size * 0.1));
    }

    /**
     * Renders the star as a white circle on the canvas at position 'this.pos' and with size 'this.size'.
     */
    render() {
        fill(255);
        noStroke();
        circle(this.pos.x, this.pos.y, this.size);
    }

    /**
     * Check if star is off the screen.
     * 
     * @returns {boolean} True if the star is off the screen, false otherwise.
     * 
     * @param {number} width Width of the canvas (default: windowWidth)
     * @param {number} height Height of the canvas (default: windowHeight)
     */
    isOffScreen(width = windowWidth, height = windowHeight) {
        return this.pos.x < -this.size || this.pos.x > width + this.size ||
               this.pos.y < -this.size || this.pos.y > height + this.size;
    }

    /**
     * Wraps the star around to the opposite side of the screen at a random height if it goes off-screen.
     * 
     * @param {number} width Width of the canvas (default: windowWidth)
     * @param {number} height Height of the canvas (default: windowHeight)
     */
    wrap(width = windowWidth, height = windowHeight) {
        if (this.pos.x < -this.size) {
            this.pos.x = width + this.size;
            this.pos.y = random(this.size, height - this.size);
        } else if (this.pos.x > width + this.size) {
            this.pos.x = -this.size;
            this.pos.y = random(this.size, height - this.size);
        }
    }
}
