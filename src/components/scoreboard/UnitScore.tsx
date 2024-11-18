import { useState } from "react"

interface propsUnitScore {
  rank: number,
  tag: string,
  score: string
}

export default function UnitScore(props: propsUnitScore) {
  const {rank, tag, score} = props

  return (
    <>
      {rank === 1 ? <p>rank um</p> : ""}
      <div className="flex mt-2 mb-2 w-full">
        <p>{rank}</p>
        <p>{tag}</p>
        <p>{score}</p>
      </div>
    </>
  )
}