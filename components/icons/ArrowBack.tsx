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

const ArrowBackComponent = ({ fill, ...props }: { fill?: string }) => {
  return (
    <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
      ></path>
    </svg>
  )
}

const ArrowBack = styled(ArrowBackComponent, options)(styles)
export default ArrowBack
