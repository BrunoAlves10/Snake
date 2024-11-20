interface PropsUnitScore {
  rank: number;
  tag: string;  // Agora usamos tag para exibir o nome
  score: number;
}

export default function UnitScore({ rank, tag, score }: PropsUnitScore) {
  return (
    <div className="flex justify-between py-1.5 px-4 text-lg hover:bg-[#004B54] transition-colors">
      {rank == 1 ? <p className="w-1/4 text-center text-amber-300 font-semibold">{rank}</p> :
      (rank == 2 ? <p className="w-1/4 text-center text-zinc-400 font-semibold">{rank}</p> :
      (rank == 3 ? <p className="w-1/4 text-center text-amber-800 font-semibold">{rank}</p> :
      <p className="w-1/4 text-center font-semibold">{rank}</p>))}
      <p className="w-1/2 text-center font-semibold">{tag}</p>
      <p className="w-1/2 text-center font-semibold">{score}</p>
    </div>
  );
}
