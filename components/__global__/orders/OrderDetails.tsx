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
import React, { Dispatch, SetStateAction, useContext } from "react"
import useCountdown from "src/hooks/useCountdown"
import useGetDate from "src/hooks/useGetDate"
import { useUpdateStatusMutation } from "src/redux/slices/orderDetails"
import tw from "twin.macro"
import { timer } from "./StatusButton"

type PropTypes = {
  extendTime: number
  setOpen: Dispatch<SetStateAction<boolean | null>>
}

const OrderDetails = ({ extendTime, setOpen }: PropTypes) => {
  const orderDetails = useContext(OrderDetailsContext)
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation()

  const deliveryTime = new Date(orderDetails!.createdAt).getTime() + extendTime
  const { days, hours, minutes, seconds } = useCountdown(deliveryTime)
  const countdown = days + hours + minutes + seconds

  const { day, month, year } = useGetDate(orderDetails!.createdAt)

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
    <>
      <Container>
        <Text as="h1" variant="title" tw="mb-4">
          Order Details
        </Text>

        <Stack justifyContent="between" tw="mb-4 gap-y-4 mobile:flex-row">
          <Stack>
            <Text variant="subtitle" tw="font-bold">
              {orderDetails?.customer.name}
            </Text>
            <Text variant="subtitle" tw="text-gray-700">
              {orderDetails?.customer.address.street}
            </Text>
            <Text variant="subtitle" tw="text-gray-700">
              {orderDetails?.customer.address.city},{" "}
              {orderDetails?.customer.address.zipCode}
            </Text>
            <Text variant="subtitle" tw="font-semibold">
              CN: (63+) {orderDetails?.customer.contactNumber}
            </Text>
          </Stack>

          <Stack>
            <Text variant="subtitle" tw="font-bold">
              Date:
            </Text>

            <Text variant="subtitle" tw="font-bold text-gray-700 mb-2">
              {month} {day}, {year}
            </Text>

            <Text variant="subtitle" tw="font-bold">
              Order No.
            </Text>

            <Text variant="subtitle" tw="font-bold text-gray-700 mb-2">
              {orderDetails?._id}
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
              {orderDetails?.items.products.map(
                ({ product, amount }, index) => (
                  <TableRow key={index}>
                    <TableCell data-head="Product">
                      {typeof product === "object" && product.name}
                    </TableCell>
                    <TableCell data-head="Price">
                      {typeof product === "object" && product.price}
                    </TableCell>
                    <MiddleCell data-head="Quantity">
                      {amount.quantity}
                    </MiddleCell>
                    <LastCell data-head="Subtotal">{amount.subtotal}</LastCell>
                  </TableRow>
                )
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell as="th" tw="hidden md:table-cell"></TableCell>
                <TableCell as="th" tw="hidden md:table-cell"></TableCell>
                <MiddleCell as="th" data-head="Total Quantity">
                  <Stack>
                    <Text variant="subtitle">
                      {orderDetails?.items.quantity}
                    </Text>
                    <Text variant="caption" tw="text-gray-700">
                      Items
                    </Text>
                  </Stack>
                </MiddleCell>

                <LastCell as="th" data-head="Total Price">
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

      <Button color="error" onClick={() => setOpen(false)}>
        Close Modal
      </Button>
    </>
  )
}

export default OrderDetails
