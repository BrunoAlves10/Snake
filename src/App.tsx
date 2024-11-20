import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { GameBoard } from "./components/game/GameBoard";
import { NavBar } from "./components/nav/NavBar";
import LeaderBoard from "./components/leaderboard/LeaderBoard";

interface Player {
  name: string
  score: number
}

const App: React.FC = () => {
  const [players, setPlayers] = useState<Array<Player>>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  const getPlayers = () => {
    try{
      axios.get('http://localhost:3000/leaderboard/leaders').then((response) => {
        setPlayers(response.data.payload);
        setLoaded(true)
      })
    } catch (e) {
      console.log("Erro ao consultar Leaderboard. Erro: ", e)
    }
  }

  const highScore = (score: number, name: string) => {
    console.log('--------------------')
    console.log(name)
    console.log(score)
    try{
      axios.post('http://localhost:3000/leaderboard/highscore', {name, score}).then((response) => {
        console.log(response)

      })
    } catch (e) {
      console.log("Erro ao cadastrar novo HighScore. Erro: ", e)
    }
  }

  useEffect(() => {
    getPlayers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  if (loaded){
    return (
      <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <NavBar/>
          <div className="flex flex-row">
            <GameBoard lastRankScore={players[players.length -1].score} highScore={highScore}/>
            <LeaderBoard players={players}/>
          </div>
        </div>
      </div>
  );
  } else {
    return (
      <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
        Carregando...
      </div>
    )
  }

};

export default App;
