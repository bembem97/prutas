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
      <Container maxWidth="md">
        <Stack rowGap={3}>
          {cartItems.length > 0 && (
            <Stack direction="row" justifyContent="between" alignItems="start">
              <Button color="error" onClick={() => dispatch(clearCart())}>
                Remove Items
              </Button>
            </Stack>
          )}

          {/* //todo: EMPTY CART MESSAGE */}
          {cartItems.length === 0 ? (
            <EmptyCartMessage />
          ) : (
            <>
              <Text variant="header">Shopping Cart</Text>
              {/* //todo: CART WITH ITEMS */}
              <Table tw="mx-auto">
                <TableHead>
                  <TableRow>
                    <TableCell as="th">Product</TableCell>

                    <MiddleCell as="th">Quantity</MiddleCell>

                    <LastCell as="th">Subtotal</LastCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cartItems.map(({ product, amount }) => (
                    <TableRow
                      key={product._id}
                      tw="flex flex-col gap-y-3 md:table-row"
                    >
                      <TableCell tw="block">
                        <Stack tw="md:flex-row" columnGap={1}>
                          <figure tw="flex items-center justify-between font-bold before:md:hidden before:content-['Product']">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              width={150}
                              height={150}
                              square
                              objectFit="contain"
                              tw="w-40 h-40 md:w-[75px] md:h-[75px]"
                            />
                          </figure>

                          <Stack rowGap={3} tw="md:gap-y-1">
                            <Text
                              variant="subtitle"
                              tw="before:md:hidden before:content-['Name'] before:font-bold flex justify-between md:inline-block"
                            >
                              {product.name}
                            </Text>
                            <Text
                              variant="subtitle"
                              tw="before:md:hidden before:content-['Price'] before:font-bold flex justify-between md:inline-block"
                            >
                              &#8369;{product.price}
                            </Text>
                            <Button
                              buttonType="text"
                              color="error"
                              tw="text-xs before:md:hidden before:content-[''] flex justify-between md:inline-block"
                              onClick={() =>
                                dispatch(removeFromCart(product._id))
                              }
                            >
                              Remove
                            </Button>
                          </Stack>
                        </Stack>
                      </TableCell>

                      <MiddleCell data-head="Quantity">
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

                      <LastCell data-head="Subtotal">
                        &#8369;{amount.subtotal}
                      </LastCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell as="th" tw="hidden md:table-cell"></TableCell>
                    <TableCell as="th" align="center" tw="hidden md:table-cell">
                      Total
                    </TableCell>
                    <LastCell as="th" data-head="Total" tw="py-6 md:py-2">
                      &#8369;{total}
                    </LastCell>
                  </TableRow>
                </TableFooter>
              </Table>

              <Stack
                direction="row"
                justifyContent="end"
                alignItems="end"
                tw="max-w-screen-mobile md:max-w-screen-md mx-auto w-full"
              >
                <ButtonLink href="/checkout" tw="w-full mobile:w-auto">
                  Proceed To Checkout
                </ButtonLink>
              </Stack>
            </>
          )}
        </Stack>
      </Container>
    </Layout>
  )
}

Cart.displayName = "Cart"
