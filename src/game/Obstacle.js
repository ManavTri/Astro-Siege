class Obstacle {
    constructor(pos, diameter) {
        this.pos = pos;
        this.diam = diameter;
    }

    collidesWithPlayer(playerPos, radius=this.diam/2) {
        if (Math.sqrt(Math.pow(playerPos.x - this.pos.x, 2) +
        Math.pow(playerPos.y - this.pos.y, 2)) <= rad) {
            return true;
        }
        return false;
    }
}



