class BlackHole extends Obstacle{
    constructor(pos, size, rotationSpeed=0.25) {
        // sqrt( size^2 + size^2 ) = multi
        super(pos, size);
        this.rotSpeed = rotationSpeed;
        this.rotAngle = 0;

        
    }

    getCurveFromAngle(initialAngle, offset=0) {
        let diam = this.size - offset;
        let anchor1 = p5.Vector.fromAngle(initialAngle, diam/2);
        let control1 = p5.Vector.fromAngle(5.17603659+initialAngle, diam*1.118033989);
        let control2 = p5.Vector.fromAngle(3.776619389+initialAngle, diam*2.360084744);
        let anchor2 = p5.Vector.fromAngle(2.55359005+initialAngle, diam*1.802775638);
        return [anchor1, control1, control2, anchor2];
    }

    playerCollision(player) {
        let playerPos = player.pos;
        if (super.playerCollision(playerPos)) {
            // Dead Player!
            return true;
        } else if (super.playerCollision(playerPos, size*2)) {
            // Player Normal Speed is 200
            let dist = Math.sqrt(Math.pow(playerPos.x - this.pos.x, 2) +
                Math.pow(playerPos.y - this.pos.y, 2));
            let accelMag = Math.pow((dist/(1.5*size)) * 20, 2);
            let angle = Math.atan2(this.pos.y-playerPos.y, this.pos.x-playerPos.x);
            player.acc = p5.Vector.fromAngle(angle, accelMag);
            //0 -> 400; 0 -> 20; size/2 -> 2*size
        }
        return false;
    }

    render(newPos=this.pos, rotSpeed=this.rotSpeed, curveCount=36, curveSize=Math.max(1,Math.round(this.size+25)/25)) {
        push();
        angleMode(DEGREES);
        this.pos = newPos;
        this.rotAngle += rotSpeed;
        translate(this.pos.x, this.pos.y);
        rotate(this.rotAngle);
        fill(0,0,0);
        circle(0, 0, this.size);
        noFill();
        strokeWeight(2);
        for (let i = 0; i < 360; i+= 360/curveCount) {
            let curvePts = this.getCurveFromAngle(i);
            bezier(curvePts[0].x, curvePts[0].y, curvePts[1].x, curvePts[1].y,
            curvePts[2].x, curvePts[2].y, curvePts[3].x, curvePts[3].y);
        }
        pop();

    }

    // Update acceleration depending on closeness
}