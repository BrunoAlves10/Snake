import React from "react";
import { GameBoard } from "./components/game/GameBoard";
import { NavBar } from "./components/nav/NavBar";
import LeaderBoard from "./components/leaderboard/LeaderBoard";

const App: React.FC = () => {
  return (
      <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <NavBar/>
          <div className="flex flex-row">
            <GameBoard/>
            <LeaderBoard/>
          </div>
        </div>
      </div>
  );
};

export default App;
