import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

type ColRow = number | string | "none"

const gridRowsFunc = (row: ColRow = 1, breakpoint: string = "none") => {
  const rows = [
    "grid-template-rows: repeat(1, minmax(0, 1fr))",
    "grid-template-rows: repeat(2, minmax(0, 1fr))",
    "grid-template-rows: repeat(3, minmax(0, 1fr))",
    "grid-template-rows: repeat(4, minmax(0, 1fr))",
    "grid-template-rows: repeat(5, minmax(0, 1fr))",
    "grid-template-rows: repeat(6, minmax(0, 1fr))",
    // "grid-template-rows: none",
  ]

  if (typeof row === "string" && row === "none") {
    return "grid-template-rows: none"
  }

  if (typeof row === "string") {
    return css`
      grid-template-rows: ${row};
    `
  }

  switch (breakpoint) {
    case "none":
      return rows[row - 1]

    case "xs":
      return css`
        @media (min-width: ${theme`screens.xs`}) {
          ${rows[row - 1]}
        }
      `
    case "sm":
      return css`
        @media (min-width: ${theme`screens.sm`}) {
          ${rows[row - 1]}
        }
      `

    case "md":
      return css`
        @media (min-width: ${theme`screens.md`}) {
          ${rows[row - 1]}
        }
      `

    case "lg":
      return css`
        @media (min-width: ${theme`screens.lg`}) {
          ${rows[row - 1]}
        }
      `

    case "xl":
      return css`
        @media (min-width: ${theme`screens.xl`}) {
          ${rows[row - 1]}
        }
      `

    case "xxl":
      return css`
        @media (min-width: ${theme`screens.2xl`}) {
          ${rows[row - 1]}
        }
      `

    default:
      throw new Error("Invalid breakpoints. xs | sm | md | lg | xl | xxl")
  }
}

const gridColumnsFunc = (col: ColRow = 1, breakpoint: string = "none") => {
  const cols = [
    "grid-template-columns: repeat(1, minmax(0, 1fr))",
    "grid-template-columns: repeat(2, minmax(0, 1fr))",
    "grid-template-columns: repeat(3, minmax(0, 1fr))",
    "grid-template-columns: repeat(4, minmax(0, 1fr))",
    "grid-template-columns: repeat(5, minmax(0, 1fr))",
    "grid-template-columns: repeat(6, minmax(0, 1fr))",
    "grid-template-columns: repeat(7, minmax(0, 1fr))",
    "grid-template-columns: repeat(8, minmax(0, 1fr))",
    "grid-template-columns: repeat(9, minmax(0, 1fr))",
    "grid-template-columns: repeat(10, minmax(0, 1fr))",
    "grid-template-columns: repeat(11, minmax(0, 1fr))",
    "grid-template-columns: repeat(12, minmax(0, 1fr))",
    // "grid-template-columns: none",
  ]

  if (typeof col === "string" && col === "none") {
    return "grid-template-columns: none"
  }

  switch (breakpoint) {
    case "none":
      return "grid-template-columns: none"

    case "xs":
      if (typeof col === "string") {
        return css`
          @media (min-width: ${theme`screens.xs`}) {
            grid-template-columns: ${col};
          }
        `
      }
      return css`
        @media (min-width: ${theme`screens.xs`}) {
          ${cols[col - 1]}
        }
      `

    case "sm":
      if (typeof col === "string") {
        return css`
          @media (min-width: ${theme`screens.sm`}) {
            grid-template-columns: ${col};
          }
        `
      }
      return css`
        @media (min-width: ${theme`screens.sm`}) {
          ${cols[col - 1]}
        }
      `

    case "md":
      if (typeof col === "string") {
        return css`
          @media (min-width: ${theme`screens.md`}) {
            grid-template-columns: ${col};
          }
        `
      }
      return css`
        @media (min-width: ${theme`screens.md`}) {
          ${cols[col - 1]}
        }
      `

    case "lg":
      if (typeof col === "string") {
        return css`
          @media (min-width: ${theme`screens.lg`}) {
            grid-template-columns: ${col};
          }
        `
      }
      return css`
        @media (min-width: ${theme`screens.lg`}) {
          ${cols[col - 1]}
        }
      `

    case "xl":
      if (typeof col === "string") {
        return css`
          @media (min-width: ${theme`screens.xl`}) {
            grid-template-columns: ${col};
          }
        `
      }
      return css`
        @media (min-width: ${theme`screens.xl`}) {
          ${cols[col - 1]}
        }
      `

    case "xxl":
      if (typeof col === "string") {
        return css`
          @media (min-width: ${theme`screens.2xl`}) {
            grid-template-columns: ${col};
          }
        `
      }
      return css`
        @media (min-width: ${theme`screens.2xl`}) {
          ${cols[col - 1]}
        }
      `

    default:
      throw new Error("Invalid breakpoints. xs | sm | md | lg | xl | xxl")
  }
}

