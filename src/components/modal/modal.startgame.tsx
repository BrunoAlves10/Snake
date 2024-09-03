import { useState } from "react"

interface modalStartGameProps {
  children: React.ReactNode,
  start: () => void,
  open: boolean,
  label: string | null
}

export default function ModalStartGame(props: modalStartGameProps) {
  return (
    <div className="relative">
      {props.children}
      {
        props.open
        ? (
          <section className="bg-[#0000005e] absolute right-0 left-0 bottom-0 top-0 flex-1 flex items-center justify-center">
            <div className="bg-white w-[300px] h-60 rounded-md p-10 shadow-lg flex flex-col justify-center items-center">
              {
                props.label == null
                ? (
                  <div>
                    <h1 className="text-center">Bem vindo ao SSSNAKE</h1>
                    <p className="text-center text-sm text-gray-400">Um jogo desenvolvido por alunos da PUC Campinas</p>
                  </div>
                )
                : (
                  <h1>{props.label}</h1>
                )
              }
              <button
                className="bg-yellow-300 px-6 py-2 rounded-md font-semibold mt-10"
                onClick={props.start}
              >Começar a jogar</button>
            </div>
          </section>
        ) : null
      }
    </div>
  )
}