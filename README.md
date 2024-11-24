# SSSnake - Game made with: TypeScript, Tailwind

Este é um jogo baseado em **Snake** desenvolvido com **TypeScript**, **Tailwind CSS**. O objetivo do jogo é sobreviver o máximo possível enquanto coleta comidas espalhadas pelo mapa para aumentar a pontuação e alcançar o maior rank no **Leaderboard**.

## Sobre o Jogo

O jogo possui duas cobras:
1. **Cobra controlada pelo usuário**: A cobra que você controla com as teclas de direção (cima, baixo, esquerda, direita).
2. **Cobra controlada pela IA**: A IA tentará competir com você, tentando se alimentar e sobreviver.

O objetivo é pegar o máximo de comida e aumentar a pontuação para alcançar o topo do **Leaderboard**. A cada comida que você pega, sua cobra cresce e a pontuação aumenta.
Enquanto isso você deve batalhar ou fugir da cobra rival, equanto desvia de diversos obstaculos presentes no mapa.

### Regras do Jogo
- Sobreviva o maior tempo possível.
- Colete comida para aumentar sua pontuação.
- Fique atento à cobra rival, pois ela também está tentando sobreviver.
- O jogo é finalizado quando você colide com o corpo da sua cobra no seu rival ou com as paredes.

## Tecnologias Usadas

- **TypeScript**: Para garantir a tipagem estática e maior segurança no desenvolvimento.
- **Tailwind CSS**: Utilizado para a estilização do jogo de forma rápida e eficiente.
- **Vite**: Ferramenta de bundling que permite um desenvolvimento rápido e otimizado.
- **Framer Motion**: Biblioteca usada para animações fluídas dentro do jogo, incluindo animação da pontuação.

## Setup do Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/BrunoAlves10/Snake.git
   cd local_da_pasta
   npm install
   npm run dev
  