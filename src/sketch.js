let stars = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }
  for (let star of stars) {
    star.show();
  }
}

function draw() {
  background(0);
  for (let star of stars) {
    star.move();
    if (star.isOffScreen()) {
      star.wrap();
    }
    star.show();
  }
}
