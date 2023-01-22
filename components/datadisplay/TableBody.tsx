import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"

interface TableBodyProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: TableBodyProps) => [
  //todo: DEFAULTS
  tw`table-row-group border-double border-b-4 border-b-black`,

  //todo: PROPS
]

const TableBody = styled("tbody", options)(styles)
export default TableBody
