import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import Grid from "components/layouts/Grid"
import Stack from "components/layouts/Stack"
import Paper from "components/surfaces/Paper"
import Layout from "components/__global__/Layout"
import Link from "next/link"
import tw from "twin.macro"

const ButtonLink = Button.withComponent(Link)

export default function Custom500() {
  return (
    <Layout title="500 Internal Server Error">
      <Grid tw="h-full place-items-center">
        <Paper>
          <Container padding={2}>
            <Stack rowGap={3} alignItems="center">
              <Text variant="header" color="error" align="center">
                500 Internal Server Error
              </Text>
              <Text tw="font-bold">Oops, something went wrong.</Text>
              <Text tw="font-bold">
                Try to referesh this page or go{" "}
                <ButtonLink href="/">Home</ButtonLink>
              </Text>
            </Stack>
          </Container>
        </Paper>
      </Grid>
    </Layout>
  )
}
