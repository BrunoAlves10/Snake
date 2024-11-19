import { motion } from "framer-motion";
import UnitScore from "./UnitScore"; 
import { useEffect, useState } from "react";
import axios from "axios";

interface Player {
  name: string
  score: string
}

export default function ScoreBoard() {
  const [players, setPlayers] = useState<Array<Player>>([])

  const getPlayers = () => {
    axios.get('http://localhost:3000/leaderboard').then((response) => {
      setPlayers(response.data.payload);
      console.log(players)
    })
  }

  useEffect(() => {
    getPlayers()
  }, []);

  return (
    <div className="flex flex-col items-center p-2 w-80 bg-[#003C44] border-4 border-gray-300 rounded-[15px] text-white shadow-lg ml-8 py-4">
      <motion.span
        className="bg-gradient-to-r from-[#00C2FF] to-[#00F418] bg-clip-text text-transparent text-3xl font-bold mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Leaderboard
      </motion.span>

      <div className="w-full text-center">
        <div className="flex justify-between py-0 px-4 font-semibold text-[#00C2FF] border-b border-gray-300">
          <p className="w-1/4">Rank</p>
          <p className="w-1/2">Name</p>
          <p className="w-1/2">Score</p>
        </div>

        {players.map((player: Player, index: number) => (
          <UnitScore 
            key={index} 
            rank={index+1} 
            tag={player.name} 
            score={player.score} 
          />
        ))}
      </div>
    </div>
  );
}
