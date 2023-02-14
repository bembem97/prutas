import React, { useRef } from "react"
import Meta from "../global/Meta"
import { ComponentProps } from "src/interfaceProps"
import AppBar from "components/shared/surfaces/AppBar"
import Toolbar from "components/shared/surfaces/Toolbar"
// import Stack from "components/layouts/Stack"
// import Link from "components/navigations/Link"
import tw, { styled } from "twin.macro"
import { useRouter } from "next/router"
// import Button from "components/inputs/Button"
import dynamic from "next/dynamic"
import useToggle from "src/hooks/useToggle"
// import Text from "components/datadisplay/Text"
// import MenuIcon from "components/icons/Menu"
// import Badge from "components/datadisplay/Badge"
import { useAppSelector } from "src/hooks/redux"
import { useSession, signOut } from "next-auth/react"
import Button from "components/shared/inputs/Button"
import Link from "components/shared/navigations/Link"
import Stack from "components/shared/containers/Stack"
import Badge from "components/shared/datadisplay/Badge"
import Text from "components/shared/datadisplay/Text"
import GridBox from "components/shared/containers/GridBox"
import Container from "components/shared/containers/Container"
import Image from "components/shared/datadisplay/Image"
import MenuIcon from "components/shared/icons/Menu"
// import Image from "components/datadisplay/Image"
// import GridBox from "components/layouts/GridBox"
// import Container from "components/layouts/Container"

const Authentication = dynamic(import("../global/auth/Authentication"), {
    ssr: false,
})

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

const ButtonLink = Button.withComponent(Link)

// todo: MAIN COMPONENT
const Layout = ({ title, children }: LayoutProps) => {
    return (
        <>
            <Meta title={title} />

            {/* //todo: HEAD NAV LINKS */}
            <Navbar />

            {/* //todo: MAIN CONTENT */}
            <main>{children}</main>

            {/* //todo: FOOTER */}
            <AppBar as="footer" className="footer">
                <Toolbar>&copy; Some Footer.</Toolbar>
            </AppBar>
        </>
    )
}

export default Layout

function Navbar() {
    const router = useRouter()
    const { pathname, query } = router
    const authRef = useRef(null)
    const { isOpen, setIsOpen } = useToggle(authRef)
    const count = useAppSelector((state) => state.slices.cart.items.length)
    const drawerRef = useRef(null)
    const { isOpen: openDrawer, setIsOpen: setIsOpenDrawer } =
        useToggle(drawerRef)

    const { data: session, status } = useSession()

    const hrefName = pathname === "/signin" ? "/signin" : "/signup"

    return (
        <AppBar as="header" className="header">
            <Toolbar ref={drawerRef}>
                <MenuButton onClick={() => setIsOpenDrawer(!openDrawer)}>
                    <MenuIcon height={4} width={4} tw="fill-white" />
                </MenuButton>

                <div
                    tw="w-full hidden mobile:flex"
                    css={[openDrawer && tw`flex`]}
                >
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        tw="w-full text-white bg-primary-dark mobile:bg-primary shadow-md mobile:shadow-none absolute top-full mobile:static mobile:top-auto left-0 h-12"
                    >
                        <Link
                            href="/home"
                            css={[active({ pathname, href: "/" })]}
                        >
                            Home
                        </Link>

                        <Badge count={count}>
                            <Link
                                href="/cart"
                                css={[active({ pathname, href: "/cart" })]}
                            >
                                Cart
                            </Link>
                        </Badge>

                        {session && (
                            <>
                                <Link
                                    href="/checkout"
                                    css={[
                                        active({
                                            pathname,
                                            href: "/checkout",
                                        }),
                                    ]}
                                >
                                    Checkout
                                </Link>
                                <Link
                                    href="/orders"
                                    css={[
                                        active({
                                            pathname,
                                            href: "/orders",
                                        }),
                                    ]}
                                >
                                    Orders
                                </Link>
                            </>
                        )}
                    </Stack>
                </div>

                {/* //todo: IF SESSION IS NOT PRESENT - SIGNIN/SIGNUP    */}
                {!session && status === "loading" && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        tw="animate-pulse gap-x-1"
                    >
                        <div tw="basis-auto w-8 h-8 rounded-full bg-gray-500"></div>
                        <div tw="grow w-24 h-4 bg-gray-500 rounded-md"></div>
                    </Stack>
                )}

                {session === null && (
                    <>
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

                        <GridBox
                            tw="place-items-center fixed inset-0 bg-black/40 z-20"
                            css={[isOpen === null && tw`hidden`]}
                        >
                            <Container
                                ref={authRef}
                                maxWidth="md"
                                css={[
                                    tw`relative`,
                                    isOpen && tw`animate-fade-in`,
                                    isOpen === false && tw`animate-fade-out`,
                                ]}
                            >
                                {isOpen !== null && (
                                    <Authentication setIsOpen={setIsOpen} />
                                )}
                            </Container>
                        </GridBox>
                    </>
                )}

                {session && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        tw="min-w-max ml-auto"
                    >
                        <Image
                            src={session.user?.image as string}
                            alt="avatar"
                            width={32}
                            height={32}
                            tw="rounded-full"
                        />

                        <ButtonLink
                            href="/api/auth/signout"
                            tw="shadow-none"
                            onClick={async (e) => {
                                e.preventDefault()
                                const data = await signOut({
                                    redirect: false,
                                    callbackUrl:
                                        (query.callbackUrl as string) ||
                                        (query.id &&
                                            `/product/${query.id as string}`) ||
                                        undefined,
                                })
                                router.push(data.url)
                            }}
                        >
                            Sign Out
                        </ButtonLink>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    )
}
