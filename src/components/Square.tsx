import React from "react"
import { string } from "yargs"
import styles from './Square.module.css'

export interface SquareProps {
  coord: string,
  isOn: number,
  toggleAdjacent: (coords: string) => void
}

function Square({ coord, isOn, toggleAdjacent }: SquareProps) {
  const { on, off } = styles
  
  return (
    <div className={isOn ? on : off} onClick={() => toggleAdjacent(coord)}>

    </div>
  )
}

export default Square