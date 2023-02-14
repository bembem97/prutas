import tw, { styled } from "twin.macro"
import Text from "components/shared/datadisplay/Text"
import Container from "components/shared/containers/Container"
import GridBox from "components/shared/containers/GridBox"
import React, { useEffect } from "react"
import Stack from "components/shared/containers/Stack"
import Button from "components/shared/inputs/Button"
import TextField from "components/shared/inputs/TextField"
import Link from "components/shared/navigations/Link"
// import TableRow from "components/datadisplay/TableRow"
// import Table from "components/datadisplay/Table"
// import TableHead from "components/datadisplay/TableHead"
// import TableCell from "components/datadisplay/TableCell"
// import TableBody from "components/datadisplay/TableBody"
// import TableFooter from "components/datadisplay/TableFooter"
import { useAppDispatch, useAppSelector } from "src/hooks/redux"
import EmptyCartMessage from "components/__other__/EmptyCartMessage"
import { useForm } from "react-hook-form"
import {
    ADDRESS,
    CARDHOLDER,
    CARDNUMBER,
    CITY,
    CONTACT,
    MONTH,
    NAME,
    SECURITYCODE,
    YEAR,
    ZIPCODE,
} from "src/constant"
import { useAddOrderMutation } from "src/redux/slices/orderDetails"
import CircularProgress from "components/shared/icons/CircularProgress"
import { useRouter } from "next/router"
import { clearCart } from "src/redux/slices/cart"
import { useSession } from "next-auth/react"
// import { LastCell, MiddleCell } from "pages/cart"

export interface FormTypes {
    name: string | ""
    contactNumber: number | ""
    address: string | ""
    city: string | ""
    zipCode: string | ""
    cardNumber: number | ""
    cardHolder: string | ""
    securityCode: number | ""
    month: number | ""
    year: number | ""
}

const MiddleCell = styled("td")(() => tw`text-center`)
const LastCell = styled("td")(() => tw`text-right`)

const ButtonLink = Button.withComponent(Link)

