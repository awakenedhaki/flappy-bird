# Flappy Bird Game

An implementation of the Flappy Bird game and genetic algorithm, using p5.js, and TensorFlowJS.

## Overview

The project contains several classes:

- `src`:
    - `Bird`: Represents the player-controlled bird.
    - `Pipe`: Represents the obstacles in the game.
    - `Pipes`: Manages a set of pipes in the game.
- `trainer`:
    - `NNBird`: Extends the Bird class and introduces a neural network-based bird.
    - `Population`: Handles the population of birds.
- `model`:
    - `Brain`: Represents the neural network used for prediction and mutation.

## Getting Started

1. Clone the repository.
2. Navigate to the repository's directory using the terminal.
3. Type and run the following command into your terminal:

```zsh
$ python3 -m http.server
```

4. Visit http://localhost:8000 on your browser.

## Project Architecture

```
.
├── README.md
├── index.html
├── style.css
├── model
│   └── brain.js
├── sketch.js
├── src
│   ├── bird.js
│   ├── pipe.js
│   └── pipes.js
├── trainer
│   ├── nnbird.js
│   └── population.js
└── utils.js
```