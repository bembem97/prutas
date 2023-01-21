import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface AppBarProps {
  color?: string
  position?: string
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && prop !== "color" && prop !== "position",
}

const styles = ({ color, position = "sticky" }: AppBarProps) => [
  //todo: DEFAULTS
  tw`bg-primary shadow-sm`,

  css`
    &.header {
      z-index: 10;
    }

    &.footer {
      padding-top: ${theme`spacing.4`};
      padding-bottom: ${theme`spacing.4`};
      color: white;
      font-weight: 600;

      & > div {
        justify-content: center;
      }
    }
  `,

  //todo: PROPS
  position === "sticky" && tw`sticky top-0`,
]

const AppBar = styled("div", options)(styles)
export default AppBar
