import React from "react"
import PuffLoader from "react-spinners/PuffLoader"

export const Spinner = (loading) => {
  return (
    <PuffLoader
      cssOverride={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      color={"#da3c3c"}
      loading={loading}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}
