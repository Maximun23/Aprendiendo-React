import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

import { Square } from "./Components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logics/board.js";
import { WinnerModal } from "./Components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logics/storage/index.js";
import {
  MusicEffectWin,
  MusicEffectX,
  MusicEffectO,
  MusicEffectDraw,
} from "./Components/SoundEffects.jsx";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  //null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);
  const [playXSound, setPlayXSound] = useState(false);
  const [playOSound, setPlayOSound] = useState(false);
  const [playDrawSound, setPlayDrawSound] = useState(false);

  useEffect(() => {
    if (playDrawSound) {
      // Reproduce el sonido de empate
      const timeout = setTimeout(() => setPlayDrawSound(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [playDrawSound]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setPlayXSound(false); // resetear el estado del sonido de X
    setPlayOSound(false); // resetear el estado del sonido de O
    setPlayDrawSound(false); // resetear el estado del sonido de empate

    resetGameStorage();
  };

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn; //x u o
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
      setPlayDrawSound(true);
    }

    // Reproducir sonido cuando se coloca una X
    if (turn === TURNS.X && newBoard[index] === TURNS.X) {
      setPlayXSound(true);
      setTimeout(() => setPlayXSound(false), 100); // Reiniciar el estado después de reproducir
    }
    // Reproducir sonido cuando se coloca una X
    if (turn === TURNS.O && newBoard[index] === TURNS.O) {
      setPlayOSound(true);
      setTimeout(() => setPlayOSound(false), 100); // Reiniciar el estado después de reproducir
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
      {winner && <MusicEffectWin />}
      <MusicEffectX play={playXSound} />
      <MusicEffectO play={playOSound} />
      {playDrawSound && <MusicEffectDraw />}
    </main>
  );
}

export default App;
