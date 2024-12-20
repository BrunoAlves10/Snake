/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import foodImage from '../../assets/food.png';
import food2Image from '../../assets/food2.png'
import bombImage from '../../assets/bomb.png';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import InputMask from 'react-input-mask';

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_WIDTH = 40; // Largura do grid (20 colunas)
const GRID_HEIGHT = 20; // Altura do grid (20 linhas)
let contadorMacas = 1;


function getRandomPosition() {
  return (
    {
    "type": (contadorMacas > 1) ? (contadorMacas % 5 === 0) ? "gold" : "red" : "red",
    "position": {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT)
      }
    }
  )
}

const getRandomPositionObstaculo = () => (
  {
    x: Math.floor(Math.random() * GRID_WIDTH),
    y: Math.floor(Math.random() * GRID_HEIGHT)
  });

const initializeSnake = (length: number) => {
  const rdp = getRandomPositionObstaculo();
  return Array.from({ length }, (_, i) => ({
    x: rdp.x - i,
    y: rdp.y
  }));
};

const initObstaculos = () => {
  const randomValue = Math.random() * (10 - 1) + 1;
  const listPositions = []
  for (let index = 0; index < randomValue; index++) {
    listPositions.push(getRandomPositionObstaculo())
  }

  return listPositions;
}


interface PropsGameBoard {
  lastRankScore: number,
  highScore: (score: number, name: string) => void
}

