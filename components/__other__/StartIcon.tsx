import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"
import Stack from "components/layouts/Stack"
import { CSSInterpolation } from "@emotion/css"

interface StartIconProps extends ComponentProps {
  error?: string
  icon?: React.ComponentType<any>
  css?: CSSInterpolation
  buttonIcon?: boolean
}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== "error",
}

const styles = ({ buttonIcon }: StartIconProps) => [
  //todo: DEFAULTS
  tw`flex-row`,

  //todo: PROPS
  buttonIcon && tw`gap-x-1`,
]

const StartIconComponent = styled(Stack, options)(styles)

const StartIcon: React.FunctionComponent<StartIconProps> = ({
  children,
  icon: Component,
  ...props
}) => {
  return (
    <StartIconComponent {...props}>
      {Component && (
        <i tw="shrink grow-0 basis-auto inline-flex items-center">
          {<Component width={3} height={3} />}
        </i>
      )}
      {children}
    </StartIconComponent>
  )
}
export default StartIcon
