import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface HeroProps {
  url?: string
}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== "url",
}

const styles = ({ url }: HeroProps) => [
  //todo: DEFAULTS
  tw`grid h-screen bg-red-200 p-4 place-items-center bg-no-repeat bg-fixed bg-cover relative`,
  tw`before:absolute before:inset-0 before:bg-black/30`,
  css`
    max-height: ${theme`screens.lg`};
  `,

  //todo: PROPS
  url &&
    css`
      background-image: url(${url});
    `,
]

const Hero = styled("div", options)(styles)

export default Hero
