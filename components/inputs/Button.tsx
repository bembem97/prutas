import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface ButtonProps {
  color?: string
}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== "color",
}

const styles = ({ color }: ButtonProps) => [
  tw`transition-colors shadow rounded uppercase text-sm`,
  tw`px-3 py-1 inline-flex items-center justify-center text-center`,
  tw`bg-primary hover:bg-primary-dark text-white`,
  css`
    min-height: 32px;
  `,

  //todo: PROPS
  color === "primary" && tw`bg-primary text-white hover:bg-primary-dark`,
  color === "error" && tw`bg-error text-white hover:bg-error-dark`,
  color === "warning" && tw`bg-warning text-white hover:bg-warning-dark`,
]

const Button = styled("button", options)(styles)
export default Button
