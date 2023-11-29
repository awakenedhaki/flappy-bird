// Declaring Global Variables ==================================================
let birds, pipes;

// Constants ===================================================================
// Game Aesthetics
const SCALE = 1.5;
const ENGLISH_VIOLET = [76, 59, 77];

// Game Logic
const COLLISION_TOLERANCE = 0.65;
const CROSSING_THRESHOLD = 1.25;

// Genetic Algorithm
const N_INPUT_NODES = 5;
const N_HIDDEN_NODES = 8;
const N_OUTPUT_NODES = 2;
const MUTATION_RATE = 0.3;
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

    pipeCrossed(bird, pipes.firstPipe);
    inactivatePipe(bird, pipes.firstPipe);

    bird.predict(pipes.firstPipe);
  });

  // Selection + Mutation
  if (birds.activeBirds.length === 0) {
    birds.calculateFitness();
    birds = Population.nextGeneration(birds.inactiveBirds);
    pipes = new Pipes();
  }
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

function pipeCrossed(bird, pipe) {
  const hitBox = bird.toHitBox();
  if (hitBox.right >= pipe.leftEdge * CROSSING_THRESHOLD && pipe.active) {
    bird.score += 1;
  }
}

function inactivatePipe(bird, pipe) {
  const hitBox = bird.toHitBox();
  if (hitBox.left > pipe.rightEdge * COLLISION_TOLERANCE) {
    pipe.inactivate();
  }
}
