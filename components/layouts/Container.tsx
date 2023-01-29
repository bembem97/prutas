import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface ContainerProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "mobile" | "tab" | "laptop"

  noPadding?: boolean
  noPaddingX?: boolean
  noPaddingY?: boolean

  paddingX?: number
  paddingY?: number
  padding?: number
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) &&
    prop !== "maxWidth" &&
    prop !== "noPadding" &&
    prop !== "noPaddingX" &&
    prop !== "noPaddingY" &&
    prop !== "paddingX" &&
    prop !== "paddingY" &&
    prop !== "padding",
}

const styles = ({
  maxWidth,

  noPadding,
  noPaddingX,
  noPaddingY,

  paddingX,
  paddingY,
  padding,
}: ContainerProps) => [
  //todo: DEFAULTS
  tw`px-2 py-1 block mx-auto`,

  //todo: PROPS
  paddingX &&
    css`
      padding-inline: ${paddingX * 8}px;
    `,
  paddingY &&
    css`
      padding-top: ${paddingY * 8}px;
      padding-bottom: ${paddingY * 8}px;
    `,
  padding &&
    css`
      padding: ${padding * 8}px;
    `,
  noPadding == true && tw`p-0`,
  noPaddingX == true && tw`px-0`,
  noPaddingY == true && tw`py-0`,

  maxWidth == "xs" && tw`max-w-screen-xs`,
  maxWidth == "sm" && tw`max-w-screen-sm`,
  maxWidth == "mobile" && tw`max-w-screen-mobile`,
  maxWidth == "md" && tw`max-w-screen-md`,
  maxWidth == "tab" && tw`max-w-screen-tab`,
  maxWidth == "lg" && tw`max-w-screen-lg`,
  maxWidth == "xl" && tw`max-w-screen-xl`,
  maxWidth == "laptop" && tw`max-w-screen-laptop`,
]

const Container = styled("div", options)(styles)
export default Container
