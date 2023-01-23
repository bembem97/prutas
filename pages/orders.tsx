import { SerializedStyles } from "@emotion/react"
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
import GridBox from "components/layouts/GridBox"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import Layout from "components/__global__/Layout"
import StatusButton from "components/__global__/orders/StatusButton"
import React, { useRef } from "react"
import useToggle from "src/hooks/useToggle"
import tw, { css, theme, styled } from "twin.macro"

const ButtonLink = Button.withComponent(Link)

const CustomerCell = styled(TableCell)(() => tw`w-[min(100%,200px)]`)
const StatusCell = styled(TableCell)(() => tw`text-center w-40`)

interface OrderDetailsProps {
  orderNo: number
  customer: string
  dateOrdered: string
  status: string
}

const orderDetails: OrderDetailsProps[] = [
  {
    orderNo: 188830,
    customer: "bembem cabrera",
    dateOrdered: "2023-1-15",
    status: "on going",
  },
  {
    orderNo: 188824,
    customer: "bembem cabrera",
    dateOrdered: "2023-1-13",
    status: "ready",
  },
  {
    orderNo: 188701,
    customer: "bembem cabrera",
    dateOrdered: "2023-1-10",
    status: "claimed",
  },
]

const Orders: React.FC = () => {
  const ref = useRef(null)
  const { isOpen, setIsOpen } = useToggle(ref)

  return (
    <Layout title="Order">
      <Container maxWidth="lg">
        <Text variant="header">Order History</Text>

        <Stack alignItems="center" justifyContent="center" rowGap={4}>
          <CircularProgress width={8} height={8} />

          <Text variant="title" color="error">
            You never ordered anything yet.
          </Text>

          <ButtonLink href="/" color="error">
            Continue Shopping
          </ButtonLink>
        </Stack>

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
            {orderDetails.map(
              ({ orderNo, customer, dateOrdered, status }, index) => (
                <TableRow key={index}>
                  <TableCell>{orderNo}</TableCell>
                  <CustomerCell>{customer}</CustomerCell>
                  <TableCell>{dateOrdered}</TableCell>
                  <StatusCell>
                    <StatusButton status={status} />
                  </StatusCell>
                </TableRow>
              )
            )}
          </TableBody>

          <TableFooter></TableFooter>
        </Table>
      </Container>
    </Layout>
  )
}

export default Orders
