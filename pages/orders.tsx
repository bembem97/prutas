import Table from "components/datadisplay/Table"
import TableBody from "components/datadisplay/TableBody"
import TableCell from "components/datadisplay/TableCell"
import TableFooter from "components/datadisplay/TableFooter"
import TableHead from "components/datadisplay/TableHead"
import TableRow from "components/datadisplay/TableRow"
import Text from "components/datadisplay/Text"
import CircularProgress from "components/icons/CircularProgress"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import Layout from "components/__global__/Layout"
import StatusButton from "components/__global__/orders/StatusButton"
import React from "react"
import useGetDate from "src/hooks/useGetDate"
import { useGetOrdersQuery } from "src/redux/slices/orderDetails"
import tw, { styled } from "twin.macro"
import { OrderDetailsTypes } from "src/models/OrderDetails"

const ButtonLink = Button.withComponent(Link)

const CustomerCell = styled(TableCell)(() => tw`w-[min(100%,200px)]`)
const StatusCell = styled(TableCell)(() => tw`text-center w-40`)

export const OrderDetailsContext =
  React.createContext<OrderDetailsTypes | null>(null)

export default function Orders() {
  const { isLoading, data: orderDetails } = useGetOrdersQuery()

  return (
    <Layout title="Order">
      <Container maxWidth="lg">
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
                  <TableCell as="th">Order no.</TableCell>
                  <CustomerCell as="th">Customer</CustomerCell>
                  <TableCell as="th">Date Ordered</TableCell>
                  <StatusCell as="th">Status</StatusCell>
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

              <TableFooter></TableFooter>
            </Table>
          )}
        </Stack>
      </Container>
    </Layout>
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
      <TableCell tw="text-xs font-mono">{id}</TableCell>
      <CustomerCell>{customer}</CustomerCell>
      <TableCell>
        {month} {day}, {year}
      </TableCell>
      <StatusCell>
        <OrderDetailsContext.Provider value={detail}>
          <StatusButton id={id} status={status} dateOrdered={dateOrdered} />
        </OrderDetailsContext.Provider>
      </StatusCell>
    </TableRow>
  )
}
