import tw from "twin.macro"
import React from "react"
import Card from "components/shared/surfaces/Card"
import Stack from "components/shared/containers/Stack"

const CardSkeleton = () => {
    return (
        <Card
            as="article"
            tw="animate-pulse flex flex-col gap-y-1 bg-slate-100"
        >
            <div tw="h-[150px] bg-slate-500"></div>

            <div tw="p-1">
                <div tw="rounded-full w-20 h-3 bg-slate-500 mb-1"></div>

                <Stack direction="row" justifyContent="between" tw="mb-2">
                    <div tw="rounded-full w-12 h-3 bg-slate-500"></div>
                    <div tw="rounded-full w-10 h-3 bg-slate-500"></div>
                </Stack>

                <div tw="rounded h-8 bg-slate-500"></div>
            </div>
        </Card>
    )
}

export default CardSkeleton
