let running = false; // Game state variable to track if the game is running or in main menu
let sceneSelector = 0; // Variable to control display of screens

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

  mainMenu(); // Display main menu

  frameRate(60); // Set frame rate to 60 FPS
  // background(0); // Set background to black
  // noCursor(); // Hide the cursor
}

// Draw function to update and render stars each frame
function draw() {
  if (running) {
    gameLoop();
  }

  // fill(255,0,0,100);
  // rect(0, windowHeight/4, windowWidth/6, windowHeight/2);
  // rect(windowWidth*5/6, windowHeight/4, windowWidth/6, windowHeight/2);
}

// Toolbar and placing obstacles
function mouseClicked() {
  if (sceneSelector === 0) {
    tutotialScreen(); // Display tutorial screen
    sceneSelector = 1;
  } else if (sceneSelector === 1) {
      running = true; // starts the game

      sceneSelector = 3; // game scene

      textAlign(CENTER, CENTER);
      textSize(12);

      // Create a new Game instance
      game = new Game(width, height);

      // Initial render
      game.render();
  } else if (running) {
    let newSelect = game.toolbar.checkClick(mouseX, mouseY);
    if (newSelect === null){
      if (!game.toolbar.checkIfClickedStarterArea(mouseX,mouseY)) {
        if(game.toolbar.selected==="blackhole" && game.toolbar.points >= 5){
            game.toolbar.points -= 5;
            game.obstacles.push(new BlackHole(createVector(mouseX,mouseY),50));
        }
        else if(game.toolbar.selected==="asteroid" && game.toolbar.points >= 1){
            game.toolbar.points -= 1;
            game.obstacles.push(new Asteroid(createVector(mouseX,mouseY),20));
        }
      }
    }
    else{
      game.toolbar.selected=newSelect;
      if(newSelect==="clear"){
          game.toolbar.points = 5;
          game.removeNewObstacles();
      }
    }
  } else if (!running && sceneSelector === 2) {
      mainMenu(); // return to main menu
      sceneSelector = 0;
      game = null; // reset game
  }
}

function mainMenu() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(64);
  text("Astro-Siege", width / 2, height / 3);
  textSize(32);
  text("Click to Start", width / 2, height / 2);
}

function tutotialScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text("Tutorial", width / 2, height / 6);
  textSize(16);
  text("This is a two player game.\nPlace obstacles on your turn, but watch out because you also have to get to the other side!\nUse W, Up Arrow, or Space Bar to launch your rocket.\nUse A/D or Left/Right Arrow to steer.\nClick to continue.", width / 2, height / 2);
  sceneSelector = 2;
}

function endScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text(game.winner + " wins!", width / 2, height / 3);
  textSize(16);
  text(game.winner + " had the higher score of " + ((game.winner < 0) ? game.scores[0] : game.scores[1]) + "!", width / 2, height / 2);
  mainMenu(); // return to main menu
}

function gameLoop() {
  // Clear the background each frame
  background(0);

  // Update the game
  game.update();

  // Render the game
  game.render();

  if (game.winner !== 0) {
    running = false; // end game
    sceneSelector = 2;
    endScreen();
  }
}