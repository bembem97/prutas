import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { DataProduct } from "src/utils/parseApi"

export const productApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["getProducts"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<DataProduct[], void>({
      query: () => "/api/products",
      providesTags: ["getProducts"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery } = productApi
