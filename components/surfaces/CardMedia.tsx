import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import NextImage from "next/image"

interface CardMediaProps {
  square?: boolean
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== "square" && prop !== "as",
}

const styles = ({ square }: CardMediaProps) => [
  //todo: DEFAULTS
  tw`w-full h-auto block object-contain`,

  //todo: PROPS
  square && tw`aspect-square`,
]

const CardMedia = styled(NextImage, options)(styles)
export default CardMedia
