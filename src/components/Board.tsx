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

function Board () {
  
  const [board, setBoard] = useState(createBoard())
  const [hasWon, setHasWon] = useState(false)

  const toggleAdjacent = (coords: string) => {
    console.log(coords)
    let nrows = board.length
    let ncols = board[0].length
    let updatedBoard = board
		let [ y, x ] = coords.split(',').map(Number);

		function flipCell(y: number, x: number) {
			// if this coord is actually on board, flip it
			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				updatedBoard[y][x] = updatedBoard[y][x] ? 0 : 1;
			}
		}

		flipCell(y, x); // flip initial cell
		flipCell(y, x - 1); // flip left cell
		flipCell(y, x + 1); // flip right cell
		flipCell(y + 1, x); // flip cell above
		flipCell(y - 1, x); // flip cell below

		// win when every cell is turned off
		let hasWon = updatedBoard.every((row) =>
			row.every((cell) => {
				return !!cell === false;
			})
		);
    console.log(updatedBoard)
    setBoard([...updatedBoard])
    setHasWon(hasWon)
  }
  const restartGame = () => {
    setBoard(createBoard())
    setHasWon(false)
  }

  const renderBoard = () => {
    return (
      <Container className={styles.boardTable}>
        {board.map((row, yIdx) => {
          return(
            <Row className={styles.row} key={`Row-${yIdx}`}>
              {row.map((col, xIdx) => {
                const coord = `${xIdx}, ${yIdx}`
                console.log({col})
                return (
                  <Col className={styles.col} key={`Column-${yIdx}`}>
                    <Square
                      key={coord}
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
          <h1 className={styles.modalContent}>Holy Shit You Won!!!!!</h1>
        </div>
      }
      <div>
        <header>
          <h1>Lights Out</h1>
          <p>Turn off all the lights</p>
        </header>
        {renderBoard()}
        <footer className={styles.footer}>
          <button 
            className={styles.button}
            onClick={(e) => {
            e.preventDefault()
            console.log('restarting')
            restartGame()
          }}>
            New Game
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Board