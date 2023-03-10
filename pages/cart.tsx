import Image from "components/shared/datadisplay/Image"
import Table from "components/shared/datadisplay/Table"
import TableBody from "components/shared/datadisplay/TableBody"
import TableCell from "components/shared/datadisplay/TableCell"
import TableFooter from "components/shared/datadisplay/TableFooter"
import TableHead from "components/shared/datadisplay/TableHead"
import TableRow from "components/shared/datadisplay/TableRow"
import Text from "components/shared/datadisplay/Text"
import ArrowBack from "components/shared/icons/ArrowBack"
import ArrowForward from "components/shared/icons/ArrowForward"
import Button from "components/shared/inputs/Button"
import Container from "components/shared/containers/Container"
import Stack from "components/shared/containers/Stack"
import Link from "components/shared/navigations/Link"
import Layout from "components/layout/Layout"
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
                    {/* //todo: EMPTY CART MESSAGE */}
                    {cartItems.length === 0 ? (
                        <EmptyCartMessage />
                    ) : (
                        <>
                            <Stack
                                direction="row"
                                alignItems="end"
                                justifyContent="between"
                                tw="flex-wrap gap-y-5 mt-5 md:mt-0 max-w-screen-mobile md:max-w-screen-lg w-full mx-auto"
                            >
                                <Text variant="header" tw="mb-0">
                                    Shopping Cart
                                </Text>
                                {cartItems.length > 0 && (
                                    <Stack
                                        direction="row"
                                        justifyContent="between"
                                        alignItems="start"
                                    >
                                        <Button
                                            color="error"
                                            onClick={() =>
                                                dispatch(clearCart())
                                            }
                                        >
                                            Remove Items
                                        </Button>
                                    </Stack>
                                )}
                            </Stack>
                            {/* //todo: CART WITH ITEMS */}
                            <Table tw="mx-auto">
                                <TableHead>
                                    <TableRow>
                                        <TableCell as="th">Product</TableCell>

                                        <MiddleCell as="th">
                                            Quantity
                                        </MiddleCell>

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
                                                <Stack
                                                    tw="md:flex-row"
                                                    columnGap={1}
                                                >
                                                    <figure tw="flex items-center justify-between font-bold before:md:hidden before:content-['Product']">
                                                        <Image
                                                            src={
                                                                product.imageUrl
                                                            }
                                                            alt={product.name}
                                                            width={150}
                                                            height={150}
                                                            square
                                                            objectFit="contain"
                                                            tw="w-40 h-40 md:w-[75px] md:h-[75px]"
                                                        />
                                                    </figure>

                                                    <Stack
                                                        rowGap={3}
                                                        tw="md:gap-y-1"
                                                    >
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
                                                            &#8369;
                                                            {product.price}
                                                        </Text>
                                                        <Button
                                                            buttonType="text"
                                                            color="error"
                                                            tw="text-xs before:md:hidden before:content-[''] flex justify-between md:inline-block"
                                                            onClick={() =>
                                                                dispatch(
                                                                    removeFromCart(
                                                                        product._id
                                                                    )
                                                                )
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
                                                        onClick={() =>
                                                            dispatch(
                                                                decreaseAmount(
                                                                    product
                                                                )
                                                            )
                                                        }
                                                        tw="pl-1"
                                                    >
                                                        <ArrowBack
                                                            fill="white"
                                                            height={2}
                                                            width={2}
                                                        />
                                                    </Button>

                                                    <Text
                                                        variant="caption"
                                                        tw="pr-1 flex justify-start font-bold"
                                                    >
                                                        {amount.quantity}
                                                    </Text>

                                                    <Button
                                                        buttonType="icon"
                                                        onClick={() =>
                                                            dispatch(
                                                                increaseAmount(
                                                                    product
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <ArrowForward
                                                            fill="white"
                                                            height={2}
                                                            width={2}
                                                        />
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
                                        <TableCell
                                            as="th"
                                            tw="hidden md:table-cell"
                                        ></TableCell>
                                        <TableCell
                                            as="th"
                                            align="center"
                                            tw="hidden md:table-cell"
                                        >
                                            Total
                                        </TableCell>
                                        <LastCell
                                            as="th"
                                            data-head="Total"
                                            tw="py-6 md:py-2"
                                        >
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
                                <ButtonLink
                                    href="/checkout"
                                    tw="w-full mobile:w-auto py-5 md:py-2"
                                >
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
