class Ship{
    /**
     * Constructor for Ship class
     * 
     * @param {number} x Starting x position
     * @param {number} y Starting y position
     * @param {number} vx Starting x velocity
     * @param {number} vy Starting y velocity
     */
    constructor(x, y, vx, vy) {
        this.pos = createVector(x,y);
        this.vel = createVector(vx, vy);
        this.originalPos = this.pos.copy();
        this.originalVel = this.vel.copy();
        this.height = 70;
        this.width = 40;
        this.acc = createVector(0,0);
    }

    /**
     * Update ship position based on velocity and deltaTime
     */
    move() {
        //convert deltaTime for current frame to seconds
        let dt = deltaTime / 1000;
        //make dv a small fraction of the velocity vector for euler integration
        let dv = createVector(this.vel.x * dt, this.vel.y * dt);
        //euler integration add position to dv every frame
        this.pos.add(dv);
    }

    /**
     * Steer the ship left by rotating the velocity vector counter-clockwise
     */
    steerLeft() {
        this.vel.rotate(-Math.PI/25);
    }

    /**
     * Steer the ship right by rotating the velocity vector clockwise
     */
    steerRight() {
        this.vel.rotate(Math.PI/25);
    }

    /**
     * Render the ship as a triangle on the canvas
     */
    render() {
        let angle = atan2(this.vel.y, this.vel.x);
        //CONTROL SHIP FROM TIP
        /*
        let p1=createVector(-this.height,-this.width/2);
        let p2=createVector(-this.height,this.width/2);
        p1.rotate(angle);
        p2.rotate(angle);
        triangle(
            this.pos.x,this.pos.y,
            this.pos.x+p1.x,this.pos.y+p1.y,
            this.pos.x+p2.x,this.pos.y+p2.y
        );
        */
       //CONTROL SHIP FROM BACK
       /*
       let tip=createVector(this.height,0);
       let left=createVector(0,-this.width/2);
       let right=createVector(0,this.width/2);
       tip.rotate(angle);
       left.rotate(angle);
       right.rotate(angle);
       triangle(
        this.pos.x+tip.x,this.pos.y+tip.y,
        this.pos.x+left.x,this.pos.y+left.y,
        this.pos.x+right.x,this.pos.y+right.y
       );
    */
      //CONTROL SHIP FROM MIDDLE OF HEIGHT
      
      let tip = createVector(this.height/2,0);
      let left = createVector(-this.height/2,-this.width/2);
      let right = createVector(-this.height/2,this.width/2);
      tip.rotate(angle);
      left.rotate(angle);
      right.rotate(angle);
      triangle(
       this.pos.x + tip.x, this.pos.y + tip.y,
       this.pos.x + left.x, this.pos.y + left.y,
       this.pos.x + right.x, this.pos.y + right.y
      );
    }

    /**
     * Check if the ship is off the screen
     * 
     * @returns {boolean} True if the ship is off the screen, false otherwise
     */
    isOffScreen(width = windowWidth, height = windowHeight) {
        return (this.pos.x < -this.height || this.pos.x > width + this.height ||
                this.pos.y < -this.height || this.pos.y > height + this.height);
    }

    /**
     * Reset the ship to its original position and velocity
     */
    reset() {
        this.pos = this.originalPos.copy();
        this.vel = this.originalVel.copy();
    }

    /**
     * Run the ship by moving and rendering it
     */
    run() {
        this.move();
        this.render();
    }
}
