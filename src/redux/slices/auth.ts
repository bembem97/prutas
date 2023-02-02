import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASEURL_QUERY }),
  endpoints: (builder) => ({
    signupAccount: builder.mutation({
      query: (data) => ({
        url: "/api/signup",
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),

    // signinAccount: builder.mutation({
    //   query: (data) => ({
    //     url: "/api/auth/signin",
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }),
    // })
  }),
})

export const { useSignupAccountMutation } = authApi
