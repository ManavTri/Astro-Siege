class Star {
    constructor(pos, size = random(1, 5), direction = createVector(-1, 0)) {
        this.pos = pos || createVector(random(size, windowWidth - size), random(size, windowHeight - size));
        this.direction = direction;
        this.size = size;
    }

    update() {
        this.pos.add(this.direction.normalize().mult(this.size * 0.5));
    }

    render() {
        fill(255);
        noStroke();
        circle(this.pos.x, this.pos.y, this.size);
    }

    isOffScreen() {
        return this.pos.x < -this.size || this.pos.x > windowWidth + this.size ||
               this.pos.y < -this.size || this.pos.y > windowHeight + this.size;
    }

    wrap() {
        if (this.pos.x < -this.size) {
            this.pos.x = windowWidth + this.size;
            this.pos.y = random(this.size, windowHeight - this.size);
        } else if (this.pos.x > windowWidth + this.size) {
            this.pos.x = -this.size;
            this.pos.y = random(this.size, windowHeight - this.size);
        }
        if (this.pos.y < -this.size) {
            this.pos.y = windowHeight + this.size;
            this.pos.x = random(this.size, windowWidth - this.size);
        } else if (this.pos.y > windowHeight + this.size) {
            this.pos.y = -this.size;
            this.pos.x = random(this.size, windowWidth - this.size);
        }
    }
}
