class Planet {
    /**
     * Represents a planet in the star field.
     * @param {number} side - The side of the screen the planet starts on (-1 for left and 1 for right).
     * @param {number} size - The size (diameter) of the planet.
     * @param {p5.Color} c - The color of the planet.
     * @param {number} width - The width of the canvas.
     * @param {number} height - The height of the canvas.
     */
    constructor(side = -1, size = 100, c = color(0, 255, 0), width = windowWidth, height = windowHeight) {
        this.side = side;
        this.size = size;
        this.color = c;
        this.width = width;
        this.height = height;
        this.pos = createVector(this.width / 2 + this.side * (this.width / 2 - this.size * 0.15), this.height / 2);
    }

    /**
     * Renders the planet as a colored circle on the canvas.
     */
    render() {
        push();
            fill(this.color);
            noStroke();
            translate(this.pos.x, this.pos.y);
            circle(0, 0, this.size);
        pop();
    }

    /**
     * Switches the side of the screen the planet is on.
     */
    switchSide() {
        this.side *= -1;
    }

    /**
     * Handle collision detection with a triangle defined by points p1, p2, and p3.
     * 
     * @returns {boolean} True if the planet collides with a triangle, false otherwise.
     * 
     * @param {p5.Vector} p1 First vertex of the triangle
     * @param {p5.Vector} p2 Second vertex of the triangle
     * @param {p5.Vector} p3 Third vertex of the triangle
     */
    playerCollision(p1, p2, p3) {
        let d1, d2, d3;
        d1 = dist(this.pos.x, this.pos.y, p1.x, p1.y);
        d2 = dist(this.pos.x, this.pos.y, p2.x, p2.y);
        d3 = dist(this.pos.x, this.pos.y, p3.x, p3.y);
        if (d1 < this.size / 2 || d2 < this.size / 2 || d3 < this.size / 2) {
            // console.log("Collision detected with planet!");
            return true;
        }
        return false;
    }

}
