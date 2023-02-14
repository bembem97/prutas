import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import Link from "../navigations/Link"

interface ToolbarProps {}

const options = {
    shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: ToolbarProps) => [
    //todo: DEFAULTS
    tw`flex items-center px-2 h-full`,
    {
        [`${Link}`]: tw`p-1 transition-colors hover:bg-primary-dark`,
    },

    //todo: PROPS
]

const Toolbar = styled("div", options)(styles)
export default Toolbar
