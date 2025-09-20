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
    }

    /**
     * Renders the planet as a colored circle on the canvas.
     */
    render() {
        push();
            fill(this.color);
            noStroke();
            translate(this.width / 2, this.height / 2);
            circle(this.side * (this.width / 2 - this.size * 0.15), 0, this.size);
        pop();
    }

    /**
     * Switches the side of the screen the planet is on.
     */
    switchSide() {
        this.side *= -1;
    }
}
