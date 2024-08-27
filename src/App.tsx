import React, { useState, useEffect, useRef } from "react";
import foodImage from './assets/food.png'; // Corrija o caminho aqui

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_WIDTH = 30; // Largura do grid (30 colunas)
const GRID_HEIGHT = 20; // Altura do grid (20 linhas)
const INITIAL_SNAKE = [{ x: 15, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";

const App: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction | null>(null);
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      let newDirection: Direction | null = null;

      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") newDirection = "UP";
          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") newDirection = "DOWN";
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") newDirection = "LEFT";
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT") newDirection = "RIGHT";
          break;
      }

      if (newDirection && newDirection !== directionRef.current) {
        setNextDirection(newDirection);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      moveSnake(nextDirection || directionRef.current);
      setNextDirection(null);
    }, speed);

    return () => clearInterval(interval);
  }, [gameOver, speed, nextDirection]);

  const moveSnake = (currentDirection: Direction) => {
    const newSnake = [...snakeRef.current];
    const head = newSnake[0];

    let newHead;
    switch (currentDirection) {
      case "UP":
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case "DOWN":
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case "LEFT":
        newHead = { x: head.x - 1, y: head.y };
        break;
      case "RIGHT":
        newHead = { x: head.x + 1, y: head.y };
        break;
      default:
        newHead = head;
    }

    // Verifica colisão com paredes
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_WIDTH ||
      newHead.y < 0 ||
      newHead.y >= GRID_HEIGHT
    ) {
      setGameOver(true);
      return;
    }

    // Verifica colisão com o próprio corpo
    if (newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(newHead);

    // Verifica se a cobra comeu o alimento
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood({ x: Math.floor(Math.random() * GRID_WIDTH), y: Math.floor(Math.random() * GRID_HEIGHT) });
      setSpeed(speed => Math.max(50, speed - 10)); // Aumenta a velocidade a cada comida
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    setDirection(currentDirection);
  };

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 5, y: 5 });
    setDirection(INITIAL_DIRECTION);
    setNextDirection(null);
    setSpeed(200);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-800">
      <div className="text-white text-3xl mb-8">SSSNAKE</div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, minmax(0, 1fr))`,
          gap: "2px",
          width: "100%",
          maxWidth: "800px",  // Ajusta a largura máxima para dar mais espaço horizontal
          aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`, // Mantém a proporção dos elementos
        }}
      >
        {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, index) => {
          const x = index % GRID_WIDTH;
          const y = Math.floor(index / GRID_WIDTH);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={index}
              className={`w-full h-full ${isSnake ? "bg-green-500" : "bg-gray-900"}`}
              style={{
                backgroundImage: isFood ? `url(${foodImage})` : undefined,
                backgroundSize: "cover", // Para garantir que a imagem preencha todo o espaço
              }}
            ></div>
          );
        })}
      </div>
      {gameOver && (
        <div className="mt-8">
          <div className="text-red-500 text-xl">Fim De Jogo</div>
          <button
            onClick={restartGame}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
