import Text from "components/datadisplay/Text"
import Google from "components/icons/Google"
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
import { useForm } from "react-hook-form"
import tw from "twin.macro"

export default function SignIn() {
  const {
    formState: { errors },
  } = useForm()
  return (
    <Layout title="Sign In">
      <Container maxWidth="lg">
        <Container
          maxWidth="sm"
          css={[tw`mt-4 bg-white rounded shadow-md p-8`]}
        >
          {/* //todo: SIGNIN WITH CREDENTIALS */}
          <Text variant="header" align="center" tw="mb-10">
            Sign In
          </Text>

          <Stack as="form" rowGap={3} tw="mb-8">
            <TextField label="Username" startIcon={UserIcon} errors={errors} />

            <TextField
              label="Password"
              type="password"
              startIcon={LockIcon}
              errors={errors}
            />

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
      </Container>
    </Layout>
  )
}
