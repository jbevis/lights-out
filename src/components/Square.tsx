import React from "react"
import styles from './Square.module.css'

export interface SquareProps {
  coord: string,
  isOn: number,
  toggleAdjacent: (coords: string) => void
}

function Square({ coord, isOn, toggleAdjacent }: SquareProps) {
  const { square, on, off } = styles
  
  return (
    <div className={`${square} ${isOn ? on : off}`} onClick={() => toggleAdjacent(coord)}>

    </div>
  )
}

export default Square