import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { GameBoard } from "./components/game/GameBoard";
import { NavBar } from "./components/nav/NavBar";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import GifImage from './assets/snake-loading.gif'

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
        setTimeout(() => {setLoaded(true)},1000)
      })
    } catch (e) {
      console.log("Erro ao consultar Leaderboard. Erro: ", e)
    }
  }

  const highScore = (score: number, name: string) => {
    try{
      name = name.toUpperCase()
      axios.post('http://localhost:3000/leaderboard/highscore', {name, score}).then((res) => {
        console.log('RES:')
        console.log(res)
        getPlayers()
      })
    } catch (e) {
      console.log("Erro ao cadastrar novo HighScore. Erro: ", e)
    }
  }

  useEffect(() => {
    getPlayers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="bg-gradient flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
        <img className="w-28" src={GifImage} alt="" />
        <p className="text-slate-400 font-bold">Carregando...</p>
      </div>
    )
  }

};

export default App;
