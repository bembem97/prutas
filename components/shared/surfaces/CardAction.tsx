import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface CardActionProps {}

const options = {
    shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: CardActionProps) => [
    //todo: DEFAULTS
    tw`px-2 py-1 flex items-center`,

    //todo: PROPS
]

const CardAction = styled("footer", options)(styles)
export default CardAction
