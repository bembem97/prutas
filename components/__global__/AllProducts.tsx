import Text from "components/datadisplay/Text"
import GridBox from "components/layouts/GridBox"
import CardSkeleton from "components/progress/CardSkeleton"
import ProductCardList from "components/__other__/ProductCardList"
import React from "react"
import { useGetProductsQuery } from "src/redux/slices/product"
import tw from "twin.macro"

const AllProducts = (): JSX.Element => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  if (error) {
    return (
      <Text
        variant="title"
        color="error"
        tw="sm:col-span-2 md:col-span-3 tab:col-span-4"
        align="center"
      >
        {"There's an error to your query."}
      </Text>
    )
  }

  // if (!products) {
  //   return (
  //     <Text
  //       variant="title"
  //       color="error"
  //       tw="sm:col-span-2 md:col-span-3 tab:col-span-4"
  //       align="center"
  //     >
  //       {"Product is empty."}
  //     </Text>
  //   )
  // }

  if (isLoading) {
    return (
      <GridBox gridColumns={{ xs: 1, sm: 2, md: 3, tab: 4 }} gap={1}>
        {[1, 2, 3, 4].map((item) => (
          <CardSkeleton key={item} />
        ))}
      </GridBox>
    )
  }

  return (
    <GridBox gridColumns={{ xs: 1, sm: 2, md: 3, tab: 4 }} gap={1}>
      <ProductCardList data={products!} />
    </GridBox>
  )
}

export default AllProducts
