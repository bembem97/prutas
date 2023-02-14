import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface PaperProps {
  bgBlur?: number
}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== "bgBlur",
}

const styles = ({ bgBlur }: PaperProps) => [
  //todo: DEFAULTS
  tw`bg-white shadow shadow-gray-500 rounded`,

  //todo: PROPS
  bgBlur &&
    css`
      backdrop-filter: blur(${bgBlur}px);
      background-color: hsl(0, 0%, 100%, 0.5);
    `,
]

const Paper = styled("div", options)(styles)
export default Paper
