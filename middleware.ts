// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(function middleware(req) {
  console.log("nextauth", req.nextauth.token)
  console.log("nextUrl", req.nextUrl)
  console.log("cookies", req.cookies)
  console.log("url", req.url)

  const token = req.nextauth.token
  const pathname = req.nextUrl.pathname

  if (!token) {
    return NextResponse.rewrite(new URL("/signup", req.url))
  }

  if (token && pathname === "/checkout") {
    return NextResponse.rewrite(new URL("/checkout", req.url))
  }

  if (token && pathname === "/orders") {
    return NextResponse.rewrite(new URL("/orders", req.url))
  }
})

export const config = { matcher: ["/orders", "/checkout"] }
