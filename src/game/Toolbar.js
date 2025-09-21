class Toolbar {
    constructor(){
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.height=120;
        this.buttons=[
            {type:"blackhole",x:windowWidth/3,y:this.windowHeight-100,w:100,h:30,label:"Black Hole",icon:new BlackHole(createVector(0,0),20)},
            {type:"asteroid",x:windowWidth/2,y:this.windowHeight-100,w:100,h:30,label:"Asteroid",icon:new Asteroid(createVector(0,0),20)},
            {type:"clear",x:windowWidth*2/3,y:this.windowHeight-100,w:100,h:30,label:"Clear Obstacles", icon:null}
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
            if(this.selected!=='clear' && this.selected===button.type){
                fill('yellow');
            }
            else{
                fill(255);
            }
            noStroke();
            if(button.icon!==null){
            button.icon.pos=createVector(button.x,button.y+60);
            button.icon.render();
            }
            rect(button.x - button.w/2, button.y - button.h/2, button.w, button.h);
            fill(0);
            textAlign(CENTER,CENTER);
            text(button.label,button.x,button.y);
        }

        // Bounding boxes for starting area
        fill(255,0,0,100);
        rect(0, windowHeight/4, windowWidth/6, windowHeight/2);
        rect(windowWidth*5/6, windowHeight/4, windowWidth/6, windowHeight/2);

        pop();
    }

    checkClick(mx,my){
        for(let button of this.buttons){
            if(mx>button.x-button.w/2 && mx<button.x+button.w/2 && my>button.y - button.h/2 && my<button.y+button.h/2){
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
