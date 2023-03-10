import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { ComponentProps } from "src/interfaceProps"

interface TableCellProps extends ComponentProps {
  align?: "left" | "center" | "right"
}

const options = {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== "align",
}

const styles = ({ align }: TableCellProps) => [
  //todo: DEFAULTS
  tw`flex justify-between flex-wrap md:table-cell text-sm leading-3 text-left px-2 py-3 whitespace-nowrap`,
  tw`before:content-[attr(data-head)] before:font-bold md:before:hidden`,

  //todo: PROPS
  align === "left" && tw`text-left`,
  align === "center" && tw`text-center`,
  align === "right" && tw`text-right`,
]

const TableCell = styled("td", options)(styles)
export default TableCell
