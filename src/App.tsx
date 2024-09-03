import React, { useState, useEffect, useRef } from "react";
import ModalStartGame from "./components/modal/modal.startgame";
import { GameBoard } from "./components/game/GameBoard";

const App: React.FC = () => {
  const [startGame, setStartGame] = useState(false);
  const [modalVisible, setModalVisible] = useState(true)
  const [label, setLabel] = useState<string | null>(null)

  return (
    <ModalStartGame label={label} open={modalVisible} start={() => {
      setModalVisible(false)
      setStartGame(true)
    }}>
      <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-10 flex items-start justify-between">
            <span className="bg-title bg-no-repeat w-full h-full">
              
            </span>
            <span>
              config/config/config
            </span>
          </div>
          <GameBoard startGame={startGame} stopGame={(text) => {
            setStartGame(false)
            setModalVisible(true)
            setLabel(text)
          }}/>
        </div>
      </div>
    </ModalStartGame>
  );
};

export default App;
