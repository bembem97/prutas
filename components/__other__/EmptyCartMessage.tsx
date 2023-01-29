import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import React from "react"
import tw from "twin.macro"

const ButtonLink = Button.withComponent(Link)

const EmptyCartMessage = () => {
  return (
    <Container tw="w-fit pt-10">
      <Stack alignItems="center" rowGap={2}>
        <Text variant="header" color="error.dark">
          Your Cart Is Empty
        </Text>
        <ButtonLink href="/" color="error">
          Continue Shopping
        </ButtonLink>
      </Stack>
    </Container>
  )
}

export default EmptyCartMessage
