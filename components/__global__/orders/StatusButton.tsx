import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import GridBox from "components/layouts/GridBox"
import Stack from "components/layouts/Stack"
import { Portal } from "components/utils/Portal"
import React, { useRef } from "react"
import useToggle from "src/hooks/useToggle"
import tw from "twin.macro"
import OrderDetails from "./OrderDetails"

interface Props {
  status: string
}

const StatusButton = ({ status }: Props) => {
  const ref = useRef(null)
  const { isOpen, setIsOpen } = useToggle(ref)

  const onGoing = status === "on going"
  const ready = status === "ready"
  const STATUS = onGoing ? "error" : ready ? "warning" : "primary"

  return (
    <Stack>
      <Button fullWidth color={STATUS} onClick={() => setIsOpen(true)}>
        {status}
      </Button>

      <Portal open={isOpen}>
        <GridBox
          ref={ref}
          tw="place-items-center bg-black/40 z-20 fixed inset-0"
        >
          <Container
            ref={ref}
            css={[
              tw`bg-white absolute z-50 p-4 rounded-lg shadow-lg max-w-screen-md w-[calc(100%-25px)] md:w-full `,
              isOpen && tw`animate-fade-in`,
              isOpen === false && tw`animate-fade-out`,
            ]}
          >
            <OrderDetails />
            <Button color="error" onClick={() => setIsOpen(false)}>
              Close Modal
            </Button>
          </Container>
        </GridBox>
      </Portal>
    </Stack>
  )
}

export default StatusButton

// interface PortalProps {
//   children: ReactNode
//   isOpen: boolean | null
// }

// export function Portal({ children, isOpen }: PortalProps) {
//   const ref = useRef<Element | null>(null)
//   const [mounted, setMounted] = useState<boolean | null>(null)

//   useEffect(() => {
//     ref.current = document.querySelector<HTMLElement>("#box")
//     // setMounted(isOpen === null ? false : true)
//     setMounted(isOpen)
//   }, [isOpen, mounted])

//   return mounted && ref.current ? createPortal(children, ref.current) : null
// }
