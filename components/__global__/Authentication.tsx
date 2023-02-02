import Close from "components/icons/Close"
import SignInLayout from "./SignInLayout"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import GridBox from "components/layouts/GridBox"
import { Portal } from "components/utils/Portal"
import React, { Dispatch, SetStateAction } from "react"
import tw from "twin.macro"

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean | null>>
  authRef?: React.MutableRefObject<null>
}

const Authentication: React.FC<Props> = ({ authRef, isOpen, setIsOpen }) => {
  return (
    <Portal open={isOpen}>
      <GridBox tw="place-items-center fixed inset-0 bg-black/40 z-20">
        <Container
          ref={authRef}
          maxWidth="md"
          css={[tw`relative`, isOpen && tw`animate-fade-in`]}
        >
          <Button
            buttonType="icon"
            tw="absolute top-6 right-3"
            color="error"
            onClick={() => setIsOpen(false)}
          >
            <Close width={3} height={3} fill="white" />
          </Button>

          <SignInLayout />
        </Container>
      </GridBox>
    </Portal>
  )
}

export default Authentication
