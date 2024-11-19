import { motion } from "framer-motion";
import UnitScore from "./unitscore"; 

const players = [
  { rank: 1, name: "BRU", score: "1123124910" },
  { rank: 2, name: "GJG", score: "110929320" },
  { rank: 3, name: "ENR", score: "099213012" },
  { rank: 4, name: "JAO", score: "098301293" },
  { rank: 5, name: "GST", score: "085123023" },
  { rank: 6, name: "F90", score: "0821321393" },
  { rank: 7, name: "STV", score: "0731923921" },
  { rank: 8, name: "ABC", score: "0721302130" },
  { rank: 9, name: "7TI", score: "0693120321" },
  { rank: 10, name: "A10", score: "0631203129" },
];

export default function ScoreBoard() {
  return (
    <div className="flex flex-col items-center p-2 w-80 bg-[#003C44] border-4 border-gray-200 rounded-[15px] text-white shadow-lg ml-8 py-4">
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

        {players.map((player, index) => (
          <UnitScore 
            key={index} 
            rank={player.rank} 
            tag={player.name} 
            score={player.score} 
          />
        ))}
      </div>
    </div>
  );
}
