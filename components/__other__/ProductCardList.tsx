import Text from "components/datadisplay/Text"
import Button from "components/inputs/Button"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import Card from "components/surfaces/Card"
import CardAction from "components/surfaces/CardAction"
import CardContent from "components/surfaces/CardContent"
import CardMedia from "components/surfaces/CardMedia"
import React from "react"
import { useAppDispatch } from "src/hooks/redux"
import { addToCart } from "src/redux/slices/cart"
import { DataProduct } from "src/utils/parseApi"
import tw, { css } from "twin.macro"

const ProductCardList = ({
  data,
}: {
  data: DataProduct[] | undefined
}): JSX.Element => {
  return (
    <>
      {data?.map(({ _id, imageUrl, name, variety, price }) => (
        <ProductCard
          key={_id}
          _id={_id}
          name={name}
          price={price}
          variety={variety}
          imageUrl={imageUrl}
        />
      ))}
    </>
  )
}

export default ProductCardList

function ProductCard({ _id, imageUrl, name, variety, price }: DataProduct) {
  const dispatch = useAppDispatch()
  const item = { _id, imageUrl, name, variety, price }
  return (
    <Card key={_id} as="article">
      <Link cardLink href={{ pathname: "/product/[id]", query: { id: _id } }}>
        <CardMedia src={imageUrl} alt="fruit" width={350} height={350} />

        <CardContent>
          <Stack>
            <Text variant="subtitle">{name}</Text>
            <Text variant="subtitle">{variety}</Text>

            <Stack direction="row">
              <Text
                variant="subtitle"
                css={css`
                  flex: 1 1 60%;
                `}
              >
                Fruit
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
                &#8369;{price}
              </Text>
            </Stack>
          </Stack>
        </CardContent>
      </Link>

      <CardAction>
        <Button fullWidth onClick={() => dispatch(addToCart(item))}>
          Add To Cart
        </Button>
      </CardAction>
    </Card>
  )
}
