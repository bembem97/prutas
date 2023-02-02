import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface ButtonProps {
  color?: "error" | "warning" | "primary" | string
  buttonType?: "button" | "icon" | "text"
  fullWidth?: boolean
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== "color" && prop !== "buttonType",
}

const styles = ({
  fullWidth,
  color = "primary",
  buttonType = "button",
}: ButtonProps) => [
  tw`transition-colors shadow rounded uppercase text-sm`,
  tw`inline-flex items-center justify-center text-center whitespace-nowrap`,
  // tw`bg-primary hover:bg-primary-dark text-white`,

  //todo: PROPS
  color === "primary" && tw`bg-primary text-white hover:bg-primary-dark`,
  color === "error" && tw`bg-error text-white hover:bg-error-dark`,
  color === "warning" && tw`bg-warning text-white hover:bg-warning-dark`,

  // todo: COLOR === primary AND TYPE === text
  color === "primary" &&
    buttonType === "text" &&
    tw`text-primary-dark hover:text-primary-darker`,

  // todo: COLOR === error AND TYPE === text
  color === "error" &&
    buttonType === "text" &&
    tw`text-error-dark hover:text-error-darker`,

  // todo: COLOR === warning AND TYPE === text
  color === "warning" &&
    buttonType === "text" &&
    tw`text-warning-dark hover:text-warning-darker`,

  buttonType === "button" && tw`px-3 py-1 min-h-[32px]`,
  buttonType === "icon" && tw`p-0 h-6 rounded-full w-6 min-h-[12px]`,
  buttonType === "text" &&
    tw`p-0 bg-transparent shadow-none hover:bg-transparent hover:underline`,

  fullWidth && tw`w-full`,
]

const Button = styled("button", options)(styles)
export default Button
