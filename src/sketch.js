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
