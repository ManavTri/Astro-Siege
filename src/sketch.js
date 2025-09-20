let stars = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  background(0);
  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }
  for (let star of stars) {
    star.render();
  }
}

function draw() {
  background(0);
  for (let star of stars) {
    star.update();
    if (star.isOffScreen()) {
      star.wrap();
    }
    star.render();
  }
}
