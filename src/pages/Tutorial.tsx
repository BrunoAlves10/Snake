import { NavBar } from "../components/nav/NavBar";
import { motion } from "framer-motion";

// Componente para Emoji Animado com Bounce Simples (Pulo Único)
const AnimatedEmoji = ({ children }) => {
  return (
    <motion.span
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

export function Tutorial() {
  return (
    <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <NavBar />
        <div className="flex flex-col items-center justify-center">
          <motion.h1
            className="bg-gradient-to-r from-[#00C2FF] to-[#00F418] bg-clip-text text-transparent text-4xl font-bold mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tutorial de Snake
          </motion.h1>
        </div>
        <div className="w-[1150px] h-[540px] bg-[#003C44] rounded-2xl p-6 overflow-y-auto scrollbar-hide text-white border-4 border-gray-300">
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>🎮</AnimatedEmoji> Objetivo do Jogo
            </h2>
            <p className="text-lg">
              O objetivo do Snake é controlar uma cobra para comer maçãs e crescer o máximo possível sem se 
              chocar contra as paredes, o oponente ou até mesmo seu próprio corpo.
            </p>
          </section>
          
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>🕹️</AnimatedEmoji> Controles
            </h2>
            <ul className="list-disc pl-5 text-lg">
              <li><AnimatedEmoji>⬆️</AnimatedEmoji> Seta para Cima ou W: Mover para cima</li>
              <li><AnimatedEmoji>⬇️</AnimatedEmoji> Seta para Baixo ou S: Mover para baixo</li>
              <li><AnimatedEmoji>⬅️</AnimatedEmoji> Seta para Esquerda ou A: Mover para esquerda</li>
              <li><AnimatedEmoji>➡️</AnimatedEmoji> Seta para Direita ou D: Mover para direita</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>🍎</AnimatedEmoji> Regras
            </h2>
            <ul className="list-disc pl-5 text-lg">
              <li>Cada vez que a cobra come uma maçã, ela cresce e ganha 1.000 pontos</li>
              <li>O jogo termina se a cobra bater na parede ou em si mesma</li>
              <li>Quanto mais tempo você ficar vivo, mais pontos você ganha</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>🏆</AnimatedEmoji> Dicas para Pontuação Alta
            </h2>
            <ul className="list-disc pl-5 text-lg">
              <li>Planeje seus movimentos com antecedência</li>
              <li>Mantenha-se longe das bordas da tela</li>
              <li>Evite movimentos rápidos e bruscos</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>🚀</AnimatedEmoji> Boa Sorte!
            </h2>
            <p className="text-lg">Divirta-se jogando Snake e tente bater seu recorde pessoal!</p>
          </section>
        </div>
      </div>
    </div>
  );
}
