// <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>

import React from "react"
import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface SVGProps {
  width?: number
  height?: number
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== "width" && prop !== "height",
}

const styles = ({ width, height }: SVGProps) => [
  //todo: DEFAULTS

  //todo: PROPS
  width &&
    css`
      width: ${width * 8}px;
    `,
  height &&
    css`
      height: ${height * 8}px;
    `,
]

const MenuComponent = ({ fill, ...props }: { fill?: string }) => {
  return (
    <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
  )
}

const Menu = styled(MenuComponent, options)(styles)
export default Menu
