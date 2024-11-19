import React, { useState, useEffect, useRef } from "react";
import ModalStartGame from "./components/modal/modal.startgame";
import { GameBoard } from "./components/game/GameBoard";
import { NavBar } from "./components/nav/NavBar";

const App: React.FC = () => {
  const [startGame, setStartGame] = useState(false);
  const [modalVisible, setModalVisible] = useState(true)
  const [label, setLabel] = useState<string | null>(null)
  
  return (
      <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <NavBar/>
          <GameBoard startGame={startGame} stopGame={(text) => {
            setStartGame(false)
            setModalVisible(true)
            setLabel(text)
          }}/>
        </div>
      </div>
  );
};

export default App;
