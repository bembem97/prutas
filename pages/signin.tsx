import Container from "components/shared/containers/Container"
import Layout from "components/layout/Layout"
import SignInLayout from "components/global/auth/SignInLayout"
// import { GetServerSideProps } from "next"
// import { getServerSession } from "next-auth"
// import { authOptions } from "./api/auth/[...nextauth]"
import React from "react"
import tw from "twin.macro"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import SpinningProgress from "components/shared/progress/SpinningProgress"

export default function SignIn() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const signInError = router.query?.error as string

    if (!session && status === "loading") {
        return <SpinningProgress />
    }

    if (session) {
        router.push("/")
        return
    }

    return (
        <Layout title="Sign In">
            <Container maxWidth="sm">
                <SignInLayout signInError={signInError} />
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

//   const signInError = context.query
//   if (isSerializedError(signInError)) {
//     return { props: { signInError: signInError.error } }
//   }

//   return { props: { session } }
// }

interface WithErrorQuery {
    query: {
        error: string
    }
}

export function isSerializedError(query: unknown): query is WithErrorQuery {
    return typeof query === "object" && query != null && "error" in query
}
