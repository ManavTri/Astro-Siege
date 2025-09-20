class Star {
    /**
     * Creates a new star object at position `pos`, with size `size`, moving in `direction`.
     * 
     * @param {p5.Vector} pos Starting position of the star
     * @param {number} size Size of the star (diameter)
     * @param {p5.Vector} direction Direction vector the star moves in
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
        this.pos.add(this.direction.normalize().mult(this.size * 0.5));
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
     */
    isOffScreen() {
        return this.pos.x < -this.size || this.pos.x > windowWidth + this.size ||
               this.pos.y < -this.size || this.pos.y > windowHeight + this.size;
    }

    /**
     * Wraps the star around to the opposite side of the screen at a random height if it goes off-screen.
     */
    wrap() {
        if (this.pos.x < -this.size) {
            this.pos.x = windowWidth + this.size;
            this.pos.y = random(this.size, windowHeight - this.size);
        } else if (this.pos.x > windowWidth + this.size) {
            this.pos.x = -this.size;
            this.pos.y = random(this.size, windowHeight - this.size);
        }
    }
}