export function GameBoard(props: PropsGameBoard) {
  const [snake, setSnake] = useState(initializeSnake(1));
  const [aiSnake, setAiSnake] = useState(initializeSnake(1));
  const [food, setFood] = useState(getRandomPosition());
  const [obstaculos, setObstaculos] = useState(initObstaculos())
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [aiDirection, setAiDirection] = useState<Direction>("LEFT");
  const [nextDirection, setNextDirection] = useState<Direction | null>(null);
  const [speed, setSpeed] = useState(160);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const [newHighScore, setNewHighScore] = useState<boolean>(false);
  const [highScoreName, sethighScoreName] = useState<string>('')

  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const aiSnakeRef = useRef(aiSnake);
  const aiDirectionRef = useRef(aiDirection);

  // useEffect(() => {
  //   if (props.startGame == true) {
  //     setGameOver(false)
  //   }
  // },[props.startGame])

  useEffect(() => {
    snakeRef.current = snake;
    setScore(score + 1)
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
        // Andar com as Setas
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
        
        // Andar com WASD
        case "w":
          if (directionRef.current !== "DOWN") newDirection = "UP";
          break;
        case "s":
          if (directionRef.current !== "UP") newDirection = "DOWN";
          break;
        case "a":
          if (directionRef.current !== "RIGHT") newDirection = "LEFT";
          break;
        case "d":
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

    // Verifica colisão entre as cobras
    if (newSnake.some(segment => aiSnakeRef.current.some(s => s.x === segment.x && s.y === segment.y))) {
      setGameOver(true);
      return;
    }

    // Verifica colisão com os obstaculos
    if (obstaculos.some(segment => (segment.x === newHead.x && segment.y === newHead.y))) {
      if ((score - 1000) < 0) {
        setGameOver(true);
        return;
      } else {
        setScore(score - 1000)
        newSnake.pop();
        setObstaculos(initObstaculos())
      }
    }

    // Verifica se a cobra comeu o alimento
    if (newHead.x === food.position.x && newHead.y === food.position.y) {
      contadorMacas++;
      setFood(getRandomPosition()); // Move a maçã para uma nova posição aleatória
      if (food.type == "red") {
        setScore(score + 1000); // Incrementa o placar
      } else {
        setScore(score + 2000)
      }
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
        const distanceToFood = Math.abs(testHead.x - food.position.x) + Math.abs(testHead.y - food.position.y);
        const bestDistance = Math.abs(getNewHead(aiHead, bestDirection).x - food.position.x) + Math.abs(getNewHead(aiHead, bestDirection).y - food.position.y);
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
    if (newAiHead.x === food.position.x && newAiHead.y === food.position.y) {
      if (food.type == "gold") {
        contadorMacas++;
      }
      setFood(getRandomPosition()); // Move a maçã para uma nova posição aleatória
      //contadorMacas++;
    } else { 
      newAiSnake.pop();
    }

    // Verifica colisão entre as cobras
    if (newAiSnake.some(segment => snakeRef.current.some(s => s.x === segment.x && s.y === segment.y))) {
      setAiSnake(initializeSnake(1))
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
    if (newHighScore && highScoreName.length === 3 && highScoreName != "   "){
      props.highScore(score, highScoreName)
    }
    setNewHighScore(false)
    setSnake(initializeSnake(1));
    setAiSnake(initializeSnake(1));
    setFood(getRandomPosition());
    setDirection("RIGHT");
    setAiDirection("LEFT");
    setNextDirection(null);
    setScore(0)
    setSpeed(200);
    setGameOver(false)
    setFirstTime(false)
    contadorMacas = 0;
  };

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    animate(count, score, {
      duration: 1
    });
  }, [score]);

  const inputStyle: React.CSSProperties = {
    fontFamily: 'Arcade, sans-serif',
    fontSize: '1.5rem',
    letterSpacing: '0.5rem',
    textAlign: 'center',
    backgroundColor: '#FFFF',
    color: '#000',
    borderRadius: '8px',
    width: '90px',
  };

  useEffect(() => {
    if (score > props.lastRankScore) {
      setNewHighScore(true);
    }
  }, [score, props.lastRankScore]);
  
  return (
    <div>
      <div className="bg-blue-back w-[800px] h-fit border-[8px] border-gray-300 rounded-2xl shadow-lg relative">
        {
          gameOver
          ? (
            <div className='z-50 bg-opacity-40 bg-black flex flex-col justify-center items-center p-10 absolute right-0 left-0 top-0 bottom-0 rounded-[8px]'>
              <h1 className='font-bold text-4xl text-white'>
                {
                  firstTime ? "Bem-vindo ao SSSNAKE" : "Você perdeu o jogo!"
                }
              </h1>
              {
                newHighScore ? <div>
                  <h3 className='font-bold text-3xl text-white pt-3'>
                    Seu Score entrou para o LeaderBoard!
                  </h3>
                  <div className='flex items-center justify-center pt-3'>
                    <p className='font-bold text-2xl text-white pr-3'>
                      Adicione um nome:
                    </p>
                    <InputMask
                      mask="***"
                      maskChar=" "
                      alwaysShowMask={true}
                      style={inputStyle}
                      onChange={(name: any) => {
                        sethighScoreName(name.target.value)
                      }}
                    />
                  </div>
                </div> : ""
              }
              <button
                className="bg-yellow-300 px-8 py-2 rounded-md font-semibold mt-6"
                onClick={restartGame}
              >{firstTime ? "Começar a jogar" : "Jogar novamente"}</button>
            </div>
          ) : null
        }
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${GRID_HEIGHT}, minmax(0, 1fr))`,
                width: "100%",
                maxWidth: "800px",  // Ajusta a largura máxima para dar mais espaço horizontal
                aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`, // Mantém a proporção dos elementos
                padding: 6
              }}
            >
              {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, index) => {
                const x = index % GRID_WIDTH;
                const y = Math.floor(index / GRID_WIDTH);
                const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                const isAiSnake = aiSnake.some(segment => segment.x === x && segment.y === y);
                const isObstaculos = obstaculos.some(segment => segment.x === x && segment.y === y);
                const isFood = food.position.x === x && food.position.y === y;
              
                return (
                  <div
                    key={index}
                    className={`w-full h-full ${
                      isSnake ? "bg-[#F25227]" : 
                      isAiSnake ? "bg-[#966CFD]" :
                      isObstaculos ? "animate-bounce" :
                      isFood ? "animate-bounce" :
                      "border-[0.8px] border-blue-bd rounded-md"}`}
                    style={{
                      backgroundImage: isFood ? food.type == "red" ? `url(${foodImage})` : `url(${food2Image})` : isObstaculos ? `url(${bombImage})` : undefined , 
                      backgroundSize: "cover", //Para garantir que a imagem preencha todo o espaço
                    }}
                  ></div>
                );
              })}
          </div>
            
      </div>
      <section className='grid grid-flow-col justify-center gap-4 bg-[#003C44] border-[4px] border-gray-300 rounded-xl text-[#00F418] text-center font-jura text-5xl mt-6 p-6'>
        <motion.h1
          className='bg-gradient-to-r from-[#00C2FF] to-[#00F418] bg-clip-text text-transparent'
        >
          {rounded}
        </motion.h1>
        <h1>Pontos</h1>
      </section>
    </div>
  )
}