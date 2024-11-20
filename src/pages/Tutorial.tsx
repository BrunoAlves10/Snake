import { NavBar } from "../components/nav/NavBar"

export function Tutorial() {
  return (
    <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <NavBar/>
        <div className="w-[1100px] h-[500px] bg-slate-300 rounded-2xl p-6 overflow-y-auto text-black">
          <h1 className="text-2xl font-bold mb-4">Tutorial de Snake</h1>
          
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">🎮 Objetivo do Jogo</h2>
            <p>O objetivo do Snake é controlar uma cobra para comer maçãs e crescer o máximo possível sem se 
              chocar contra as paredes, o oponente ou até mesmo seu próprio corpo.</p>
          </section>
          
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">🕹️ Controles</h2>
            <ul className="list-disc pl-5">
              <li>⬆️ Seta para Cima: Mover para cima</li>
              <li>⬇️ Seta para Baixo: Mover para baixo</li>
              <li>⬅️ Seta para Esquerda: Mover para esquerda</li>
              <li>➡️ Seta para Direita: Mover para direita</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">🍎 Regras</h2>
            <ul className="list-disc pl-5">
              <li>Cada vez que a cobra come uma maçã, ela cresce</li>
              <li>O jogo termina se a cobra bater na parede ou em si mesma</li>
              <li>Quanto maior a cobra, mais pontos você ganha</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">🏆 Dicas para Pontuação Alta</h2>
            <ul className="list-disc pl-5">
              <li>Planeje seus movimentos com antecedência</li>
              <li>Mantenha-se longe das bordas da tela</li>
              <li>Evite movimentos rápidos e bruscos</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">🚀 Boa Sorte!</h2>
            <p>Divirta-se jogando Snake e tente bater seu recorde pessoal!</p>
          </section>
        </div>
      </div>
    </div>
  )
}