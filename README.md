# Neural Network Flappy Bird

This project is an implementation of the popular game Flappy Bird, with a twist. Instead of being controlled by a human player, the bird in this game is controlled by a neural network. The neural network is trained using a genetic algorithm, with each generation of birds learning from the previous one.

## Overview

The bird's neural network takes as input the bird's current position and velocity, as well as the position of the next pipe. It outputs a two values, which determines whether the bird should flap its wings and move upwards.

The genetic algorithm randomly selects the birds, weighted by their fitness, from each generation to breed and produce the next generation. The fitness of a bird is determined by how far it manages to travel without hitting a pipe, ground or ceiling.

## Classes

The main classes in this project are:

- `Bird`: Represents a bird in the Flappy Bird game.
- `NNBird`: A subclass of `Bird` that is controlled by a neural network.
- `Brain`: Represents a neural network model used for prediction and mutation using tensorflow.js.
- `Population`: Represents a population of `NNBird` objects.
- `Pipe`: Represents a pipe obstacles in the Flappy Bird game.
- `Pipes`: Represents a collection of pipe obstacles in the Flappy Bird game.

## Getting Started

1. Clone the repository.
2. Navigate to the repository's directory using the terminal.
3. Type and run the following command into your terminal:

```zsh
$ python3 -m http.server
```

4. Visit http://localhost:8000 on your browser.
