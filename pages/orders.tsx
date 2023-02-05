import Container from "components/layouts/Container"
import Layout from "components/__global__/Layout"
import React from "react"
// import tw, { styled } from "twin.macro"
import { OrderDetailsTypes } from "src/models/OrderDetails"
import OrderHistory from "components/__global__/orders/OrderHistory"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import SpinningProgress from "components/progress/SpinningProgress"

export const OrderDetailsContext =
  React.createContext<OrderDetailsTypes | null>(null)

export default function Orders() {
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
      query: { callbackUrl: `${window.location.origin}/orders` },
    })
    return
  }

  return (
    <Layout title="Order">
      <Container maxWidth="lg">
        <OrderHistory />
      </Container>
    </Layout>
  )
}
