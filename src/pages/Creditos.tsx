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

export function Creditos() {
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
            Créditos
          </motion.h1>
        </div>
        <div className="w-[1150px] h-[540px] bg-[#003C44] rounded-2xl p-6 overflow-y-auto scrollbar-hide text-white border-4 border-gray-300">
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>🎨</AnimatedEmoji> Design
            </h2>
            <ul className="list-disc pl-5 text-lg">
              <li>Desenvolvido por Guilherme Ferreira Jorge</li>
              <li>Desenvolvido por João Paulo Toledo de Almeida Arrigo</li>
              <li>Desenvolvido por Gustavo de Campos Soares</li>
              <li>Desenvolvido por Bruno Fontolan Alves</li>
              <li>Desenvolvido por Enrico Ribeiro Farina</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>💻</AnimatedEmoji> Desenvolvimento
            </h2>
            <p className="text-lg">
              Código escrito com muito cuidado e paixão.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              <AnimatedEmoji>❤️</AnimatedEmoji> Agradecimentos
            </h2>
            <p className="text-lg">
              Agradecemos a todos os jogadores que tornam este jogo especial.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
