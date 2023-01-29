import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"

interface TextProps extends ComponentProps {
  color?: string
  variant?: "large" | "header" | "title" | "paragraph" | "subtitle" | "caption"
  align?: "left" | "center" | "right"
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== "color" && prop !== "as" && prop !== "align",
}

const styles = ({ color, variant = "paragraph", align }: TextProps) => [
  //todo: DEFAULTS
  tw`font-sans`,

  //todo: PROPS
  variant === "large" && tw`text-4xl md:text-5xl lg:text-6xl`,
  variant === "header" &&
    tw`text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 block font-semibold`,
  variant === "title" &&
    tw`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold`,
  variant === "paragraph" && tw`text-base`,
  variant === "subtitle" && tw`text-sm font-semibold`,
  variant === "caption" && tw`text-xs`,

  align === "left" && tw`text-left`,
  align === "center" && tw`text-center`,
  align === "right" && tw`text-right`,

  color === "error" && tw`text-error`,
  color === "error.dark" && tw`text-error-dark`,

  color === "warning" && tw`text-warning`,
  color === "warning.dark" && tw`text-warning-dark`,

  color === "primary" && tw`text-primary`,
  color === "primary.dark" && tw`text-primary-dark`,
]

const Text = styled("span", options)(styles)
export default Text
