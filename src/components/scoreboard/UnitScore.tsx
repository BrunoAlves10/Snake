interface PropsUnitScore {
  rank: number;
  tag: string;  // Agora usamos tag para exibir o nome
  score: string;
}

export default function UnitScore({ rank, tag, score }: PropsUnitScore) {
  return (
    <div className="flex justify-between py-2 px-4 text-lg hover:bg-[#004B54] transition-colors">
      <p className="w-1/4 text-center">{rank}</p>
      <p className="w-1/2 text-center">{tag}</p>
      <p className="w-1/2 text-center">{score}</p>
    </div>
  );
}
