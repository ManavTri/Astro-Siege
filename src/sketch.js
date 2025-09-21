// Declare variables to store canvas dimensions for easy access and to avoid changes in size
let width, height;

// Declare new Game object to run game logic
let game;

// Setup function to initialize the canvas and StarField
function setup() {
  // Set canvas dimensions
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);

  frameRate(60); // Set frame rate to 60 FPS
  background(0); // Set background to black
  // noCursor(); // Hide the cursor

  // Create a new Game instance
  game = new Game(width, height);

  // Initial render
  game.render();
}

// Draw function to update and render stars each frame
function draw() {
  // Clear the background each frame
  background(0);

  // Update the game
  game.update();

  // Render the game
  game.render();

  // fill(255,0,0,100);
  // rect(0, windowHeight/4, windowWidth/6, windowHeight/2);
  // rect(windowWidth*5/6, windowHeight/4, windowWidth/6, windowHeight/2);
}

function mouseClicked() {
  let newSelect = game.toolbar.checkClick(mouseX, mouseY);
  if (newSelect === null){
    if (!game.toolbar.checkIfClickedStarterArea(mouseX,mouseY)) {
      if(game.toolbar.selected==="blackhole"){
          game.obstacles.push(new BlackHole(createVector(mouseX,mouseY),50));
      }
      else if(game.toolbar.selected==="asteroid"){
          game.obstacles.push(new Asteroid(createVector(mouseX,mouseY),20));
      }
    }
  }
  else{
    game.toolbar.selected=newSelect;
    if(newSelect==="clear"){
        game.obstacles=[];
    }
  }
}