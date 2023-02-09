import Image from "components/datadisplay/Image"
import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import Paper from "components/surfaces/Paper"
import React from "react"
import tw from "twin.macro"

const ButtonLink = Button.withComponent(Link)

const EmptyCartMessage = () => {
  return (
    <Container
      maxWidth="mobile"
      data-component="EmptyCardMessageComponent"
      tw="w-full"
    >
      <Paper>
        <Container tw="p-[clamp(theme(spacing.2),2vw,theme(spacing.5))] pb-8">
          <Stack alignItems="center" rowGap={2}>
            <Image
              src="/images/ourservices/cart.svg"
              alt="cart"
              width={200}
              height={200}
              tw="object-cover aspect-square"
            />
            <Text variant="title" color="error.dark">
              Your Cart Is Empty
            </Text>
            <ButtonLink href="/" color="error">
              Continue Shopping
            </ButtonLink>
          </Stack>
        </Container>
      </Paper>
    </Container>
  )
}

export default EmptyCartMessage
