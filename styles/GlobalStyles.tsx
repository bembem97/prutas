import React from "react"
import { Global } from "@emotion/react"
import tw, { css, theme, GlobalStyles as BaseStyles } from "twin.macro"

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased bg-gray-100`,
  },

  "*,::before,::after": {
    boxSizing: "border-box",
    margin: 0,
  },

  "html, body, #__next": {
    minHeight: "100vh",
  },

  "#__next": {
    // display: "grid",
    // gridTemplateRows: "minmax(40px, auto) 1fr",
    ...tw`grid grid-rows-[minmax(40px,auto)_1fr_minmax(60px,auto)]`,
  },
})

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
