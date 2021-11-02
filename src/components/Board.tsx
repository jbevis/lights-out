import React, { useState, useEffect} from "react"
import styles from './Board.module.css'
import Square from './Square'
import { Container, Row, Col } from "react-grid-system"

export interface GameConfig {
  rows: number,
  cols: number,
  chanceLightIsOn: number
}

const defaultGameConfig: GameConfig = {
  rows: 5,
  cols: 5,
  chanceLightIsOn: 0.25
}

const createBoard = ({ rows, cols, chanceLightIsOn } = defaultGameConfig) => {
  let board = []

  for (let y = 0; y < rows; y++) {
    let row = []
    
    for (let x = 0; x < cols; x++) {
      row.push(Math.random() < chanceLightIsOn ? 1 : 0)
    }

    board.push(row)
  }

  return board
}

const Button = ({ handleClick, children }: any) => (
  <button 
    className={styles.button}
    onClick={(e) => {
    e.preventDefault()
    handleClick()
  }}>
    {children}
  </button>
)

function Board () {
  
  const [board, setBoard] = useState(createBoard())
  const [hasWon, setHasWon] = useState(false)
  const [moves, setMoves] = useState(0)

  const toggleAdjacent = (coords: string) => {
    let nrows = board.length
    let ncols = board[0].length
    let updatedBoard = board
		let [ x, y ] = coords.split(',').map(Number);

		const toggle = (y: number, x: number) => {
			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				updatedBoard[y][x] = updatedBoard[y][x] ? 0 : 1;
			}
		}

		toggle(y, x); 
		toggle(y, x - 1); 
		toggle(y, x + 1); 
		toggle(y + 1, x); 
		toggle(y - 1, x); 

		let hasWon = updatedBoard.every((row) =>
			row.every((cell) => {
				return !!cell === false;
			})
		);
    setBoard([...updatedBoard])
    setMoves(moves + 1)
    setHasWon(hasWon)
  }
  
  const restartGame = () => {
    setBoard(createBoard())
    setHasWon(false)
    setMoves(0)
  }

  const renderBoard = () => {
    return (
      <Container className={styles.boardTable}>
        {board.map((row, yIdx) => {
          return(
            <Row className={styles.row} key={`Row-${yIdx}`}>
              {row.map((col, xIdx) => {
                const coord = `${xIdx}, ${yIdx}`
                
                return (
                  <Col className={styles.col} key={coord}>
                    <Square
                      coord={coord}
                      isOn={col}
                      toggleAdjacent={toggleAdjacent}
                    />
                  </Col>
                )
              })}
            </Row>
          ) 
        })}
      </Container>
    )
  }
  return (
    <div className={styles.board}>
      {hasWon && 
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h1>Huzzah! You Won</h1>
            <p>...and it only took {moves} moves.</p>
            <Button handleClick={restartGame}>Try Again</Button>
          </div>
        </div>
      }
      <div>
        <header>
          <h1>Lights Out</h1>
          <p>Turn off all the lights</p>
        </header>
        <div className={styles.scoreboard}>
          Number of Moves: {moves}
        </div>
        {renderBoard()}
        <footer className={styles.footer}>
         <Button handleClick={restartGame}>
            New Game
         </Button>
        </footer>
      </div>
    </div>
  )
}

export default Board