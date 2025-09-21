class Toolbar {
    constructor(){
        this.windowHeight = windowHeight;
        this.height=50;
        this.buttons=[
            {type:"blackhole",x:50,y:this.windowHeight-75,w:100,h:30,label:"Black Hole"},
            {type:"asteroid",x:200,y:this.windowHeight-75,w:100,h:30,label:"Asteroid"},
            {type:"clear",x:350,y:this.windowHeight-75,w:100,h:30,label:"Clear Obstacles"}
        ];
        this.selected="clear";
        this.starterAreas=[ //windowWidth*5/6, windowHeight/4, windowWidth/6, windowHeight/2
            {x:0, y:windowHeight/4, w:windowWidth/6, h:windowHeight/2},
            {x:windowWidth*5/6, y:windowHeight/4, w:windowWidth/6, h:windowHeight/2}
        ];
    }
    render(){
        push();
        fill(200);
        rect(0,windowHeight-this.height,width,windowHeight);
        for(let button of this.buttons){
            fill(255);
            rect(button.x,button.y,button.w,button.h);
            fill(0);
            textAlign(CENTER,CENTER);
            text(button.label,button.x+button.w/2,button.y+button.h/2);
        }

        // Bounding boxes for starting area
        fill(255,0,0,100);
        rect(0, windowHeight/4, windowWidth/6, windowHeight/2);
        rect(windowWidth*5/6, windowHeight/4, windowWidth/6, windowHeight/2);

        pop();
    }

    checkClick(mx,my){
        for(let button of this.buttons){
            if(mx>button.x && mx<button.x+button.w && my>button.y && my<button.y+button.h){
                return button.type;
            }
        }
        return null;  
    }

    checkIfClickedStarterArea(mx,my) {
        for (let area of this.starterAreas) {
            if (mx>area.x && mx<area.x+area.w && my>area.y && my<area.y+area.h) {
                return true;
            }
        }
        return false;
    }
}   
