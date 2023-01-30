import React, { useRef, useState } from "react"
import Meta from "./Meta"
import { ComponentProps } from "src/interfaceProps"
import AppBar from "components/surfaces/AppBar"
import Toolbar from "components/surfaces/Toolbar"
import Stack from "components/layouts/Stack"
import Link from "components/navigations/Link"
import tw, { styled } from "twin.macro"
import { useRouter } from "next/router"
import Button from "components/inputs/Button"
// import Authentication from "./Authentication"
import dynamic from "next/dynamic"
import useToggle from "src/hooks/useToggle"
import Text from "components/datadisplay/Text"
import MenuIcon from "components/icons/Menu"
import Badge from "components/datadisplay/Badge"
import { useAppSelector } from "src/hooks/redux"
const Authentication = dynamic(import("./Authentication"))

interface LayoutProps extends ComponentProps {
  title: string
}

interface ActiveLink {
  pathname: string
  href: string
}

const AuthButton = styled(Button)(
  tw`text-white font-semibold px-1 hover:text-white inline-flex ml-auto`
)
const MenuButton = styled(Button)(
  tw`p-0 px-1 shadow-none hover:bg-primary-dark inline-flex mobile:hidden`
)

const active = ({ pathname, href }: ActiveLink) =>
  pathname === href && tw`bg-primary-darker`

const Layout = ({ title, children }: LayoutProps) => {
  const { pathname } = useRouter()
  const authRef = useRef(null)
  const { isOpen, setIsOpen } = useToggle(authRef)
  const count = useAppSelector((state) => state.slices.cart.items.length)
  const drawerRef = useRef(null)
  const { isOpen: openDrawer, setIsOpen: setIsOpenDrawer } =
    useToggle(drawerRef)

  const hrefName = pathname === "/signin" ? "/signin" : "/signup"

  return (
    <>
      <Meta title={title} />

      {/* //todo: HEAD NAV LINKS */}
      <AppBar as="header" className="header">
        <Toolbar ref={drawerRef}>
          <MenuButton onClick={() => setIsOpenDrawer(!openDrawer)}>
            <MenuIcon height={4} width={4} tw="fill-white" />
          </MenuButton>

          <div tw="w-full hidden mobile:flex" css={[openDrawer && tw`flex`]}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              tw="w-full text-white bg-primary-dark mobile:bg-primary shadow-md mobile:shadow-none absolute top-full mobile:static mobile:top-auto left-0 h-12"
            >
              <Link href="/" css={[active({ pathname, href: "/" })]}>
                Home
              </Link>

              <Badge count={count}>
                <Link href="/cart" css={[active({ pathname, href: "/cart" })]}>
                  Cart
                </Link>
              </Badge>

              <Link
                href="/checkout"
                css={[active({ pathname, href: "/checkout" })]}
              >
                Checkout
              </Link>
              <Link
                href="/orders"
                css={[active({ pathname, href: "/orders" })]}
              >
                Orders
              </Link>
            </Stack>
          </div>

          <AuthButton
            buttonType="text"
            css={[
              active({
                pathname,
                href: hrefName,
              }),
            ]}
            onClick={() => setIsOpen(true)}
          >
            <Text tw="w-max">Sign In | Sign Up</Text>
          </AuthButton>

          {isOpen && (
            <Authentication
              authRef={authRef}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
          {/* <Link href="/signin" css={[active({ pathname, href: "/signin" })]}>
              Sign In
            </Link> */}
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
