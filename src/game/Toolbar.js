class Toolbar {
    constructor(){
        this.height=50;
        this.buttons=[
            {type:"blackhole",x:50,y:25,w:100,h:30,label:"Black Hole"},
            {type:"asteroid",x:200,y:25,w:100,h:30,label:"Asteroid"},
            {type:"clear",x:350,y:25,w:100,h:30,label:"Clear Obstacles"}
        ];
        this.selected="clear";
    }
    render(){
        push();
        fill(200);
        rect(0,0,width,this.height);
        for(let button of this.buttons){
            fill(255);
            rect(button.x,button.y,button.w,button.h);
            fill(0);
            textAlign(CENTER,CENTER);
            text(button.label,button.x+button.w/2,button.y+button.h/2);
        }
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
}   
