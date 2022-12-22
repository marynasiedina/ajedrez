import { FC, Fragment, useState, useEffect } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highLightCells()
  }, [selectedCell]);

  const click = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      swapPlayer()
      selectedCell.moveFigure(cell)
      setSelectedCell(null);
    }
    else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);

      }
    }
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  const highLightCells = () => {
    board.highLightCells(selectedCell)
    updateBoard()
  }


  return (
    <div>
      <h3 className='playerText'>Jugador(a) actual: {currentPlayer?.color === Colors.WHITE ? "Blanco" : "Negro"}</h3>
      <div className='board'>
        {
          board.cells.map((row, i) =>
            <Fragment key={i}>
              {row.map(cell =>
                <CellComponent
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                  cell={cell}
                  key={cell.id}
                  click={click}
                />
              )}
            </Fragment>)
        }
      </div>
    </div>
  );
}

export default BoardComponent;
