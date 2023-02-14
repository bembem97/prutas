import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"
import NextImage from "next/image"

interface ImageProps extends ComponentProps {
  square?: boolean
  objectFit?: "contain" | "cover"
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) &&
    prop !== "square" &&
    prop !== "as" &&
    prop !== "objectFit",
}

const styles = ({ square, objectFit }: ImageProps) => [
  //todo: DEFAULTS
  tw`max-w-full h-auto block`,

  //todo: PROPS
  square && tw`aspect-square`,

  objectFit === "contain" && tw`object-contain`,
  objectFit === "cover" && tw`object-cover`,
]

const Image = styled(NextImage, options)(styles)
export default Image
