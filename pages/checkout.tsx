import tw, { css, styled } from "twin.macro"
import Text from "components/datadisplay/Text"
import Container from "components/layouts/Container"
import Grid from "components/layouts/Grid"
import Layout from "components/__global__/Layout"
import React from "react"
import Stack from "components/layouts/Stack"
import Button from "components/inputs/Button"
import TextField from "components/inputs/TextField"
import Link from "components/navigations/Link"
import TableRow from "components/datadisplay/TableRow"
import Table from "components/datadisplay/Table"
import TableHead from "components/datadisplay/TableHead"
import TableCell from "components/datadisplay/TableCell"
import TableBody from "components/datadisplay/TableBody"
import TableFooter from "components/datadisplay/TableFooter"
import { LastCell, MiddleCell } from "./cart"

const ButtonLink = Button.withComponent(Link)
// const MiddleCell = styled(TableCell)(() => tw`text-center`)
// const LastCell = styled(TableCell)(() => tw`text-right`)

const Checkout: React.FC = () => {
  return (
    <Layout title="Checkout">
      <Container maxWidth="lg">
        <Grid
          gridColumns={1}
          mdGridColumns={2}
          lgGridColumns="2fr 1fr"
          rowGap={4}
          columnGap={2}
        >
          <Stack as="form" id="checkout-form">
            <Grid gridColumns={1} mdGridColumns={2} columnGap={1} rowGap={3}>
              <Text variant="title" tw="col-span-2">
                Shipping Details
              </Text>

              <TextField label="Name" />
              <TextField label="Contact Number" />
              <TextField
                label="Address"
                containerProps={{ css: [tw`col-span-2`] }}
              />
              <TextField label="City" />
              <TextField label="Zip Code" />

              <Text variant="title" tw="col-span-2">
                Payment Info
              </Text>

              <TextField label="Card Number" />
              <TextField label="Card Holder" />
              <TextField label="Security Code" />

              <Grid gridColumns={2} columnGap={0.5}>
                <TextField label="Month" fullWidth />
                <TextField label="Year" fullWidth />
                <Text
                  variant="caption"
                  tw="font-bold text-primary-dark col-span-2 mt-2"
                >
                  Expiration Date
                </Text>
              </Grid>
            </Grid>
          </Stack>

          <Stack rowGap={1}>
            <Text variant="title">Order Summary</Text>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell as="th">Items</TableCell>

                  <MiddleCell as="th">Quantity</MiddleCell>

                  <LastCell as="th">Subtotal</LastCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Banana</TableCell>
                  <MiddleCell>2</MiddleCell>
                  <LastCell>&#8369;200</LastCell>
                </TableRow>

                <TableRow>
                  <TableCell>Mango</TableCell>
                  <MiddleCell>1</MiddleCell>
                  <LastCell>&#8369;120</LastCell>
                </TableRow>
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell></TableCell>

                  <MiddleCell as="th">
                    <Stack>
                      <Text variant="subtitle">3</Text>
                      <Text variant="caption" tw="text-gray-700">
                        Items
                      </Text>
                    </Stack>
                  </MiddleCell>

                  <LastCell as="th">
                    <Stack>
                      <Text variant="subtitle">&#8369;320</Text>
                      <Text variant="caption" tw="text-gray-700">
                        Total
                      </Text>
                    </Stack>
                  </LastCell>
                </TableRow>
              </TableFooter>
            </Table>

            <Button form="checkout-form" tw="mt-4">
              Purchase
            </Button>
          </Stack>

          <Stack tw="col-span-2" alignItems="start">
            <ButtonLink href="/cart" color="warning">
              Back to cart
            </ButtonLink>
          </Stack>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Checkout
