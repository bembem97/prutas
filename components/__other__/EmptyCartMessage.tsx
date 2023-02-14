import Image from "components/shared/datadisplay/Image"
import Text from "components/shared/datadisplay/Text"
import Button from "components/shared/inputs/Button"
import Container from "components/shared/containers/Container"
import Stack from "components/shared/containers/Stack"
import Link from "components/shared/navigations/Link"
import Paper from "components/shared/surfaces/Paper"
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
