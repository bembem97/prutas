import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"

interface BadgeProps extends ComponentProps {
  count: number
}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== "count",
}

const styles = ({ count }: BadgeProps) => [
  //todo: DEFAULTS
  tw`relative`,
  tw`before:absolute before:hidden before:-top-1 before:text-center before:-right-2 before:bg-error before:text-white before:z-10 before:rounded-full before:w-4 before:h-4 before:text-xs`,

  //todo: PROPS
  count > 0 &&
    css`
      &:before {
        content: " ${count}";
        display: inline-block;
      }
    `,
]

const Badge = styled("div", options)(styles)
export default Badge
