import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"

interface TableContainerProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: TableContainerProps) => [
  //todo: DEFAULTS
  tw`overflow-x-auto`,

  //todo: PROPS
]

const TableContainer = styled("div", options)(styles)
export default TableContainer
