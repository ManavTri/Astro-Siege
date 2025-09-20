// Declare variables to store canvas dimensions for easy access and to avoid changes in size
let width, height;

// Declare new StarField object
let starField;

// Declare new PlanetPair object
let planetPair;

// Declare new Ship object
let ship;

// Setup function to initialize the canvas and StarField
function setup() {
  // Set canvas dimensions
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);

  frameRate(60); // Set frame rate to 60 FPS
  background(0); // Set background to black
  noCursor(); // Hide the cursor

  // Create a new StarField with 1000 stars
  starField = new StarField(1000, width, height);

  // Create a new PlanetPair
  planetPair = new PlanetPair(100, color(0, 255, 0), color(0, 0, 255), width, height);

  // Create a new Ship at the center of the canvas moving to the right
  ship = new Ship(100, windowHeight / 2, 200, 0);

  // Initial render of the star field
  starField.render();

  // Initial render of the planet pair
  planetPair.render();

  // Initial render of the ship
  ship.render();
}

// Draw function to update and render stars each frame
function draw() {
  // Clear the background each frame
  background(0);

  // Update and render the star field
  starField.render();

  // Render the planet pair
  planetPair.render();

  // Handle continuous key presses for smoother steering
  keyHeld();

  // Move and render the ship
  ship.run();

  // Check for collision between the ship and the planets
  if (planetPair.playerCollision(ship)) {
    ship.reset();
  }

  // Check if the ship is off the screen and reset its position if necessary
  if (ship.isOffScreen(width, height)) {
    ship.reset();
  }
}

// Function to handle continuous key presses for smoother steering
function keyHeld() {
  if (keyIsDown(65) || keyIsDown(37)) { // 'A' or Left Arrow
    ship.steerLeft();
  }
  if (keyIsDown(68) || keyIsDown(39)) { // 'D' or Right Arrow
    ship.steerRight();
  }
}
