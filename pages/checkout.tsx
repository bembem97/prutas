import Text from "components/datadisplay/Text"
import Container from "components/layouts/Container"
import SpinningProgress from "components/progress/SpinningProgress"
import CheckoutForms from "components/__global__/checkout/CheckoutForms"
import Layout from "components/__global__/Layout"
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
