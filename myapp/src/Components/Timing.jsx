//  size of the box
const Size = [500, 400];
// from where game start
const gamestart = [
  [8, 7],
  [8, 8],
];
//  starting positions of game
const start = [7, 3];

const scale = 40;
// speed of snake
const snakespeed = 200;
// all directions of the moving snake
const direction = {
  38: [0, -1],
  40: [0, 1],
  37: [-1, 0],
  39: [1, 0],
};

export { Size, gamestart, start, scale, snakespeed, direction };
