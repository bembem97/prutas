import React, { useRef } from "react"
import Layout from "components/layout/Layout"
import Text from "components/shared/datadisplay/Text"
import Container from "components/shared/containers/Container"
import GridBox from "components/shared/containers/GridBox"
import Stack from "components/shared/containers/Stack"
import Hero from "components/shared/surfaces/Hero"
import Paper from "components/shared/surfaces/Paper"
import tw from "twin.macro"
import Image from "components/shared/datadisplay/Image"
import Button from "components/shared/inputs/Button"
import { GetStaticProps } from "next"
import connect from "src/database/mongoose"
import ProductModel from "src/models/Product"
import parseApi, { DataProduct } from "src/utils/parseApi"
// import useIntersectionObserver from "src/hooks/useIntersectionObserver"
import dynamic from "next/dynamic"
import ProductCardList from "components/__other__/ProductCardList"
import SpinningProgress from "components/shared/progress/SpinningProgress"

const AllProducts = dynamic(import("components/global/AllProducts"), {
    loading: () => <SpinningProgress />,
})

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

interface Products {
    products: DataProduct[]
}

// const ButtonLink = Button.withComponent(Link)

export default function Home({ products }: Products) {
    const elementRef = useRef<HTMLDivElement>(null)
    // const io = useIntersectionObserver(elementRef, {
    //   threshold: 0.1,
    //   freezeOnceVisible: true,
    // })

    // const isIntersecting = io?.isIntersecting

    const jumpToAllProducts = () => {
        const target = elementRef?.current
        target!.scrollIntoView({ behavior: "smooth" })
    }

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

                            <Button
                                onClick={jumpToAllProducts}
                                tw="max-w-full sm:max-w-fit"
                            >
                                Shop Now
                            </Button>
                        </Stack>
                    </Container>
                </Paper>
            </Hero>

            <Container maxWidth="lg">
                <GridBox gridColumns={1} gap={6}>
                    {/* //todo: SERVICES */}
                    <GridBox
                        as="section"
                        gridColumns={{ xs: 1, sm: 2, md: 4 }}
                        gap={1}
                    >
                        <Text
                            as="h1"
                            variant="header"
                            tw="col-span-1 sm:col-span-2 md:col-span-4"
                        >
                            Services
                        </Text>

                        {SERVICES.map(({ image, title, subtitle }) => (
                            <Paper key={title}>
                                <Container>
                                    <Stack alignItems="center" tw="text-center">
                                        <Image
                                            src={image}
                                            alt={title}
                                            width={60}
                                            height={60}
                                        />
                                        <Text variant="subtitle">{title}</Text>
                                        <Text
                                            variant="subtitle"
                                            tw="text-gray-700"
                                        >
                                            {subtitle}
                                        </Text>
                                    </Stack>
                                </Container>
                            </Paper>
                        ))}
                    </GridBox>

                    {/* //todo: POPULAR PRODUCTS */}
                    <GridBox
                        as="section"
                        gridColumns={{ xs: 1, sm: 2, md: 4 }}
                        gap={1}
                    >
                        <Text
                            as="h1"
                            variant="header"
                            tw="col-span-1 sm:col-span-2 md:col-span-4"
                        >
                            Popular Products
                        </Text>

                        <ProductCardList data={products} />
                    </GridBox>

                    {/* //todo: ABOUT SECTION */}
                    <GridBox
                        as="section"
                        gridColumns={{ xs: 1, md: 2 }}
                        gap={0.5}
                    >
                        <Stack justifyContent="center">
                            <Text as="h1" variant="header">
                                About the project
                            </Text>

                            <Text>
                                Prutas is a small e-commerce project. It serves
                                as e-commerce for fruit-producing crops and
                                orchards that specializes in providing fresh
                                fruits to customers.
                            </Text>
                        </Stack>

                        <div
                            css={[
                                tw`relative h-[215px] mobile:h-[350px] md:h-[400px]`,
                            ]}
                        >
                            <Image
                                src="/images/background/4.jpg"
                                alt="fruit"
                                fill
                                tw="object-cover"
                                sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                            />
                        </div>
                    </GridBox>

                    {/* //todo: ALL PRODUCTS <DYNAMIC> */}
                    <Stack as="section" ref={elementRef} tw="mb-3">
                        <Text variant="header">All Products</Text>

                        {/* {isIntersecting && <AllProducts />} */}
                        <AllProducts />
                    </Stack>
                </GridBox>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        await connect()
        const where = { name: /^(banana|mango|watermelon|papaya)$/i }
        const select = "name variety price imageUrl"

        const response = await ProductModel.find(where, select).limit(4)
        const products = await parseApi(response)

        return { props: { products } }
    } catch (error) {
        throw new Error(error as string)
    }
}
