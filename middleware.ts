// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    //   console.log("nextauth", req.nextauth.token)
    //   console.log("nextUrl", req.nextUrl)
    //   console.log("cookies", req.cookies)
    //   console.log("url", req.url)

    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    if (pathname === "/checkout" && token) {
      return NextResponse.rewrite(new URL("/checkout", req.url))
    }
  },
  { secret: process.env.NEXTAUTH_SECRET }
)

export const config = { matcher: ["/orders", "/checkout"] }
