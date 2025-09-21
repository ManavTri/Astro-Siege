class Toolbar {
    constructor(){
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.height=100;
        this.buttons=[
            {type:"blackhole",x:windowWidth/3,y:this.windowHeight-75,w:100,h:30,label:"Black Hole"},
            {type:"asteroid",x:windowWidth/2,y:this.windowHeight-75,w:100,h:30,label:"Asteroid"},
            {type:"clear",x:windowWidth*2/3,y:this.windowHeight-75,w:100,h:30,label:"Clear Obstacles"}
        ];
        this.selected="clear";
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
            rect(button.x - button.w/2, button.y - button.h/2, button.w, button.h);
            fill(0);
            textAlign(CENTER,CENTER);
            text(button.label,button.x,button.y);
        }
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
}   
