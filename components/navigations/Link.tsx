import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"
import Text from "components/datadisplay/Text"
import NextLink from "next/link"

interface LinkProps extends ComponentProps {
  cardLink?: boolean
}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== "cardLink",
}

const styles = ({ cardLink }: LinkProps) => [
  //todo: DEFAULTS
  tw`rounded inline-block`,

  //todo: PROPS
  cardLink && tw`hover:bg-gray-300/20 transition-colors`,
]

const CustomLink = styled(Text, options)(styles)
const Link = CustomLink.withComponent(NextLink)

export default Link
