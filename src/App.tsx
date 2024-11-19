import React, { useState, useEffect, useRef } from "react";
import ModalStartGame from "./components/modal/modal.startgame";
import { GameBoard } from "./components/game/GameBoard";
import { NavBar } from "./components/nav/NavBar";
import ScoreBoard from "./components/scoreboard/ScoreBoard";

const App: React.FC = () => {
  return (
      <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <NavBar/>
          <div className="flex flex-row">
            <GameBoard/>
            <ScoreBoard/>
          </div>
        </div>
      </div>
  );
};

export default App;
