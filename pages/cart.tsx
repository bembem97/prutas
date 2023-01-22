import Image from "components/datadisplay/Image"
import Table from "components/datadisplay/Table"
import TableBody from "components/datadisplay/TableBody"
import TableCell from "components/datadisplay/TableCell"
import TableFooter from "components/datadisplay/TableFooter"
import TableHead from "components/datadisplay/TableHead"
import TableRow from "components/datadisplay/TableRow"
import Text from "components/datadisplay/Text"
import ArrowBack from "components/icons/ArrowBack"
import ArrowForward from "components/icons/ArrowForward"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import Layout from "components/__global__/Layout"
import React from "react"
import tw, { styled } from "twin.macro"

const ButtonLink = Button.withComponent(Link)
export const MiddleCell = styled(TableCell)(() => tw`text-center`)
export const LastCell = styled(TableCell)(() => tw`text-right`)

const Cart: React.FC = () => {
  return (
    <Layout title="Cart">
      <Container maxWidth="md" tw="pt-5">
        {/* //todo: EMPTY CART MESSAGE */}
        {/* <Container tw="w-fit pt-10">
          <Stack alignItems="center" rowGap={2}>
            <Text variant="header" color="error.dark">
              Your Cart Is Empty
            </Text>
            <Button color="error">Continue Shopping</Button>
          </Stack>
        </Container> */}

        {/* //todo: CART WITH ITEMS */}

        <Stack rowGap={3}>
          <Stack direction="row" justifyContent="between" alignItems="start">
            <Text variant="header">Shopping Cart</Text>

            <Button color="error">Remove Items</Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell as="th">Product</TableCell>

                <MiddleCell as="th">Quantity</MiddleCell>

                <LastCell as="th">Subtotal</LastCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Stack direction="row" columnGap={1}>
                    <Image
                      src="/images/products/banana.svg"
                      alt="banana"
                      width={60}
                      height={60}
                      square
                      objectFit="contain"
                    />

                    <Stack>
                      <Text variant="subtitle">Banana</Text>
                      <Text variant="subtitle">&#8369;100</Text>
                      <Button buttonType="text" color="error" tw="text-xs">
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </TableCell>

                <MiddleCell>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columnGap={1.2}
                  >
                    <Button buttonType="icon" tw="pl-1">
                      <ArrowBack fill="white" height={2} width={2} />
                    </Button>

                    <Text
                      variant="caption"
                      tw="pr-1 flex justify-start font-bold"
                    >
                      2
                    </Text>

                    <Button buttonType="icon">
                      <ArrowForward fill="white" height={2} width={2} />
                    </Button>
                  </Stack>
                </MiddleCell>

                <LastCell>&#8369;200</LastCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Stack direction="row" columnGap={1}>
                    <Image
                      src="/images/products/mango.svg"
                      alt="mango"
                      width={60}
                      height={60}
                      square
                      objectFit="contain"
                    />
                    <Stack>
                      <Text variant="subtitle">Mango</Text>
                      <Text variant="subtitle">&#8369;120</Text>
                      <Button buttonType="text" color="error" tw="text-xs">
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </TableCell>

                <MiddleCell align="center">
                  <Stack direction="row" justifyContent="center">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      columnGap={1.2}
                    >
                      <Button buttonType="icon" tw="pl-1">
                        <ArrowBack fill="white" height={2} width={2} />
                      </Button>

                      <Text
                        variant="caption"
                        tw="pr-1 flex justify-start font-bold"
                      >
                        1
                      </Text>

                      <Button buttonType="icon">
                        <ArrowForward fill="white" height={2} width={2} />
                      </Button>
                    </Stack>
                  </Stack>
                </MiddleCell>

                <LastCell>&#8369;120</LastCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell as="th"></TableCell>
                <TableCell as="th" align="center">
                  Total
                </TableCell>
                <LastCell as="th">&#8369;320</LastCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Stack direction="row" justifyContent="end" alignItems="end">
            <ButtonLink href="/checkout">Proceed To Checkout</ButtonLink>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  )
}

Cart.displayName = "Cart"
export default Cart
