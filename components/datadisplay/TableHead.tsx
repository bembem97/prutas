import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"

interface TableHeadProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: TableHeadProps) => [
  //todo: DEFAULTS
  tw`table-header-group border-b-2 border-b-black/25`,

  //todo: PROPS
]

const TableHead = styled("thead", options)(styles)
export default TableHead
