class Asteroid extends Obstacle{
    constructor(pos, size=30, angle=0, rotSpeed=0.1) {   
        super(pos, size);
        this.angle = angle;
        this.rotSpeed = rotSpeed;
    }

    rotate() {
        this.angle += this.rotSpeed;
    }

    render() {
        push()
        angleMode(DEGREES);
        this.rotate();
        translate(a1.pos.x, this.pos.y);
        rotate(this.angle);
        strokeWeight(2);
        stroke(100,100,100);
        fill(GRAY);
        square(-this.size/2, -this.size/2, this.size);
        pop();
    }
}
