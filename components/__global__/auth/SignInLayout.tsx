import Text from "components/datadisplay/Text"
import Google from "components/icons/Google"
import LockIcon from "components/icons/Lock"
import UserIcon from "components/icons/User"
import Button from "components/inputs/Button"
import SignInField from "components/inputs/TextField/SignInField"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import StartIcon from "components/__other__/StartIcon"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import tw from "twin.macro"
import CircularProgress from "components/icons/CircularProgress"

interface Props {
  signInError?: string
}

interface SignInTypes {
  email: string
  password: string
}

const SignInLayout: React.FC<Props> = ({ signInError }) => {
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
  } = useForm<SignInTypes>()
  const router = useRouter()

  const onSubmit = async (data: SignInTypes) => {
    try {
      await signIn("credentials", {
        ...data,
        callbackUrl: `${
          router.query.callbackUrl ||
          (router.query.id && `/product/${router.query.id}`) ||
          router.pathname ||
          "/"
        }`,
      })
    } catch (error) {
      throw new Error(error as string)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      })
    }
  }, [isSubmitSuccessful, reset])

  return (
    <Container maxWidth="md" tw="p-8 mt-4 bg-white rounded shadow-md">
      {/* //todo: SIGNIN WITH CREDENTIALS */}
      <Text variant="header" align="center" tw="mb-10">
        Sign In
      </Text>

      <Stack as="form" rowGap={3} tw="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <SignInField
          label="Email"
          startIcon={UserIcon}
          errors={errors}
          register={register}
          name="email"
        />

        <SignInField
          label="Password"
          type="password"
          startIcon={LockIcon}
          errors={errors}
          register={register}
          name="password"
        />

        {Boolean(signInError) && (
          <Text
            align="center"
            tw="font-semibold rounded-md w-full block p-4 text-error-darker bg-error-lighter"
          >
            {signInError}
          </Text>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress width={3} height={3} /> : "Sign In"}
        </Button>
      </Stack>

      {/* //todo: SIGNIN WITH OAUTH (GOOGLE) */}
      <Stack alignItems="center" rowGap={3}>
        <Text variant="subtitle" tw="font-bold" align="center">
          Or Sign In With:
        </Text>
        <Button
          color="warning"
          onClick={() =>
            signIn("google", {
              callbackUrl: router.query.callbackUrl as string,
            })
          }
        >
          <StartIcon icon={Google} buttonIcon>
            Google
          </StartIcon>
        </Button>
        {/* //todo: CREATE A CREDENTIAL ACCOUNT */}
        <Stack direction="row" columnGap={0.5} alignItems="center">
          <Text variant="subtitle">{"Don't have an account?"}</Text>

          <Link
            href="/signup"
            variant="subtitle"
            color="primary"
            tw="hover:!bg-transparent hover:underline"
          >
            Sign Up
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}

export default SignInLayout
