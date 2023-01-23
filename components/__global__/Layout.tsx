import React from "react"
import Meta from "./Meta"
import { ComponentProps } from "src/interfaceProps"
import AppBar from "components/surfaces/AppBar"
import Toolbar from "components/surfaces/Toolbar"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import tw from "twin.macro"
import { useRouter } from "next/router"

interface LayoutProps extends ComponentProps {
  title: string
}

interface ActiveLink {
  pathname: string
  href: string
}

const active = ({ pathname, href }: ActiveLink) =>
  pathname === href && tw`bg-primary-darker`

const Layout = ({ title, children }: LayoutProps) => {
  const { pathname } = useRouter()

  return (
    <>
      <Meta title={title} />

      {/* //todo: HEAD NAV LINKS */}
      <AppBar as="header" className="header">
        <Toolbar>
          <Stack direction="row" justifyContent="center" tw="w-full text-white">
            <Link href="/" css={[active({ pathname, href: "/" })]}>
              Home
            </Link>

            <Link href="/cart" css={[active({ pathname, href: "/cart" })]}>
              Cart
            </Link>

            <Link
              href="/checkout"
              css={[active({ pathname, href: "/checkout" })]}
            >
              Checkout
            </Link>

            <Link href="/orders" css={[active({ pathname, href: "/orders" })]}>
              Orders
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* //todo: MAIN CONTENT */}
      <main>{children}</main>

      {/* //todo: FOOTER */}
      <AppBar as="footer" className="footer">
        <Toolbar>&copy; A Small College Project Site.</Toolbar>
      </AppBar>
    </>
  )
}

export default Layout
