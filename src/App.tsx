import { useState, useEffect } from 'react';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import './App.css';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [loser, setLoser] = useState<string | null>(null)


  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setLoser(null)
  }

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }


  return (
    <div className="app">
      {loser === Colors.WHITE && <h1 className='loser'>Han perdido los blancos</h1>}
      {loser === Colors.BLACK && <h1 className='loser'>Han perdido los negros</h1>}
      <Timer currentPlayer={currentPlayer} restart={restart} loser={loser} setLoser={setLoser} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title={Colors.WHITE}
          figures={board.lostWhiteFigures}
        />
        <LostFigures
          title={Colors.BLACK}
          figures={board.lostBlackFigures} />
      </div>
    </div>
  );
}

export default App;
