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
}

function mouseClicked() {
  game.addObstacle(new Asteroid(createVector(mouseX, mouseY), 50));
}