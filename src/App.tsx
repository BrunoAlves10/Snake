import React, { useState, useEffect, useRef } from "react";
import { GameBoard } from "./game/GameBoard";

const App: React.FC = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<number[]>([]); // Histórico de pontos

  

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center">
        <GameBoard />
        {gameOver && (
          <div className="mt-8">
            <div className="text-red-500 text-xl">Fim De Jogo</div>
            <button
              onClick={() => console.log('RESTART')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
