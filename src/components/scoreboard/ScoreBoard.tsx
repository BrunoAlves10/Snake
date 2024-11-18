import { useEffect } from "react";
import UnitScore from "./UnitScore";
import { motion } from "framer-motion";

export default function ScoreBoard() {

  useEffect(() => {
    teste()
  }, [])

  const teste = () => {
    console.log('acesso')
  }

  return (
    <div className="flex flex-col  w-full items-center p-5 ml-5 h-100%  border-8 border-white border-solid bg-[#003C44] border-[6px] border-gray-200 rounded-md text-lg">
      <motion.span
        className='bg-gradient-to-r from-[#00C2FF] to-[#00F418] bg-clip-text text-transparent '
        key={0}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Leaderboard
      </motion.span>
      <UnitScore rank={1} tag="BTC" score="1000"/>
      <UnitScore rank={2} tag="BTC" score="2000"/>
      <UnitScore rank={3} tag="BTC" score="3000"/>
      <UnitScore rank={4} tag="BTC" score="4000"/>
    </div>
  );
}