import { useEffect, useRef, useState } from 'react';
import foodImage from '../../assets/food.png';

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_WIDTH = 40; // Largura do grid (20 colunas)
const GRID_HEIGHT = 20; // Altura do grid (20 linhas)

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_WIDTH),
  y: Math.floor(Math.random() * GRID_HEIGHT)
});

const initializeSnake = (length: number) => {
  const position = getRandomPosition();
  return Array.from({ length }, (_, i) => ({
    x: position.x - i,
    y: position.y
  }));
}; 

export function GameBoard() {
  const [snake, setSnake] = useState(initializeSnake(1));
  const [aiSnake, setAiSnake] = useState(initializeSnake(1));
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [aiDirection, setAiDirection] = useState<Direction>("LEFT");
  const [nextDirection, setNextDirection] = useState<Direction | null>(null);
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<number[]>([]); // Histórico de pontos

  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const aiSnakeRef = useRef(aiSnake);
  const aiDirectionRef = useRef(aiDirection);

  useEffect(() => {
    snakeRef.current = snake;
    
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
    
  }, [direction]);

  useEffect(() => {
    aiSnakeRef.current = aiSnake;
  }, [aiSnake]);

  useEffect(() => {
    aiDirectionRef.current = aiDirection;
  }, [aiDirection]);

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
      moveAiSnake();
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
    // if (
    //   newHead.x < 0 ||
    //   newHead.x >= GRID_WIDTH ||
    //   newHead.y < 0 ||
    //   newHead.y >= GRID_HEIGHT
    // ) {
    //   setGameOver(true);
    //   return;
    // }

    if (newHead.y >= GRID_HEIGHT) {
      if (snake.length > 1) {
        let listSnake = snake;
        listSnake.shift()
        setSnake([{x: snake[0].x, y: 0},...listSnake])        
      } else {
        setSnake([{x: snake[0].x, y: 0}])
      }
      return;
    }

    if (newHead.y <= 0) {
      if (snake.length > 1) {
        let listSnake = snake;
        listSnake.shift()
        setSnake([{x: snake[0].x, y: GRID_HEIGHT},...listSnake])        
      } else {
        setSnake([{x: snake[0].x, y: GRID_HEIGHT}])
      }
      return;
    }
    
    if (newHead.x >= GRID_WIDTH) {
      if (snake.length > 1) {
        let listSnake = snake;
        listSnake.shift()
        setSnake([{x: 0, y: snake[0].y},...listSnake])        
      } else {
        setSnake([{x: 0, y: snake[0].y}])
      }
      return;
    }

    if (newHead.x <= 0) {
      if (snake.length > 1) {
        let listSnake = snake;
        listSnake.shift()
        setSnake([{x: GRID_WIDTH, y: snake[0].y},...listSnake])        
      } else {
        setSnake([{x: GRID_WIDTH, y: snake[0].y}])
      }
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
      setFood(getRandomPosition()); // Move a maçã para uma nova posição aleatória
      setScore(score => score + 1); // Incrementa o placar
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    setDirection(currentDirection);
  };

  const moveAiSnake = () => {
    const aiSnake = aiSnakeRef.current;
    const aiHead = aiSnake[0];

    // Simples IA: move em direção à comida
    let newAiDirection: Direction = aiDirectionRef.current;

    const possibleDirections: any = ["UP", "DOWN", "LEFT", "RIGHT"].filter(dir => {
      const testHead = getNewHead(aiHead, dir);
      return !aiSnake.some(segment => segment.x === testHead.x && segment.y === testHead.y) &&
             testHead.x >= 0 && testHead.x < GRID_WIDTH && testHead.y >= 0 && testHead.y < GRID_HEIGHT;
    });

    if (possibleDirections.length > 0) {
      newAiDirection = possibleDirections.reduce((bestDirection: any, dir: any) => {
        const testHead = getNewHead(aiHead, dir);
        const distanceToFood = Math.abs(testHead.x - food.x) + Math.abs(testHead.y - food.y);
        const bestDistance = Math.abs(getNewHead(aiHead, bestDirection).x - food.x) + Math.abs(getNewHead(aiHead, bestDirection).y - food.y);
        return distanceToFood < bestDistance ? dir : bestDirection;
      }, possibleDirections[0]);
    }

    const newAiSnake = [...aiSnake];
    const newAiHead = getNewHead(aiHead, newAiDirection);

    // Verifica colisão com paredes
    if (
      newAiHead.x < 0 ||
      newAiHead.x >= GRID_WIDTH ||
      newAiHead.y < 0 ||
      newAiHead.y >= GRID_HEIGHT
    ) {
      setGameOver(true);
      return;
    }

    // Verifica colisão com o próprio corpo
    if (newAiSnake.some((segment) => segment.x === newAiHead.x && segment.y === newAiHead.y)) {
      setGameOver(true);
      return;
    }

    newAiSnake.unshift(newAiHead);

    // Verifica se a cobra IA comeu o alimento
    if (newAiHead.x === food.x && newAiHead.y === food.y) {
      setFood(getRandomPosition()); // Move a maçã para uma nova posição aleatória
    } else {
      newAiSnake.pop();
    }

    // Verifica colisão entre as cobras
    if (newAiSnake.some(segment => snakeRef.current.some(s => s.x === segment.x && s.y === segment.y))) {
      setGameOver(true);
      return;
    }

    setAiSnake(newAiSnake);
    setAiDirection(newAiDirection);
  };

  const getNewHead = (head: { x: number, y: number }, direction: Direction | string) => {
    switch (direction) {
      case "UP":
        return { x: head.x, y: head.y - 1 };
      case "DOWN":
        return { x: head.x, y: head.y + 1 };
      case "LEFT":
        return { x: head.x - 1, y: head.y };
      case "RIGHT":
        return { x: head.x + 1, y: head.y };
      default:
        return head;
    }
  };

  const restartGame = () => {
    setSnake(initializeSnake(1));
    setAiSnake(initializeSnake(1));
    setFood(getRandomPosition());
    setDirection("RIGHT");
    setAiDirection("LEFT");
    setNextDirection(null);
    setSpeed(200);
    setGameOver(false);
    setScoreHistory(history => [score, ...history].slice(0, 10)); // Adiciona o score ao histórico e limita a 10 itens
    setScore(0); // Reseta o placar
  };
  
  return (
    <div className="bg-blue-back w-[800px] h-fit border-[12px] border-gray-300 rounded-2xl shadow-lg">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${GRID_HEIGHT}, minmax(0, 1fr))`,
              width: "100%",
              maxWidth: "800px",  // Ajusta a largura máxima para dar mais espaço horizontal
              aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`, // Mantém a proporção dos elementos
            }}
          >
            {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, index) => {
              const x = index % GRID_WIDTH;
              const y = Math.floor(index / GRID_WIDTH);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isAiSnake = aiSnake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              return (
                <div
                  key={index}
                  className={`w-full h-full ${
                    isSnake ? "bg-[#5620DB]" : 
                    isAiSnake ? "bg-[#F25227]" : 
                    "rounded-md border-[0.5px] border-blue-bd"}`}
                  style={{
                    backgroundImage: isFood ? `url(${foodImage})` : undefined,
                    backgroundSize: "cover", // Para garantir que a imagem preencha todo o espaço
                  }}
                ></div>
              );
            })}
          </div>
        </div>
  )
}