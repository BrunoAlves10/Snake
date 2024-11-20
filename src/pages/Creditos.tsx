import { NavBar } from "../components/nav/NavBar";

export function Creditos() {
  return (
    <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <NavBar />
        <div className="w-[1100px] h-[500px] bg-slate-300 rounded-2xl p-6 overflow-y-auto text-black">
          <h1 className="text-2xl font-bold mb-4">Créditos</h1>
          
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">🎨 Design</h2>
            <p>Desenvolvido por Jorge Guilherme Ferreira</p>
            <p>Desenvolvido por João Paulo de Arrigo</p>
            <p>Desenvolvido por Gustavo de Campos Soares</p>
            <p>Desenvolvido por Bruno Fontolan Alves</p>
            <p>Desenvolvido por Enrico Farina ????</p>
          </section>
          
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">💻 Desenvolvimento</h2>
            <p>Código escrito com muito cuidado e paixão.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">❤️ Agradecimentos</h2>
            <p>Agradecemos a todos os jogadores que tornam este jogo especial.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
