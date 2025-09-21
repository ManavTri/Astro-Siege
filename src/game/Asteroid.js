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

    playerCollision(playerPos, radius = this.diam / 2) {
        if (Math.sqrt(Math.pow(playerPos.x - this.pos.x, 2) +
        Math.pow(playerPos.y - this.pos.y, 2)) <= radius) {
            return true;
        }
        return false;
    }

    render() {
        push()
            this.rotate();
            translate(this.pos.x, this.pos.y);
            rotate(this.angle * 180 / Math.PI);
            strokeWeight(2);
            stroke(100);
            fill(120);
            square(-this.size/2, -this.size/2, this.size);
        pop();
    }
}
