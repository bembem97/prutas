import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"
import TableCell from "./TableCell"

interface TableProps extends ComponentProps {}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop),
}

const styles = ({}: TableProps) => [
  //todo: DEFAULTS
  tw`table w-full border-collapse border-spacing-0 table-auto`,

  css`
    @media (max-width: ${theme`screens.xs`}) {
      ${TableCell}:first-of-type {
        min-width: 155px;
      }

      ${TableCell}:nth-of-type(1n + 2) {
        min-width: 0.1%;
        width: auto;
      }
    }
  `,

  //todo: PROPS
]

const Table = styled("table", options)(styles)
export default Table