interface GridProps {
  gap?: number
  rowGap?: number
  columnGap?: number

  gridRows?: ColRow
  xsGridRows?: ColRow
  smGridRows?: ColRow
  mdGridRows?: ColRow
  lgGridRows?: ColRow
  xlGridRows?: ColRow
  xxlGridRows?: ColRow

  gridColumns?: ColRow
  xsGridColumns?: ColRow
  smGridColumns?: ColRow
  mdGridColumns?: ColRow
  lgGridColumns?: ColRow
  xlGridColumns?: ColRow
  xxlGridColumns?: ColRow
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) &&
    prop !== "gap" &&
    prop !== "rowGap" &&
    prop !== "columnGap" &&
    prop !== "gridRows" &&
    prop !== "xsGridRows" &&
    prop !== "smGridRows" &&
    prop !== "mdGridRows" &&
    prop !== "lgGridRows" &&
    prop !== "xlGridRows" &&
    prop !== "2xlGridRows" &&
    prop !== "gridRows" &&
    prop !== "xsGridColumns" &&
    prop !== "smGridColumns" &&
    prop !== "mdGridColumns" &&
    prop !== "lgGridColumns" &&
    prop !== "xlGridColumns" &&
    prop !== "xxlGridColumns",
}

const styles = ({
  gap,
  rowGap,
  columnGap,

  gridRows,
  xsGridRows,
  smGridRows,
  mdGridRows,
  lgGridRows,
  xlGridRows,
  xxlGridRows,

  gridColumns,
  xsGridColumns,
  smGridColumns,
  mdGridColumns,
  lgGridColumns,
  xlGridColumns,
  xxlGridColumns,
}: GridProps) => [
  //todo: DEFAULTS
  tw`grid`,

  //todo: PROPS
  gridRows && css(gridRowsFunc(gridRows)),
  xsGridRows && css(gridRowsFunc(xsGridRows, "xs")),
  smGridRows && css(gridRowsFunc(smGridRows, "sm")),
  mdGridRows && css(gridRowsFunc(mdGridRows, "md")),
  lgGridRows && css(gridRowsFunc(lgGridRows, "lg")),
  xlGridRows && css(gridRowsFunc(xlGridRows, "xl")),
  xxlGridRows && css(gridRowsFunc(xxlGridRows, "xxl")),

  gridColumns && gridColumnsFunc(gridColumns),
  xsGridColumns && gridColumnsFunc(xsGridColumns, "xs"),
  smGridColumns && gridColumnsFunc(smGridColumns, "sm"),
  mdGridColumns && gridColumnsFunc(mdGridColumns, "md"),
  lgGridColumns && gridColumnsFunc(lgGridColumns, "lg"),
  xlGridColumns && gridColumnsFunc(xlGridColumns, "xl"),
  xxlGridColumns && gridColumnsFunc(xxlGridColumns, "xxl"),

  gap && css({ gap: `${8 * gap}px` }),
  rowGap && css({ rowGap: `${8 * rowGap}px` }),
  columnGap && css({ columnGap: `${8 * columnGap}px` }),
]

const Grid = styled("div", options)(styles)
export default Grid
