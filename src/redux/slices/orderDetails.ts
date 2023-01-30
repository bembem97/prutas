import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { OrderDetailsTypes } from "src/models/OrderDetails"

export const orderDetailsApi = createApi({
  reducerPath: "orderDetailsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASEURL_QUERY }),
  tagTypes: ["addOrder", "status"],
  endpoints: (builder) => ({
    getOrders: builder.query<{ result: OrderDetailsTypes[] }, void>({
      query: () => "/api/orderDetails",
      providesTags: ["addOrder", "status"],
    }),

    addOrder: builder.mutation({
      query: (data) => ({
        url: "/api/orderDetails",
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["addOrder"],
    }),

    updateStatus: builder.mutation({
      query: (data) => ({
        url: `/api/orderDetails`,
        method: "PATCH",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["status"],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateStatusMutation,
} = orderDetailsApi
