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
const N_BIRDS = 100;

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
  pipes.recyclePipe();

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
/**
 * Checks if a bird has collided with a pipe or the border.
 * @function collision
 * @param {Bird} bird - The bird to check for collisions.
 * @param {Pipe} pipe - The pipe to check for collisions.
 * @returns {boolean} - Returns true if a collision occurred, false otherwise.
 */
function collision(bird, pipe) {
  if (!pipe.active) {
    return false;
  }
  const hitBox = bird.toHitBox();
  const pipeOpening = pipe.toOpening();

  return pipeCollision(hitBox, pipeOpening) || borderCollision(hitBox);
}

/**
 * Checks if a bird has collided with the border.
 * @function borderCollision
 * @param {Object} hitBox - The hitbox of the bird.
 * @returns {boolean} - Returns true if a collision with the border occurred, false otherwise.
 */
function borderCollision(hitBox) {
  return hitBox.top <= 0 || hitBox.bottom >= height;
}

/**
 * Checks if a bird has collided with a pipe.
 * @function pipeCollision
 * @param {Object} hitBox - The hitbox of the bird.
 * @param {Object} pipeOpening - The opening of the pipe.
 * @returns {boolean} - Returns true if a collision with the pipe occurred, false otherwise.
 */
function pipeCollision(hitBox, pipeOpening) {
  const xCollision = hitBox.right >= pipeOpening.left;
  const yCollision =
    hitBox.top <= pipeOpening.top || hitBox.bottom >= pipeOpening.bottom;

  return xCollision && yCollision;
}

/**
 * Checks if a bird has crossed a pipe.
 * @function pipeCrossed
 * @param {Bird} bird - The bird to check.
 * @param {Pipe} pipe - The pipe to check.
 */
function pipeCrossed(bird, pipe) {
  const hitBox = bird.toHitBox();
  if (hitBox.right >= pipe.leftEdge * CROSSING_THRESHOLD && pipe.active) {
    bird.score += 1;
  }
}

/**
 * Deactivates a pipe if a bird has passed it.
 * @function inactivatePipe
 * @param {Bird} bird - The bird to check.
 * @param {Pipe} pipe - The pipe to check.
 */
function inactivatePipe(bird, pipe) {
  const hitBox = bird.toHitBox();
  if (hitBox.left > pipe.rightEdge * COLLISION_TOLERANCE) {
    pipe.inactivate();
  }
}
