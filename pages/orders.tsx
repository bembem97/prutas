import Container from "components/shared/containers/Container"
import Layout from "components/layout/Layout"
import React from "react"
// import tw, { styled } from "twin.macro"
import { OrderDetailsTypes } from "src/models/OrderDetails"
import OrderHistory from "components/global/orders/OrderHistory"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import SpinningProgress from "components/shared/progress/SpinningProgress"

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
