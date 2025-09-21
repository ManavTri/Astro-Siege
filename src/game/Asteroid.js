class Asteroid {
    constructor(pos, size = 30, angle = 0, rotSpeed = 0.1) {
        console.log("Creating asteroid at " + pos.x + ", " + pos.y);
        // super(pos, size);
        this.pos = pos;
        this.size = size;
        this.angle = angle;
        this.rotSpeed = rotSpeed;
    }

    rotate() {
        this.angle += this.rotSpeed;
    }

    /**
     * Handle collision detection with a Ship object (triangle and square collision).
     * @param {Ship} ship The ship to check for collision
     * @returns {boolean} True if the asteroid collides with the ship, false otherwise
     */
    playerCollision(ship) {
        let vertices = ship.getVertices();
        return (vertices[0].x > this.pos.x - this.size / 2 && vertices[0].x < this.pos.x + this.size / 2 &&
                vertices[0].y > this.pos.y - this.size / 2 && vertices[0].y < this.pos.y + this.size / 2) ||
               (vertices[1].x > this.pos.x - this.size / 2 && vertices[1].x < this.pos.x + this.size / 2 &&
                vertices[1].y > this.pos.y - this.size / 2 && vertices[1].y < this.pos.y + this.size / 2) ||
               (vertices[2].x > this.pos.x - this.size / 2 && vertices[2].x < this.pos.x + this.size / 2 &&
                vertices[2].y > this.pos.y - this.size / 2 && vertices[2].y < this.pos.y + this.size / 2);
    }

    render() {
        push()
            this.rotate();
            translate(this.pos.x, this.pos.y);
            rotate(this.angle);
            strokeWeight(2);
            stroke(100);
            fill(120);
            square(-this.size/2, -this.size/2, this.size);
        pop();
    }
}
