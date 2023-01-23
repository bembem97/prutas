import Table from "components/datadisplay/Table"
import TableBody from "components/datadisplay/TableBody"
import TableCell from "components/datadisplay/TableCell"
import TableFooter from "components/datadisplay/TableFooter"
import TableHead from "components/datadisplay/TableHead"
import TableRow from "components/datadisplay/TableRow"
import Text from "components/datadisplay/Text"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import React from "react"
import tw from "twin.macro"

const OrderDetails = () => {
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

      <Container noPadding>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell as="th">Product</TableCell>
              <TableCell as="th">Price</TableCell>
              <TableCell as="th">Quantity</TableCell>
              <TableCell as="th">Subtotal</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>Banana</TableCell>
              <TableCell>100</TableCell>
              <TableCell>2</TableCell>
              <TableCell>200</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell as="th"></TableCell>
              <TableCell as="th"></TableCell>
              <TableCell as="th">
                <Stack>
                  <Text variant="subtitle">2</Text>
                  <Text variant="caption" tw="text-gray-700">
                    Items
                  </Text>
                </Stack>
              </TableCell>
              <TableCell as="th">
                <Stack>
                  <Text variant="subtitle">&#8369;200</Text>
                  <Text variant="caption" tw="text-gray-700">
                    Total
                  </Text>
                </Stack>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </Container>
  )
}

export default OrderDetails
