import Table from "components/shared/datadisplay/Table"
import TableBody from "components/shared/datadisplay/TableBody"
import TableCell from "components/shared/datadisplay/TableCell"
import TableHead from "components/shared/datadisplay/TableHead"
import TableRow from "components/shared/datadisplay/TableRow"
import Text from "components/shared/datadisplay/Text"
import CircularProgress from "components/shared/icons/CircularProgress"
import Button from "components/shared/inputs/Button"
import Stack from "components/shared/containers/Stack"
import Link from "components/shared/navigations/Link"
import StatusButton from "components/global/orders/StatusButton"
import React from "react"
import useGetDate from "src/hooks/useGetDate"
import { useGetOrdersQuery } from "src/redux/slices/orderDetails"
import tw, { styled } from "twin.macro"
import { OrderDetailsTypes } from "src/models/OrderDetails"
import { OrderDetailsContext } from "pages/orders"

const ButtonLink = Button.withComponent(Link)

const CustomerCell = styled(TableCell)(tw`md:w-[min(100%,200px)]`)
const StatusCell = styled(TableCell)(tw`md:w-40`)

// export const OrderDetailsContext =
//   React.createContext<OrderDetailsTypes | null>(null)

const OrderHistory = () => {
    const { isLoading, data: orderDetails } = useGetOrdersQuery()

    return (
        <>
            <Text variant="header">Order History</Text>

            <Stack alignItems="center" justifyContent="center" rowGap={4}>
                {isLoading ? (
                    <CircularProgress width={8} height={8} />
                ) : orderDetails?.result.length === 0 ? (
                    <>
                        <Text variant="title" color="error">
                            {"You haven't ordered anything yet."}
                        </Text>
                        <ButtonLink href="/" color="error">
                            Continue Shopping
                        </ButtonLink>
                    </>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell as="th">Order ID</TableCell>
                                <CustomerCell as="th">Customer</CustomerCell>
                                <TableCell as="th">Date Ordered</TableCell>
                                <StatusCell as="th" align="center">
                                    Status
                                </StatusCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {orderDetails?.result.map((detail) => (
                                <OrderedList
                                    key={detail._id}
                                    id={detail._id}
                                    customer={detail.customer.name}
                                    dateOrdered={detail.createdAt}
                                    status={detail.status}
                                    detail={detail}
                                />
                            ))}
                        </TableBody>

                        {/* <TableFooter></TableFooter> */}
                    </Table>
                )}
            </Stack>
        </>
    )
}

// todo: LIST OF ORDERED ITEMS
interface OrderedTypes {
    id: string
    customer: string
    dateOrdered: Date
    status: number
    detail: OrderDetailsTypes
}

function OrderedList({
    id,
    customer,
    dateOrdered,
    status,
    detail,
}: OrderedTypes) {
    const { year, month, day } = useGetDate(dateOrdered)

    return (
        <TableRow key={id}>
            <TableCell data-head="Order ID">
                <span tw="text-xs md:text-base font-mono">{id}</span>
            </TableCell>
            <CustomerCell data-head="Customer">{customer}</CustomerCell>
            <TableCell data-head="Date Ordered">
                {month} {day}, {year}
            </TableCell>
            <StatusCell data-head="Status">
                <OrderDetailsContext.Provider value={detail}>
                    <StatusButton
                        id={id}
                        status={status}
                        dateOrdered={dateOrdered}
                    />
                </OrderDetailsContext.Provider>
            </StatusCell>
        </TableRow>
    )
}

export default OrderHistory
