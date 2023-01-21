import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Layout from "components/__global__/Layout"
import React from "react"
import tw from "twin.macro"

const Cart: React.FC = () => {
  return (
    <Layout title="Cart">
      <Container maxWidth="lg">
        {/* //todo: EMPTY CART MESSAGE */}
        <Container tw="w-fit pt-10">
          <Stack alignItems="center" rowGap={2}>
            <Text variant="header" color="error.dark">
              Your Cart Is Empty
            </Text>
            <Button color="error">Continue Shopping</Button>
          </Stack>
        </Container>
      </Container>
    </Layout>
  )
}

Cart.displayName = "Cart"
export default Cart
