class Ship{
    //class properties
    pos=[0,0];
    vel=[0,0];
    acc=[0,0];
    mass=0;

    constructor(x,y,vx,vy,mass){
        pos[0]=x;
        pos[1]=y;
        vel[0]=vx;
        vel[1]=vy;
        this.mass=mass;
    }

}