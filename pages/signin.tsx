import Container from "components/layouts/Container"
import Layout from "components/__global__/Layout"
import SignInLayout from "components/__global__/auth/SignInLayout"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import React from "react"
import tw from "twin.macro"
import { authOptions } from "./api/auth/[...nextauth]"

export default function SignIn({ signInError }: { signInError: string }) {
  return (
    <Layout title="Sign In">
      <Container maxWidth="sm">
        <SignInLayout signInError={signInError} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const signInError = context.query
  if (isSerializedError(signInError)) {
    return { props: { signInError: signInError.error } }
  }

  return { props: { session } }
}

interface WithErrorQuery {
  query: {
    error: string
  }
}

export function isSerializedError(query: unknown): query is WithErrorQuery {
  return typeof query === "object" && query != null && "error" in query
}
