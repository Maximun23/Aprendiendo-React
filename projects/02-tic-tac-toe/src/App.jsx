import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./Components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logics/board.js"
import { WinnerModal } from "./Components/WinnerModal.jsx"

function App() {
  console.log('render')
  const [board, setBoard] = useState(() => {
    console.log('inicializar estado')
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage) 
    return Array(9).fill(null)
  })
  const[turn, setTurn] = useState(TURNS.X)
  //null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn //x u o
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn ==  TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aquí partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return(
    <main className="board">
      <h1>Tik Tak Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return(
              <Square
              key={index}
              index={index} 
              updateBoard={updateBoard}
              >
                {square}
              </Square> 
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  ) 
}

export default App
