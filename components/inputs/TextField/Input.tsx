import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface InputProps {
  fullWidth?: boolean
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== "fullWidth",
}

const styles = ({ fullWidth }: InputProps) => [
  //todo: DEFAULTS
  tw`outline-none p-1 py-2 bg-transparent transition-colors`,
  tw`border-b-2 border-b-gray-400 rounded-tl rounded-tr focus:bg-gray-50 invalid:border-b-error focus:border-b-primary`,

  //todo: PROPS
  fullWidth && tw`w-full`,
]

const Input = styled("input", options)(styles)

Input.defaultProps = {
  type: "text",
}

export default Input
