import CircularProgress from "components/icons/CircularProgress"
import Stack from "components/layouts/Stack"
import React from "react"

const SpinningProgress = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <CircularProgress width={8} height={8} />
    </Stack>
  )
}

export default SpinningProgress
