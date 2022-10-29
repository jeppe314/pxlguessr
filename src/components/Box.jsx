import React from "react"
import { Rnd } from "react-rnd"

export const Box = () => {
  const styles = {
    backgroundColor: "white",
  }
  return (
    <Rnd
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
