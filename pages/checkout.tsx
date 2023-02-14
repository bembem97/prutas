// import Text from "components/shared/datadisplay/Text"
import Container from "components/shared/containers/Container"
import SpinningProgress from "components/shared/progress/SpinningProgress"
import CheckoutForms from "components/global/checkout/CheckoutForms"
import Layout from "components/layout/Layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Checkout() {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (!session && status === "loading") {
        return (
            <Layout title="Sign In to view">
                <Container maxWidth="lg">
                    <SpinningProgress />
                </Container>
            </Layout>
        )
    }

    if (!session) {
        router.push({
            pathname: "/signin",
            query: { callbackUrl: `${window.location.origin}/checkout` },
        })

        return
    }

    return (
        <Layout title="Checkout">
            <Container maxWidth="lg">
                <CheckoutForms />
            </Container>
        </Layout>
    )
}
