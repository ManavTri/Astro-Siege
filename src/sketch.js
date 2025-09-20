// Declare variables to store canvas dimensions for easy access and to avoid changes in size
let width, height;

// Declare new StarField object
let starField;

// Declare new PlanetPair object
let planetPair;

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

  // Initial render of the star field
  starField.render();
}

// Draw function to update and render stars each frame
function draw() {
  // Clear the background each frame
  background(0);

  // Update and render the star field
  starField.render();

  // Render the planet pair
  planetPair.render();
}
