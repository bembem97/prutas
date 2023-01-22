import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"
import Text from "components/datadisplay/Text"
import NextLink from "next/link"

interface LinkProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: LinkProps) => [
  //todo: DEFAULTS
  tw`rounded`,

  //todo: PROPS
]

const CustomLink = styled(Text, options)(styles)
const Link = CustomLink.withComponent(NextLink)

export default Link
