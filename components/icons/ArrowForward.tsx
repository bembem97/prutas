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

const ArrowForwardComponent = ({ fill, ...props }: { fill?: string }) => {
  return (
    <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"
      ></path>
    </svg>
  )
}

const ArrowForward = styled(ArrowForwardComponent, options)(styles)
export default ArrowForward
