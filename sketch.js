// Declaring Global Variables ==================================================
let bird;
const pipes = [];

// Constants ===================================================================
const SCALE = 1.5;
const ENGLISH_VIOLET = [76, 59, 77];

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(135 * SCALE, 203 * SCALE);

  bird = new Bird();
}

function draw() {
  background(...ENGLISH_VIOLET);

  bird.show();
  bird.update();
}

function keyPressed() {
  if (key === " ") {
    bird.flap();
  }
}
