import Image from "components/datadisplay/Image"
import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Container from "components/layouts/Container"
import GridBox from "components/layouts/GridBox"
import Stack from "components/layouts/Stack"
import SpinningProgress from "components/progress/SpinningProgress"
import Layout from "components/__global__/Layout"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { ParsedUrlQuery } from "querystring"
import React, { useRef } from "react"
import connect from "src/database/mongoose"
import { useAppDispatch } from "src/hooks/redux"
import useIntersectionObserver from "src/hooks/useIntersectionObserver"
import Product from "src/models/Product"
import { addToCart } from "src/redux/slices/cart"
import parseApi, { DataProductFull } from "src/utils/parseApi"
import tw, { styled, theme } from "twin.macro"

const AllProducts = dynamic(import("components/__global__/AllProducts"), {
  loading: () => <SpinningProgress />,
})

interface ProductProp {
  item: DataProductFull
}

const NutriText = styled(Text)(() => [
  tw`font-semibold text-gray-900 inline-block border-b border-b-black/25 pb-1`,
  {
    ["span"]: {
      fontWeight: theme`fontWeight.bold`,
    },
    [".inner-label"]: {
      paddingLeft: theme`spacing.5`,
    },
  },
])

const ProductDetail = ({ item }: ProductProp) => {
  const dispatch = useAppDispatch()
  const { imageUrl, name, nutritions, price, variety } = item
  const cartItem = { _id: item._id, imageUrl, name, price, variety }

  const {
    calories,
    calcium,
    carbohydrate,
    fat,
    fiber,
    iron,
    magnesium,
    protein,
    vitaminB6,
    vitaminC,
  } = nutritions
  const elementRef = useRef<HTMLDivElement>(null)
  const io = useIntersectionObserver(elementRef, {
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  const isIntersecting = io?.isIntersecting

  return (
    <Layout title={`${name} - ${variety}`}>
      <Container maxWidth="lg">
        <Stack rowGap={3}>
          <Container maxWidth="md">
            <GridBox gridColumns={{ xs: 1, md: 2 }} columnGap={2}>
              <Image
                src={imageUrl}
                alt="product"
                width={500}
                height={500}
                tw="drop-shadow-lg md:sticky md:top-0"
              />
              <Stack rowGap={1}>
                <Stack
                  rowGap={1}
                  alignItems="start"
                  tw="capitalize border-b-2 border-double border-black/50 pb-4"
                >
                  <Text as="h1" variant="header" tw="mb-3">
                    Details:
                  </Text>

                  <Text variant="title">{name}</Text>

                  <Text variant="subtitle" tw="font-bold text-gray-600">
                    {variety}
                  </Text>

                  <Text variant="subtitle" tw="font-bold">
                    Fruit
                  </Text>

                  <Text tw="font-bold text-warning-dark">&#8369;{price}</Text>

                  <Button onClick={() => dispatch(addToCart(cartItem))}>
                    Add To Cart
                  </Button>
                </Stack>
                <Stack rowGap={1} tw="pb-2">
                  {/* //todo: FACTS */}
                  <Text
                    as="h1"
                    variant="header"
                    tw="border-b-2 mb-0 pb-2 border-black/25"
                  >
                    Nutrition Facts
                  </Text>
                  <NutriText>
                    <span>Amount Per</span> 100 grams
                  </NutriText>
                  <NutriText>
                    <span>Calories</span> {calories} grams
                  </NutriText>
                  {/* //todo: MINIERALS */}
                  <NutriText>
                    <span>Total</span> {fat.total}g
                  </NutriText>
                  <NutriText>
                    <span className="inner-label">Saturated Total</span>{" "}
                    {fat.saturatedFat}g
                  </NutriText>
                  <NutriText>
                    <span>Fiber</span> {fiber}g
                  </NutriText>
                  <NutriText>
                    <span>Protein</span> {protein}g
                  </NutriText>
                  <NutriText>
                    <span>Carbohydrate Total</span> {carbohydrate.total}g
                  </NutriText>
                  <NutriText>
                    <span className="inner-label">Dietary Fiber</span>{" "}
                    {carbohydrate.dietaryFiber}g
                  </NutriText>
                  <NutriText>
                    <span className="inner-label">Sugar</span>{" "}
                    {carbohydrate.sugar}g
                  </NutriText>
                  {/* //todo: VITAMINS */}
                  <GridBox rowGap={1} gridColumns={{ xs: 1, sm: 2 }}>
                    <NutriText>
                      <span>Vitamin C</span> {vitaminC} mg
                    </NutriText>
                    <NutriText>
                      <span>Vitamin B6</span> {vitaminB6} mg
                    </NutriText>
                    <NutriText>
                      <span>Calcium</span> {calcium} mg
                    </NutriText>
                    <NutriText>
                      <span>Iron</span> {iron} mg
                    </NutriText>
                    <NutriText tw="sm:col-span-2">
                      <span>Magnesium</span> {magnesium} mg
                    </NutriText>
                  </GridBox>
                </Stack>
              </Stack>
            </GridBox>
          </Container>
          <Stack ref={elementRef}>
            <Text variant="header">Browser More</Text>
            {isIntersecting && <AllProducts />}
          </Stack>
        </Stack>
      </Container>
    </Layout>
  )
}

export default ProductDetail

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  await connect()
  const response = await Product.find({})
  const items = await parseApi(response)

  const paths = items.map((item: DataProductFull) => ({
    params: { id: item._id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    await connect()
    const { id } = context.params as IParams
    const response = await Product.findById(id)
    const item = await parseApi(response)

    return { props: { item } }
  } catch (error) {
    throw new Error(error as string)
  }
}
