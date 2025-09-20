// Initialize an array to hold star objects
const stars = [];

// Store canvas dimensions in variables for easy access and to avoid changes in size
let width, height;

// Declare new StarField object
let starField;

// Setup function to initialize the canvas and stars
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  frameRate(60); // Set frame rate to 60 FPS
  background(0); // Set background to black

  // Create a new StarField with 1000 stars
  starField = new StarField(1000, width, height);

  // Initial render of the star field
  starField.render();
}

// Draw function to update and render stars each frame
function draw() {
  // Clear the background each frame
  background(0);

  // Update and render the star field
  starField.run();
}
