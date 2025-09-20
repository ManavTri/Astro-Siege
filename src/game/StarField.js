class StarField {
    /**
     * Constructs a StarField with a specified number of stars.
     * 
     * @param {number} numStars - The number of stars in the star field.
     * @param {number} width - The width of the canvas.
     * @param {number} height - The height of the canvas.
     */
    constructor(numStars = 1000, width = windowWidth, height = windowHeight) {
        this.stars = [];
        for (let i = 0; i < numStars; i++) {
            this.stars.push(new Star());
        }
        this.width = width;
        this.height = height;
    }

    /**
     * Updates the position of all stars and wraps them if they go off-screen.
     */
    update() {
        for (let star of this.stars) {
            star.update();
            
            if (star.isOffScreen(this.width, this.height)) {
                star.wrap(this.width, this.height);
            }
        }
    }

    /**
     * Renders all stars in the star field.
     */
    render() {
        for (let star of this.stars) {
            star.render();
        }
    }

    /**
     * Updates and renders the star field.
     */
    run() {
        this.update();
        this.render();
    }
}
