class Game {
  constructor() {
    this.population = new Population(N_BIRDS);
    this.pipes = new Pipes();
  }

  run() {
    // Players
    this.population.update();
    this.population.show();

    // Obstactles
    this.pipes.update();
    this.pipes.show();

    // Obstacle Management
    this.pipes.recyclePipe();

    // Game/Population Management
    this.population.forEach((bird, i) => {
      if (this.collision(bird, this.pipes.firstPipe)) {
        this.population.cull(i);
      }

      this.pipeCrossed(bird, this.pipes.firstPipe);
      this.inactivatePipe(bird, this.pipes.firstPipe);

      bird.predict(this.pipes.firstPipe);
    });

    // Selection + Mutation
    if (this.population.activeBirds.length === 0) {
      this.population.calculateFitness();

      const progeny = Population.nextGeneration(this.population.inactiveBirds);
      this.population.dispose();
      this.population = progeny;

      this.pipes = new Pipes();
    }
  }

  /**
   * Checks if a bird has collided with a pipe or the border.
   * @function collision
   * @param {Bird} bird - The bird to check for collisions.
   * @param {Pipe} pipe - The pipe to check for collisions.
   * @returns {boolean} - Returns true if a collision occurred, false otherwise.
   */
  collision(bird, pipe) {
    if (!pipe.active) {
      return false;
    }
    const hitBox = bird.toHitBox();
    const pipeOpening = pipe.toOpening();

    return (
      this.pipeCollision(hitBox, pipeOpening) || this.borderCollision(hitBox)
    );
  }

  /**
   * Checks if a bird has crossed a pipe.
   * @function crossing
   * @param {Bird} bird - The bird to check.
   * @param {Pipe} pipe - The pipe to check.
   */
  pipeCrossed(bird, pipe) {
    const hitBox = bird.toHitBox();
    if (hitBox.right >= pipe.leftEdge * CROSSING_THRESHOLD && pipe.active) {
      bird.score += 1;
    }
  }

  /**
   * Checks if a bird has collided with the border.
   * @function borderCollision
   * @param {Object} hitBox - The hitbox of the bird.
   * @returns {boolean} - Returns true if a collision with the border occurred, false otherwise.
   */
  borderCollision(hitBox) {
    return hitBox.top <= 0 || hitBox.bottom >= height;
  }

  /**
   * Checks if a bird has collided with a pipe.
   * @function pipeCollision
   * @param {Object} hitBox - The hitbox of the bird.
   * @param {Object} pipeOpening - The opening of the pipe.
   * @returns {boolean} - Returns true if a collision with the pipe occurred, false otherwise.
   */
  pipeCollision(hitBox, pipeOpening) {
    const xCollision = hitBox.right >= pipeOpening.left;
    const yCollision =
      hitBox.top <= pipeOpening.top || hitBox.bottom >= pipeOpening.bottom;

    return xCollision && yCollision;
  }

  /**
   * Deactivates a pipe if a bird has passed it.
   * @function inactivatePipe
   * @param {Bird} bird - The bird to check.
   * @param {Pipe} pipe - The pipe to check.
   */
  inactivatePipe(bird, pipe) {
    const hitBox = bird.toHitBox();
    if (hitBox.left > pipe.rightEdge * COLLISION_TOLERANCE) {
      pipe.inactivate();
    }
  }
}
