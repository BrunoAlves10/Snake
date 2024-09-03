import React, { useState, useEffect, useRef } from "react";
import { GameBoard } from "./components/game/GameBoard";

const App: React.FC = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<number[]>([]); // Histórico de pontos

  return (
    <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-10 flex items-start justify-between">
          <span className="bg-title bg-no-repeat w-full h-full">
            
          </span>
          <span>
            config/config/config
          </span>
        </div>
        <GameBoard />
        {gameOver && (
          <div className="mt-8">
            <div className="text-red-500 text-xl">Fim De Jogo</div>
            <button
              onClick={() => console.log("RESTART")}
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
