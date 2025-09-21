class Asteroid extends Obstacle {
    constructor(pos, size = 30, angle = 0, rotSpeed = 0.01) {   
        super(pos, size);
        this.angle = angle;
        this.rotSpeed = rotSpeed;
    }

    rotate() {
        this.angle += this.rotSpeed;
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
