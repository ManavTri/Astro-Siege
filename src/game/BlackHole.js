class BlackHole {
    constructor(pos, size, rotationSpeed = 0.007) {
        // sqrt( size^2 + size^2 ) = multi
        // super(pos, size);
        this.pos = pos;
        this.size = size;
        this.rotSpeed = rotationSpeed;
        this.rotAngle = 0;

        
    }

    getCurveFromAngle(initialAngle, offset = 0) {
        let diam = this.size - offset;
        let anchor1 = p5.Vector.fromAngle(initialAngle, diam/2);
        let control1 = p5.Vector.fromAngle(5.17603659+initialAngle, diam*1.118033989);
        let control2 = p5.Vector.fromAngle(3.776619389+initialAngle, diam*2.360084744);
        let anchor2 = p5.Vector.fromAngle(2.55359005+initialAngle, diam*1.802775638);
        return [anchor1, control1, control2, anchor2];
    }

    playerCollision(player) {
        let playerPos = player.pos;
        if (this.shipCollision(player)) {
            // Dead Player!
            return true;
        } else if (this.shipCollision(player, 10)) {
            // Player Normal Speed is 200
            let dist = Math.sqrt(Math.pow(playerPos.x - this.pos.x, 2) +
                Math.pow(playerPos.y - this.pos.y, 2));
            let accelMag = Math.max(1/dist, 1/this.size*2)*10000;
            let angle = Math.atan2(this.pos.y-playerPos.y, this.pos.x-playerPos.x);
            player.acc = p5.Vector.fromAngle(angle, accelMag);
            //0 -> 400; 0 -> 20; size/2 -> 2*size
        }
        return false;
    }

    shipCollision(ship, scale = 1) {
        let vertices = ship.getVertices();
        let d1, d2, d3;
        d1 = dist(this.pos.x, this.pos.y, vertices[0].x, vertices[0].y);
        d2 = dist(this.pos.x, this.pos.y, vertices[1].x, vertices[1].y);
        d3 = dist(this.pos.x, this.pos.y, vertices[2].x, vertices[2].y);
        return (d1 < scale * this.size / 2 || d2 < scale * this.size / 2 || d3 < scale * this.size / 2);
    }


    render(newPos=this.pos, rotSpeed=this.rotSpeed, curveCount=36, curveSize=Math.max(1,Math.round(this.size+25)/25)) {
        push();
            // angleMode(DEGREES);
            this.pos = newPos;
            this.rotAngle += rotSpeed;
            translate(this.pos.x, this.pos.y);
            rotate(this.rotAngle);
            fill(0, 0, 0);
            stroke(255, 255, 255);
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