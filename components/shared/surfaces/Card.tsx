import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import Paper from "./Paper"

interface CardProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: CardProps) => [
  //todo: DEFAULTS
  tw`overflow-hidden`,

  //todo: PROPS
]

const Card = styled(Paper, options)(styles)
export default Card
