import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"

interface TableRowProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: TableRowProps) => [
  //todo: DEFAULTS
  tw`block md:table-row align-middle outline-0 md:even:bg-gray-50 shadow md:shadow-none rounded md:rounded-none`,

  //todo: PROPS
]

const TableRow = styled("tr", options)(styles)
export default TableRow
