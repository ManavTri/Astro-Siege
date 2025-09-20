// Initialize an array to hold star objects
const stars = [];

// Setup function to initialize the canvas and stars
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60); // Set frame rate to 60 FPS
  background(0); // Set background to black
  
  // Create 1000 stars with random positions and sizes
  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }

  // Initial render of all stars
  for (let star of stars) {
    star.render();
  }
}

// Draw function to update and render stars each frame
function draw() {
  // Clear the background each frame
  background(0);

  // Update and render each star
  for (let star of stars) {
    star.update();

    if (star.isOffScreen()) {
      star.wrap();
    }

    star.render();
  }
}
