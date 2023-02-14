import CircularProgress from "components/shared/icons/CircularProgress"
import React from "react"
import Stack from "../containers/Stack"

const SpinningProgress = () => {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <CircularProgress width={8} height={8} />
        </Stack>
    )
}

export default SpinningProgress
