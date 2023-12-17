let game;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(135 * SCALE, 203 * SCALE);
  game = new Game();
}

function draw() {
  background(...ENGLISH_VIOLET);
  game.run();
}
