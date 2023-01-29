import Text from "components/datadisplay/Text"
import GoogleIcon from "components/icons/Google"
import LockIcon from "components/icons/Lock"
import UserIcon from "components/icons/User"
import Button from "components/inputs/Button"
import TextField from "components/inputs/TextField"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import Layout from "components/__global__/Layout"
import StartIcon from "components/__other__/StartIcon"
import React from "react"
import tw from "twin.macro"

const SignUp: React.FC = () => {
  return (
    <Layout title="Sign Up">
      <Container maxWidth="lg">
        <Container
          maxWidth="sm"
          css={[tw`mt-4 bg-white rounded shadow-md p-8`]}
        >
          {/* //todo: SIGNUP WITH CREDENTIALS */}
          <Text variant="header" align="center" tw="mb-10">
            Sign Up
          </Text>

          <Stack as="form" rowGap={3} tw="mb-8">
            <TextField label="Name" startIcon={UserIcon} />

            <TextField label="Username" startIcon={UserIcon} />

            <TextField label="Password" type="password" startIcon={LockIcon} />

            <TextField
              label="Repeat Password"
              type="password"
              startIcon={LockIcon}
            />

            <Button>Sign Up</Button>
          </Stack>

          {/* //todo: SIGNIN WITH OAUTH (GOOGLE) */}
          <Stack alignItems="center" rowGap={3}>
            <Text variant="subtitle" tw="font-bold" align="center">
              Or Sign In With:
            </Text>

            <Button color="warning">
              <StartIcon icon={GoogleIcon} buttonIcon>
                Google
              </StartIcon>
            </Button>

            {/* //todo: CREATE A CREDENTIAL ACCOUNT */}
            <Stack direction="row" columnGap={0.5}>
              <Text variant="subtitle">{"Already have an account?"}</Text>
              <Link href="/signin" variant="subtitle" color="primary">
                Sign In
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Container>
    </Layout>
  )
}

export default SignUp
