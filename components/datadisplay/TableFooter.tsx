import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"
import TableCell from "./TableCell"

interface TableFooterProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: TableFooterProps) => [
  //todo: DEFAULTS
  tw`table-footer-group`,
  { [`${TableCell}`]: tw`pt-6` },

  //todo: PROPS
]

const TableFooter = styled("tfoot", options)(styles)
export default TableFooter
