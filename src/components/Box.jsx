import React from "react"
import { Rnd } from "react-rnd"

export const Box = () => {
  return (
    <Rnd
      ref={boxRef}
      style={styles}
      default={{
        x: 0,
        y: 0,
        width: 20,
        height: 20,
      }}
    />
  )
}
