// Import necessary React modules and components
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { GetSnake } from "./Size";
import "./Snake.css";
import { Size, gamestart, start, scale, snakespeed, direction } from "./Timing";

// Define the Snake component
const Snake = () => {
  // Create a reference to the canvas element
  const canvasRef = useRef();

  // Initialize state variables using the useState hook
  const [snake, setSnake] = useState(gamestart);
  const [dir, setDir] = useState([0, -1]);
  const [eatfood, seteatfood] = useState(start);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Call the GetSnake function with a callback and speed parameter
  GetSnake(() => gamedata(), speed);

  // Function to handle game over
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  // Function to move the snake when a key is pressed
  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(direction[keyCode]);

  // Function to create new food for the snake
  const createeatfood = () =>
    eatfood.map((_a, i) => Math.floor(Math.random() * (Size[i] / scale)));

  // Function to check if the snake hits the wall or itself
  const stepcheck = (piece, snk = snake) => {
    if (
      piece[0] * scale >= Size[0] ||
      piece[0] < 0 ||
      piece[1] * scale >= Size[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  // Function to handle the result of the game (e.g., when the snake eats food)
  const resultgame = (newSnake) => {
    if (newSnake[0][0] === eatfood[0] && newSnake[0][1] === eatfood[1]) {
      let neweatfood = createeatfood();
      while (stepcheck(neweatfood, newSnake)) {
        neweatfood = createeatfood();
      }
      seteatfood(neweatfood);
      return true;
    }
    return false;
  };

  // Function to update the game data
  const gamedata = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (stepcheck(newSnakeHead)) endGame();
    if (!resultgame(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  // Function to start a new game
  const startGame = () => {
    setSnake(gamestart);
    seteatfood(start);
    setDir([0, -1]);
    setSpeed(snakespeed);
    setGameOver(false);
  };

  // useEffect hook to update the canvas with the current game state
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "blue";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "red";
    context.fillRect(eatfood[0], eatfood[1], 1, 1);
  }, [snake, eatfood, gameOver]);

  // Render the game components
  return (
    <div className="container">
      <h1>Snake Game</h1>
      <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
        <canvas
          style={{ border: "1px solid black" }}
          ref={canvasRef}
          width={`${Size[0]}px`}
          height={`${Size[1]}px`}
          className="box"
        />
        {gameOver && (
          <div className="over">
            <h1>GAME OVER!</h1>
          </div>
        )}
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

// Export the Snake component
export default Snake;
