import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import Text from "components/datadisplay/Text"

interface CardContentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: CardContentProps) => [
  //todo: DEFAULTS
  tw`p-2`,
  css`
    ${Text} {
      text-transform: capitalize;
    }
  `,

  //todo: PROPS
]

const CardContent = styled("div", options)(styles)
export default CardContent
