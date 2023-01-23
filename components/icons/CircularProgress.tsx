{
  /* <svg
  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
>
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="4"
    data-darkreader-inline-stroke=""
    
  ></circle>
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    data-darkreader-inline-fill=""
    
  ></path>
</svg> */
}
import React, { DOMAttributes, SVGAttributes } from "react"
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

interface SVGShapes {
  pathFill?: string
  circleFill?: string
}

const CircularProgressComponent = ({
  pathFill = theme`colors.primary`,
  circleFill = theme`colors.transparent`,
  ...props
}: SVGShapes) => {
  return (
    <svg
      {...props}
      tw="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={theme`colors.gray.300`}
        strokeWidth="4"
        fill={circleFill}
      ></circle>
      <path
        fill={pathFill}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

const CircularProgress = styled(CircularProgressComponent, options)(styles)
export default CircularProgress
