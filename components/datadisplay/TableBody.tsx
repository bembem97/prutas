import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"
import TableRow from "./TableRow"

interface TableBodyProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: TableBodyProps) => [
  //todo: DEFAULTS
  tw`md:table-row-group border-double border-b-4 border-b-black`,
  tw`flex flex-col gap-y-2`,
  css`
    @media (max-width: ${theme`screens.md`}) {
      ${TableRow} {
        background-color: ${theme`colors.white`};
      }
    }
  `,

  //todo: PROPS
]

const TableBody = styled("tbody", options)(styles)
export default TableBody
