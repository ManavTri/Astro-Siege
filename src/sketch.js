// Don't look at my code plz

let running = false; // Game state variable to track if the game is running or in main menu
let sceneSelector = 0; // Variable to control display of screens

// Declare variables to store canvas dimensions for easy access and to avoid changes in size
let width, height;

// Declare new Game object to run game logic
let game;

// Create starfield for menu background
let menuStarField;

// Custom Space Font
let font;
let subFont;

function preload() {
  // Loads custom space font
  font = loadFont('/src/game/Sterion-BLLld.ttf');
  subFont = loadFont('/src/game/SpeedyRegular-7BLoE.ttf');
}

// Setup function to initialize the canvas and StarField
function setup() {
  // Set canvas dimensions
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);

  menuStarField = new StarField(1000, width, height);

  mainMenu(); // Display main menu

  frameRate(60); // Set frame rate to 60 FPS
  // background(0); // Set background to black
  // noCursor(); // Hide the cursor
}

// Draw function to update and render stars each frame
function draw() {
  if (running) {
    gameLoop();
  } else if (sceneSelector === 0) {
    mainMenu();
  } else if (sceneSelector === 1) {
    tutotialScreen();
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
  cursor(ARROW);
  menuStarField.run();
  textAlign(CENTER, CENTER);
  fill(255);
  textFont(font);
  stroke(0);
  strokeWeight(2);
  textSize(64);
  text("AstroSiege", width / 2, height / 3);
  textSize(32);
  text("Click to Start", width / 2, height / 2);
}

function tutotialScreen() {
  background(0);
  cursor(ARROW);
  menuStarField.run();
  textAlign(CENTER, CENTER);
  fill(255);
  textFont(font);
  stroke(0);
  strokeWeight(2);
  textSize(32);
  text("Tutorial", width / 2, height / 6);
  textSize(16);
  text("This is a two player game.\nPlace obstacles in the build phase for your opponent, but watch out because obstacles stick around!\nUse W, Up Arrow, or Space Bar to launch your rocket.\nUse A & D or Left & Right Arrow to steer.\nReach the other planet as many times in 50 seconds to win.\nAfter 15 round or someone reaches 100 score, the game ends.\nClick to continue.", width / 2, height / 2);
  // sceneSelector = 2;
}

function endScreen() {
  sceneSelector = 2;
  cursor(ARROW);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textFont(font);
  stroke(0);
  strokeWeight(2);
  if (game.winner !== 0) {
    textSize(32);
    text("Player " + ((game.winner === -1) ? "1" : "2") + " wins!", width / 2, height / 3);
    textSize(16);
    text("Player " + ((game.winner === -1) ? "1" : "2") + " had the higher score of " + ((game.winner < 0) ? game.scores[0] : game.scores[1]) + "!", width / 2, height / 2);
  } else {
    textSize(32);
    text("Tie Game!", width / 2, height / 3);
    textSize(16);
    text("Nobody wins!", width / 2, height / 2);
  }
  textSize(12);
  text("Click to continue.", width / 2, height / 6);
  // mainMenu(); // return to main menu
}

function gameLoop() {
  // Clear the background each frame
  background(0);

  // Update the game
  game.update();

  // Render the game
  game.render();

  if (game.gameOver) {
    running = false; // end game
    endScreen();
  }
}