import Text from "components/datadisplay/Text"
import Close from "components/icons/Close"
import Google from "components/icons/Google"
import LockIcon from "components/icons/Lock"
import UserIcon from "components/icons/User"
import Button from "components/inputs/Button"
import TextField from "components/inputs/TextField"
import Container from "components/layouts/Container"
import GridBox from "components/layouts/GridBox"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import { Portal } from "components/utils/Portal"
import StartIcon from "components/__other__/StartIcon"
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
          maxWidth="mobile"
          css={[
            tw`mt-4 bg-white rounded shadow-md p-8 relative`,
            isOpen && tw`animate-fade-in`,
          ]}
        >
          <Button
            buttonType="icon"
            tw="absolute top-1 right-1"
            color="error"
            onClick={() => setIsOpen(false)}
          >
            <Close width={3} height={3} fill="white" />
          </Button>
          {/* //todo: SIGNIN WITH CREDENTIALS */}
          <Text variant="header" align="center" tw="mb-10">
            Sign In
          </Text>

          <Stack as="form" rowGap={3} tw="mb-8">
            <TextField label="Username" startIcon={UserIcon} />

            <TextField label="Password" type="password" startIcon={LockIcon} />

            <Button>Sign In</Button>
          </Stack>

          {/* //todo: SIGNIN WITH OAUTH (GOOGLE) */}
          <Stack alignItems="center" rowGap={3}>
            <Text variant="subtitle" tw="font-bold" align="center">
              Or Sign In With:
            </Text>

            <Button color="warning">
              <StartIcon icon={Google} buttonIcon>
                Google
              </StartIcon>
            </Button>

            {/* //todo: CREATE A CREDENTIAL ACCOUNT */}
            <Stack direction="row" columnGap={0.5}>
              <Text variant="subtitle">{"Don't have an account?"}</Text>
              <Link href="/signup" variant="subtitle" color="primary">
                Sign Up
              </Link>
            </Stack>
          </Stack>
        </Container>
      </GridBox>
    </Portal>
  )
}

export default Authentication
