class Asteroid {
    constructor(pos, size = 30, angle = 0, rotSpeed = 0.01) {
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

    playerCollision(ship) {
        return (dist(ship.pos.x, ship.pos.y, this.pos.x, this.pos.y) <= this.size / 2);
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
