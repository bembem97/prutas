import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import Link from "components/navigations/Link"

interface ToolbarProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: ToolbarProps) => [
  //todo: DEFAULTS
  tw`flex items-center px-2 h-full`,
  css`
    ${Link} {
      padding: ${theme`spacing.1`};
      padding-inline: ${theme`spacing.1.5`};
      transition: background-color 100ms;

      &:hover {
        background-color: ${theme`colors.primary-dark`};
      }
    }
  `,

  //todo: PROPS
]

const Toolbar = styled("div", options)(styles)
export default Toolbar
