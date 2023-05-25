let trail = [];

function setup() {
  noCursor();
  frameRate(200);
}

function draw() {
  clear();
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('canvas');
  stroke(55, 17, 194);
  strokeWeight(8);

  let currentPos = createVector(mouseX, mouseY);
  trail.push(currentPos);

  for (let i = 0; i < trail.length - 1; i++) {
    let currentPoint = trail[i];
    let nextPoint = trail[i + 1];

    line(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);
  }

  if (trail.length > 10) {
    trail.splice(0, 1);
  }
}
