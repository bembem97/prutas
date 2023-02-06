import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import GridBox from "components/layouts/GridBox"
import Stack from "components/layouts/Stack"
import React, { useRef, useEffect } from "react"
import useToggle from "src/hooks/useToggle"
import tw from "twin.macro"
import useCountdown from "src/hooks/useCountdown"
import { useUpdateStatusMutation } from "src/redux/slices/orderDetails"
import dynamic from "next/dynamic"

const OrderDetails = dynamic(import("./OrderDetails"))

interface Props {
  id: string
  status: number
  dateOrdered: Date
}

const statusColor = [
  { color: "error", label: "On Going" },
  { color: "warning", label: "Ready" },
  { color: "primary", label: "Claimed" },
]

const StatusButton = ({ id, status, dateOrdered }: Props) => {
  const ref = useRef(null)
  const { isOpen, setIsOpen } = useToggle(ref)
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation()

  const extendTime = 1 * 1 * 4 * 60 * 1000

  const deliveryTime = new Date(dateOrdered).getTime() + extendTime
  const { days, hours, minutes, seconds } = useCountdown(deliveryTime)

  const countdown = days + hours + minutes + seconds
  const isReadyToClaim = timer(countdown, { status, current: 0 })

  useEffect(() => {
    if (isReadyToClaim) {
      updateStatus({ id, status: 1 })
    }
  }, [isReadyToClaim, updateStatus, id])

  return (
    <Stack>
      <Button
        fullWidth
        onClick={() => setIsOpen(true)}
        color={statusColor[status].color}
      >
        {statusColor[status].label}
      </Button>

      <GridBox
        tw="place-items-center bg-black/40 z-20 fixed inset-0 py-4"
        css={[isOpen === null && tw`hidden`]}
      >
        <Container
          ref={ref}
          css={[
            tw`bg-white absolute z-50 p-4 rounded-lg shadow-lg overflow-y-auto max-w-screen-md w-[calc(100%-25px)] md:w-full `,
            tw`max-h-[calc(100vh-24px)]`,
            isOpen && tw`animate-fade-in`,
            isOpen === false && tw`animate-fade-out`,
          ]}
        >
          <OrderDetails extendTime={extendTime} setOpen={setIsOpen} />
        </Container>
      </GridBox>
    </Stack>
  )
}

export default StatusButton

// todo: TIMER FUNCTION
interface TimerTypes {
  current: number
  status: number
}
export function timer(
  countdown: number,
  { current, status }: TimerTypes
): boolean {
  return countdown <= 0 && status === current
}
