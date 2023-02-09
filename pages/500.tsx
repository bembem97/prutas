import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Grid from "components/layouts/Grid"
import Stack from "components/layouts/Stack"
import Paper from "components/surfaces/Paper"
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

      <Grid tw="h-full place-items-center pt-5">
        <Paper>
          <Container tw="p-[clamp(theme(spacing.2),3vw,theme(spacing.6))]">
            <Stack rowGap={3} alignItems="center">
              <Text variant="header" color="error" align="center">
                500 Internal Server Error
              </Text>
              <Text tw="font-bold" align="center">
                Oops, something went wrong.
              </Text>
              <Text tw="font-bold" align="center">
                Try to referesh this page.
              </Text>

              <Button onClick={() => router.reload()}>Reload</Button>
            </Stack>
          </Container>
        </Paper>
      </Grid>
    </>
  )
}