const CheckoutForms = () => {
    const session = useSession()
    const router = useRouter()

    const [addOrder, result] = useAddOrderMutation()
    const dispatch = useAppDispatch()

    const { items, quantity, total } = useAppSelector(
        (state) => state.slices.cart
    )
    const {
        register,
        formState,
        formState: { errors, isSubmitSuccessful },
        handleSubmit,
        getValues,
        reset,
    } = useForm<FormTypes>({
        defaultValues: {
            name: "",
            contactNumber: "",
            address: "",
            city: "",
            zipCode: "",
            cardNumber: "",
            cardHolder: "",
            securityCode: "",
            month: "",
            year: "",
        },
    })

    let sanitizeData: FormTypes

    const onSubmit = async (data: FormTypes) => {
        // todo: SANITIZE DATA FIRST
        const sanitize = (value: string | number) => {
            if (typeof value === "string") {
                return value.replace(/\s+/g, " ").trim()
            }
            return value
        }

        Object.keys(data).forEach((key) => {
            sanitizeData = {
                ...sanitizeData,
                [key]: sanitize(data[key as keyof FormTypes]),
            }
        })

        const expirationDate = new Date(
            sanitizeData.year as number,
            (sanitizeData.month as number) - 1
        )

        const products = items.map((item) => ({
            product: item.product._id,
            amount: item.amount,
        }))

        const orderDetails = {
            user: session.data?.user.id,
            customer: {
                name: sanitizeData.name,
                contactNumber: sanitizeData.contactNumber,
                address: {
                    street: sanitizeData.address,
                    city: sanitizeData.city,
                    zipCode: sanitizeData.zipCode,
                },
                card: {
                    cardNumber: sanitizeData.cardNumber,
                    cardHolder: sanitizeData.cardHolder,
                    securityCode: sanitizeData.securityCode,
                    expirationDate,
                },
            },
            items: {
                quantity,
                total,
                products,
            },
        }

        await addOrder(orderDetails)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                name: "",
                contactNumber: "",
                address: "",
                city: "",
                zipCode: "",
                cardNumber: "",
                cardHolder: "",
                securityCode: "",
                month: "",
                year: "",
            })
        }
    }, [reset, formState, isSubmitSuccessful])

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(clearCart())
            router.push("/orders")
        }
    }, [result.isSuccess, router, dispatch])

    return (
        <>
            {result.isSuccess ? (
                <Container>
                    <Stack direction="row" justifyContent="center">
                        <Stack alignItems="center">
                            <Text
                                variant="header"
                                tw="text-green-600 font-bold text-center"
                            >
                                Transaction is successful!
                            </Text>

                            <Text
                                variant="title"
                                tw="text-green-600 font-bold text-center"
                            >
                                You are being redirected.
                            </Text>
                        </Stack>
                    </Stack>
                </Container>
            ) : items.length === 0 ? (
                <EmptyCartMessage />
            ) : (
                <GridBox
                    gridColumns={{ xs: 1, md: "2fr 1fr" }}
                    rowGap={4}
                    columnGap={2}
                >
                    <Stack
                        as="form"
                        id="checkout-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <GridBox
                            gridColumns={{ xs: 1, mobile: 2 }}
                            rowGap={3}
                            columnGap={1}
                        >
                            <Text variant="title" tw="mobile:col-span-2">
                                Shipping Details
                            </Text>

                            <TextField
                                label="Name"
                                errors={errors}
                                name="name"
                                register={register}
                                requireMessage={NAME.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: NAME.VALID.PATTERN,
                                        message: NAME.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <TextField
                                label="Contact Number"
                                errors={errors}
                                name="contactNumber"
                                register={register}
                                requireMessage={CONTACT.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: CONTACT.VALID.PATTERN,
                                        message: CONTACT.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <TextField
                                label="Shipping Address"
                                errors={errors}
                                name="address"
                                register={register}
                                tfCSS={[tw`mobile:col-span-2`]}
                                requireMessage={ADDRESS.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: ADDRESS.VALID.PATTERN,
                                        message: ADDRESS.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <TextField
                                label="City"
                                errors={errors}
                                name="city"
                                register={register}
                                requireMessage={CITY.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: CITY.VALID.PATTERN,
                                        message: CITY.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <TextField
                                label="Zip Code"
                                errors={errors}
                                name="zipCode"
                                register={register}
                                requireMessage={ZIPCODE.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: ZIPCODE.VALID.PATTERN,
                                        message: ZIPCODE.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <Text variant="title" tw="mobile:col-span-2">
                                Payment Info
                            </Text>

                            <TextField
                                label="Card Number"
                                errors={errors}
                                name="cardNumber"
                                register={register}
                                requireMessage={CARDNUMBER.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: CARDNUMBER.VALID.PATTERN,
                                        message: CARDNUMBER.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <TextField
                                label="Card Holder"
                                errors={errors}
                                name="cardHolder"
                                register={register}
                                requireMessage={CARDHOLDER.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: CARDHOLDER.VALID.PATTERN,
                                        message: CARDHOLDER.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <TextField
                                label="Security Code"
                                errors={errors}
                                name="securityCode"
                                register={register}
                                requireMessage={SECURITYCODE.REQUIRED}
                                rules={{
                                    pattern: {
                                        value: SECURITYCODE.VALID.PATTERN,
                                        message: SECURITYCODE.VALID.MESSAGE,
                                    },
                                }}
                            />

                            <GridBox gridColumns={2} columnGap={1}>
                                <TextField
                                    label="Month"
                                    errors={errors}
                                    name="month"
                                    register={register}
                                    requireMessage={MONTH.REQUIRED}
                                    rules={{
                                        pattern: {
                                            value: MONTH.VALID.PATTERN,
                                            message: MONTH.VALID.MESSAGE,
                                        },
                                        validate: (month) => {
                                            if (
                                                (month as number) > 12 ||
                                                (month as number) < 1
                                            ) {
                                                return "Use numeric (1-12)."
                                            }
                                        },
                                    }}
                                />
                                <TextField
                                    label="Year"
                                    errors={errors}
                                    name="year"
                                    register={register}
                                    requireMessage={YEAR.REQUIRED}
                                    rules={{
                                        pattern: {
                                            value: YEAR.VALID.PATTERN,
                                            message: YEAR.VALID.MESSAGE,
                                        },
                                        validate: (year) => {
                                            const month = getValues("month")
                                            const cardExp = new Date(
                                                year as number,
                                                month as number
                                            )
                                            const cardExpTime =
                                                cardExp.getTime()
                                            const currentDate =
                                                new Date().getTime()

                                            if (cardExpTime <= currentDate) {
                                                return "Your card has expired"
                                            }

                                            return
                                        },
                                    }}
                                />
                                <Text
                                    variant="caption"
                                    tw="font-bold text-primary-dark col-span-2 mt-2"
                                >
                                    Expiration Date
                                </Text>
                            </GridBox>
                        </GridBox>
                    </Stack>

                    <Stack rowGap={1} tw="row-start-1 md:row-auto items-center">
                        <Text variant="title">Order Summary</Text>

                        <table tw="w-full">
                            <thead tw="[&_td]:font-bold [&_th]:py-4 border-b-2 border-double">
                                <tr>
                                    <th tw="text-left">Items</th>
                                    <MiddleCell as="th">Quantity</MiddleCell>
                                    <LastCell as="th">Subtotal</LastCell>
                                </tr>
                            </thead>

                            <tbody tw="[&_td]:py-3">
                                {items.map(({ product, amount }) => (
                                    <tr key={product._id} tw="even:bg-white">
                                        <td tw="capitalize" data-head="Items">
                                            {product.name}
                                        </td>
                                        <MiddleCell data-head="Quantity">
                                            {amount.quantity}
                                        </MiddleCell>
                                        <LastCell data-head="Subtotal">
                                            &#8369;{amount.subtotal}
                                        </LastCell>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot tw="[&_span]:text-lg">
                                <tr>
                                    <td tw="py-4"></td>

                                    <MiddleCell
                                        tw="py-4"
                                        data-head="Total Quantity"
                                    >
                                        <Stack>
                                            <Text variant="subtitle">
                                                {quantity}
                                            </Text>
                                            <Text
                                                variant="caption"
                                                tw="text-gray-700"
                                            >
                                                Items
                                            </Text>
                                        </Stack>
                                    </MiddleCell>

                                    <LastCell tw="py-4" data-head="Total Price">
                                        <Stack>
                                            <Text variant="subtitle">
                                                &#8369;{total}
                                            </Text>
                                            <Text
                                                variant="caption"
                                                tw="text-gray-700"
                                            >
                                                Total
                                            </Text>
                                        </Stack>
                                    </LastCell>
                                </tr>
                            </tfoot>
                        </table>

                        <div tw="w-full flex justify-end max-w-screen-mobile">
                            <Button
                                form="checkout-form"
                                tw="mt-4 disabled:bg-gray-500 w-full md:w-auto"
                                disabled={result.isLoading}
                            >
                                {result.isLoading ? (
                                    <CircularProgress width={3} height={3} />
                                ) : (
                                    "Purchase"
                                )}
                            </Button>
                        </div>
                    </Stack>

                    <Stack tw="" alignItems="start">
                        <ButtonLink href="/cart" color="warning">
                            Back to cart
                        </ButtonLink>
                    </Stack>
                </GridBox>
            )}
        </>
    )
}

export default CheckoutForms
