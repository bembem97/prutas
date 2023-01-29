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

const UserComponent = ({ fill, ...props }: { fill?: string }) => {
  return (
    <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path>
    </svg>
  )
}

const User = styled(UserComponent, options)(styles)
export default User
