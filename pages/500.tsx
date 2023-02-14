import Text from "components/shared/datadisplay/Text"
import Button from "components/shared/inputs/Button"
import Container from "components/shared/containers/Container"
import GridBox from "components/shared/containers/GridBox"
import Stack from "components/shared/containers/Stack"
import Paper from "components/shared/surfaces/Paper"
import Head from "next/head"
import { useRouter } from "next/router"
import tw from "twin.macro"

export default function Custom500() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>500 Internal Server Error</title>
            </Head>

            <GridBox tw="h-full place-items-center pt-5 px-4">
                <Paper>
                    <Container tw="p-[clamp(theme(spacing.2),3vw,theme(spacing.6))]">
                        <Stack rowGap={3} alignItems="center">
                            <Text variant="header" color="error" align="center">
                                <Text
                                    variant="header"
                                    align="center"
                                    tw="font-bold"
                                >
                                    500
                                </Text>
                                Internal Server Error
                            </Text>

                            <Text tw="font-bold" align="center">
                                Oops, something went wrong.
                            </Text>

                            <Text tw="font-bold" align="center">
                                Try to referesh this page.
                            </Text>

                            <Button onClick={() => router.reload()}>
                                Reload
                            </Button>
                        </Stack>
                    </Container>
                </Paper>
            </GridBox>
        </>
    )
}
