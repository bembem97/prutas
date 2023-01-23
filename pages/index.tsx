import React from "react"
import Text from "components/datadisplay/Text"
import Container from "components/layouts/Container"
import GridBox from "components/layouts/GridBox"
import Stack from "components/layouts/Stack"
import Hero from "components/surfaces/Hero"
import Layout from "components/__global__/Layout"
import { ComponentProps } from "src/interfaceProps"
import Paper from "components/surfaces/Paper"
import Card from "components/surfaces/Card"
import CardMedia from "components/surfaces/CardMedia"
import CardContent from "components/surfaces/CardContent"
import tw, { css } from "twin.macro"
import Image from "components/datadisplay/Image"
import Button from "components/inputs/Button"

const SERVICES = [
  {
    image: "/images/ourservices/fresh.svg",
    title: "Fresh Fruits",
    subtitle: "Well Package",
  },
  {
    image: "/images/ourservices/quality.svg",
    title: "Great Quality",
    subtitle: "Quality Products",
  },
  {
    image: "/images/ourservices/service247.svg",
    title: "Support",
    subtitle: "24/7 Support",
  },
  {
    image: "/images/ourservices/truck.svg",
    title: "Free Shipping",
    subtitle: "On Order Over ₱5k",
  },
]

const Home: React.FC<ComponentProps> = () => {
  return (
    <Layout title="Home">
      <Hero url="/images/background/3.jpg">
        <Paper bgBlur={2}>
          <Container paddingX={4} paddingY={2}>
            <Stack rowGap={2}>
              <Text variant="subtitle" color="primary" tw="pl-2">
                Fresh Fruits
              </Text>

              <Text variant="large" tw="font-semibold">
                Fruits 100% Organic
              </Text>

              <Button tw="max-w-full sm:max-w-fit">Shop Now</Button>
            </Stack>
          </Container>
        </Paper>
      </Hero>

      <Container maxWidth="lg">
        <GridBox gridColumns={1} gap={6}>
          <GridBox gridColumns={{ xs: 1, sm: 2, md: 4 }} gap={1}>
            <Text variant="header" tw="xs:col-span-2 md:col-span-4">
              Services
            </Text>

            {SERVICES.map(({ image, title, subtitle }) => (
              <Paper key={title}>
                <Container>
                  <Stack alignItems="center" tw="text-center">
                    <Image src={image} alt={title} width={60} height={60} />
                    <Text variant="subtitle">{title}</Text>
                    <Text variant="subtitle" tw="text-gray-700">
                      {subtitle}
                    </Text>
                  </Stack>
                </Container>
              </Paper>
            ))}
          </GridBox>
          <GridBox gridColumns={{ xs: 1, sm: 2, md: 4 }} gap={1}>
            <Text variant="header" tw="xs:col-span-2 md:col-span-4">
              Popular Products
            </Text>

            {["banana", "cottonFruit", "mango", "watermelon"].map((item) => (
              <Card key={item}>
                <CardMedia
                  src={`/images/products/${item}.svg`}
                  alt="fruit"
                  width={120}
                  height={120}
                  square
                />
                <CardContent>
                  <Stack>
                    <Text variant="subtitle">{item}</Text>

                    <Stack direction="row">
                      <Text
                        variant="subtitle"
                        css={css`
                          flex: 1 1 60%;
                        `}
                      >
                        fruit
                      </Text>

                      <Text
                        color="primary.dark"
                        variant="subtitle"
                        align="right"
                        tw="mb-4 font-bold"
                        css={css`
                          flex: 0 1 40%;
                        `}
                      >
                        &#8369;100
                      </Text>
                    </Stack>

                    <Button>Add To Cart</Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </GridBox>
          <GridBox gridColumns={{ xs: 1, md: 2 }} gap={0.5}>
            <Stack justifyContent="center">
              <Text variant="header">About the project</Text>

              <Text>
                Prutas is a small project I created as my final project during
                my college days. It serves as e-commerce for fruit-producing
                crops and orchards that specializes in providing fresh fruits to
                customers.
              </Text>
            </Stack>
            <div css={[tw`relative h-[275px] mobile:h-[350px] md:h-[450px]`]}>
              <Image
                src="/images/background/4.jpg"
                alt="fruit"
                fill
                tw="object-cover"
              />
            </div>
          </GridBox>
        </GridBox>
      </Container>
    </Layout>
  )
}

export default Home
