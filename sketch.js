// Declaring Global Variables ==================================================
let birds, pipes;

// Constants ===================================================================
const SCALE = 1.5;
const ENGLISH_VIOLET = [76, 59, 77];
const COLLISION_TOLERANCE = 0.65;
const N_BIRDS = 50;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(135 * SCALE, 203 * SCALE);

  birds = new Population(N_BIRDS);
  pipes = new Pipes();
}

function draw() {
  background(...ENGLISH_VIOLET);

  // Players
  birds.update();
  birds.show();

  // Obstactles
  pipes.update();
  pipes.show();

  // Obstacle Management
  pipes.removePipe();
  pipes.spawnPipe();

  // Game/Population Management
  birds.forEach((bird, i) => {
    if (collision(bird, pipes.firstPipe)) {
      birds.cull(i);
    }
    inactivatePipe(bird, pipes.firstPipe);

    bird.predict(pipes.firstPipe);
  });
}

// Game Management =============================================================
function collision(bird, pipe) {
  if (!pipe.active) {
    return false;
  }
  const hitBox = bird.toHitBox();
  const opening = pipe.toOpening();

  const xCollision = hitBox.right >= pipe.x;
  const yCollision =
    hitBox.top <= opening.top || hitBox.bottom >= opening.bottom;

  return xCollision && yCollision;
}

function inactivatePipe(bird, pipe) {
  const hitBox = bird.toHitBox();
  if (hitBox.left >= pipe.rightEdge * COLLISION_TOLERANCE) {
    pipe.inactivate();
  }
}
