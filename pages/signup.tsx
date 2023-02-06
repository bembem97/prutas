import Text from "components/datadisplay/Text"
import CircularProgress from "components/icons/CircularProgress"
import GoogleIcon from "components/icons/Google"
import LockIcon from "components/icons/Lock"
import UserIcon from "components/icons/User"
import Button from "components/inputs/Button"
import SignupField from "components/inputs/TextField/SignupField"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import SpinningProgress from "components/progress/SpinningProgress"
import Layout from "components/__global__/Layout"
import StartIcon from "components/__other__/StartIcon"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { EMAIL, NAME, PASSWORD } from "src/constant"
import { isErrorWithMessage } from "src/helpers/redux"
import { useSignupAccountMutation } from "src/redux/slices/auth"
import tw from "twin.macro"
import { authOptions } from "./api/auth/[...nextauth]"

interface SignUpTypes {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export default function SignUp() {
  const {
    handleSubmit,
    getValues,
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpTypes>()
  const router = useRouter()
  const [responseMessage, setResponseMessage] = useState<string | null>(null)

  const [userAccountInfo, result] = useSignupAccountMutation()

  const onSubmit = async (data: SignUpTypes) => {
    await userAccountInfo({
      name: data.name,
      email: data.email,
      password: data.password,
    })
  }

  useEffect(() => {
    if (
      result.status === "rejected" &&
      result.isError &&
      isErrorWithMessage(result.error)
    ) {
      setResponseMessage(result.error.data?.email)
    }

    if (result.isSuccess) {
      setResponseMessage(result.data.message)
      router.push("/signin")
    }
  }, [result, setResponseMessage, router])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      })
    }
  }, [isSubmitSuccessful, reset])

  // todo: AUTH
  const { data: session, status } = useSession()

  if (!session && status === "loading") {
    return <SpinningProgress />
  }

  if (session) {
    router.push("/")
    return
  }

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

          <Stack
            as="form"
            rowGap={3}
            tw="mb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SignupField
              startIcon={UserIcon}
              label="Name"
              errors={errors}
              name="name"
              register={register}
              requireMessage={NAME.REQUIRED}
              rules={{
                pattern: {
                  value: NAME.VALID.PATTERN,
                  message: NAME.VALID.MESSAGE,
                },
              }}
            />

            <SignupField
              label="Email"
              startIcon={UserIcon}
              errors={errors}
              name="email"
              register={register}
              requireMessage={EMAIL.REQUIRED}
              rules={{
                pattern: {
                  value: EMAIL.VALID.PATTERN,
                  message: EMAIL.VALID.MESSAGE,
                },
              }}
            />

            <SignupField
              label="Password"
              type="password"
              startIcon={LockIcon}
              errors={errors}
              name="password"
              register={register}
              requireMessage={PASSWORD.REQUIRED}
              rules={{
                pattern: {
                  value: PASSWORD.VALID.PATTERN,
                  message: PASSWORD.VALID.MESSAGE,
                },
              }}
            />

            <SignupField
              label="Repeat Password"
              type="password"
              startIcon={LockIcon}
              errors={errors}
              name="repeatPassword"
              register={register}
              requireMessage={PASSWORD.REQUIRED}
              rules={{
                validate: (value) => {
                  const password = getValues("password")
                  if (password !== value) {
                    return "Password didn't match."
                  }
                  return password === value
                },
              }}
            />

            {responseMessage && (
              <Text
                // color="error"
                align="center"
                tw="font-semibold rounded-md w-full block p-4"
                css={[
                  result.isSuccess && tw`text-green-900 bg-green-200`,
                  result.isError && tw`text-error-darker bg-error-lighter`,
                ]}
              >
                {responseMessage}
              </Text>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <CircularProgress width={3} height={3} />
              ) : (
                "Sign Up"
              )}
            </Button>
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getServerSession(context.req, context.res, authOptions)

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     }
//   }

//   return { props: { session } }
// }
