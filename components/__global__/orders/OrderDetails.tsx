import Table from "components/datadisplay/Table"
import TableBody from "components/datadisplay/TableBody"
import TableCell from "components/datadisplay/TableCell"
import TableFooter from "components/datadisplay/TableFooter"
import TableHead from "components/datadisplay/TableHead"
import TableRow from "components/datadisplay/TableRow"
import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import { LastCell, MiddleCell } from "pages/cart"
import { OrderDetailsContext } from "pages/orders"
import React, { useContext } from "react"
import useCountdown from "src/hooks/useCountdown"
import { useUpdateStatusMutation } from "src/redux/slices/orderDetails"
import tw from "twin.macro"
import { timer } from "./StatusButton"

type PropTypes = { extendTime: number }

const OrderDetails = ({ extendTime }: PropTypes) => {
  const orderDetails = useContext(OrderDetailsContext)
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation()

  const deliveryTime = new Date(orderDetails!.createdAt).getTime() + extendTime
  const { days, hours, minutes, seconds } = useCountdown(deliveryTime)
  const countdown = days + hours + minutes + seconds

  const timeIsUp = timer(countdown, {
    status: orderDetails!.status,
    current: 1,
  })

  const claimNow = () =>
    timeIsUp && updateStatus({ id: orderDetails!._id, status: 2 })

  const disableBtn =
    (countdown <= 0 && orderDetails?.status === 2) ||
    (countdown > 0 && orderDetails?.status === 0)

  return (
    <Container>
      <Text as="h1" variant="title" tw="mb-4">
        Order Details
      </Text>

      <Stack direction="row" justifyContent="between" tw="mb-4">
        <Stack>
          <Text variant="subtitle" tw="font-bold">
            Bembem Cabrera
          </Text>
          <Text variant="subtitle" tw="text-gray-700">
            420 X. Villa street,
          </Text>
          <Text variant="subtitle" tw="text-gray-700">
            Cebu City, 6000
          </Text>
          <Text variant="subtitle" tw="font-semibold">
            CN: (63+) 9123456789
          </Text>
        </Stack>

        <Stack>
          <Text variant="subtitle" tw="font-bold">
            Date:
          </Text>

          <Text variant="subtitle" tw="font-bold text-gray-700 mb-2">
            January 1, 2023
          </Text>

          <Text variant="subtitle" tw="font-bold">
            Order No.
          </Text>

          <Text variant="subtitle" tw="font-bold text-gray-700 mb-2">
            188830
          </Text>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="between">
        <Stack tw="mb-5">
          <Text tw="font-bold">Estimated Delivery Time:</Text>
          <Text tw="font-semibold">
            {days}d:{hours}h:{minutes}m:{seconds}s
          </Text>
        </Stack>

        <Stack>
          <Button
            disabled={disableBtn}
            onClick={() => claimNow()}
            tw="disabled:bg-gray-500"
          >
            Claim
          </Button>
        </Stack>
      </Stack>

      <Container noPadding>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell as="th">Product</TableCell>
              <TableCell as="th">Price</TableCell>
              <MiddleCell as="th">Quantity</MiddleCell>
              <LastCell as="th">Subtotal</LastCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderDetails?.items.products.map(({ product, amount }, index) => (
              <TableRow key={index}>
                <TableCell>
                  {typeof product === "object" && product.name}
                </TableCell>
                <TableCell>
                  {typeof product === "object" && product.price}
                </TableCell>
                <MiddleCell>{amount.quantity}</MiddleCell>
                <LastCell>{amount.subtotal}</LastCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell as="th"></TableCell>
              <TableCell as="th"></TableCell>
              <MiddleCell as="th">
                <Stack>
                  <Text variant="subtitle">{orderDetails?.items.quantity}</Text>
                  <Text variant="caption" tw="text-gray-700">
                    Items
                  </Text>
                </Stack>
              </MiddleCell>
              <LastCell as="th">
                <Stack>
                  <Text variant="subtitle">
                    &#8369;{orderDetails?.items.total}
                  </Text>
                  <Text variant="caption" tw="text-gray-700">
                    Total
                  </Text>
                </Stack>
              </LastCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </Container>
  )
}

export default OrderDetails
