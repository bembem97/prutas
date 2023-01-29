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
import EmptyCartMessage from "components/__other__/EmptyCartMessage"
import React from "react"
import { useAppDispatch, useAppSelector } from "src/hooks/redux"
import {
  clearCart,
  decreaseAmount,
  increaseAmount,
  removeFromCart,
} from "src/redux/slices/cart"
import tw, { styled } from "twin.macro"

const ButtonLink = Button.withComponent(Link)

export const MiddleCell = styled(TableCell)(() => tw`text-center`)
export const LastCell = styled(TableCell)(() => tw`text-right`)

export default function Cart() {
  const { items: cartItems, total } = useAppSelector(
    (state) => state.slices.cart
  )
  const dispatch = useAppDispatch()

  return (
    <Layout title="Cart">
      <Container maxWidth="md" tw="pt-5">
        <Stack rowGap={3}>
          <Stack direction="row" justifyContent="between" alignItems="start">
            <Text variant="header">Shopping Cart</Text>

            {cartItems.length > 0 && (
              <Button color="error" onClick={() => dispatch(clearCart())}>
                Remove Items
              </Button>
            )}
          </Stack>

          {/* //todo: EMPTY CART MESSAGE */}
          {cartItems.length === 0 ? (
            <EmptyCartMessage />
          ) : (
            <>
              {/* //todo: CART WITH ITEMS */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell as="th">Product</TableCell>

                    <MiddleCell as="th">Quantity</MiddleCell>

                    <LastCell as="th">Subtotal</LastCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cartItems.map(({ product, amount }) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Stack direction="row" columnGap={1}>
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={60}
                            height={60}
                            square
                            objectFit="contain"
                          />

                          <Stack>
                            <Text variant="subtitle">{product.name}</Text>
                            <Text variant="subtitle">
                              &#8369;{product.price}
                            </Text>
                            <Button
                              buttonType="text"
                              color="error"
                              tw="text-xs"
                              onClick={() =>
                                dispatch(removeFromCart(product._id))
                              }
                            >
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
                          <Button
                            buttonType="icon"
                            onClick={() => dispatch(decreaseAmount(product))}
                            tw="pl-1"
                          >
                            <ArrowBack fill="white" height={2} width={2} />
                          </Button>

                          <Text
                            variant="caption"
                            tw="pr-1 flex justify-start font-bold"
                          >
                            {amount.quantity}
                          </Text>

                          <Button
                            buttonType="icon"
                            onClick={() => dispatch(increaseAmount(product))}
                          >
                            <ArrowForward fill="white" height={2} width={2} />
                          </Button>
                        </Stack>
                      </MiddleCell>

                      <LastCell>&#8369;{amount.subtotal}</LastCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell as="th"></TableCell>
                    <TableCell as="th" align="center">
                      Total
                    </TableCell>
                    <LastCell as="th">&#8369;{total}</LastCell>
                  </TableRow>
                </TableFooter>
              </Table>

              <Stack direction="row" justifyContent="end" alignItems="end">
                <ButtonLink href="/checkout">Proceed To Checkout</ButtonLink>
              </Stack>
            </>
          )}
        </Stack>
      </Container>
    </Layout>
  )
}

Cart.displayName = "Cart"
