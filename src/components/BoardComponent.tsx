import { FC, Fragment, useState, useEffect } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highLightCells()
  }, [selectedCell]);

  const click = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      setSelectedCell(null);
    }
    else {
      setSelectedCell(cell);
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
  );
}

export default BoardComponent;
