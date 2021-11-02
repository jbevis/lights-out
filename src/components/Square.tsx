import React from "react"
import styles from './Square.module.css'

export interface SquareProps {
  coord: string,
  isOn: number,
  toggleAdjacent: (coords: string) => void
}

function Square({ coord, isOn, toggleAdjacent }: SquareProps) {
  const { square, on, off } = styles
  console.log(`${square} ${isOn ? on : off}`)
  return (
    <div className={`${square} ${isOn ? on : off}`} onClick={() => toggleAdjacent(coord)}>

    </div>
  )
}

export default Square