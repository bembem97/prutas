import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"
import { SerializedStyles } from "@emotion/react"

type GridBreakpointsProps =
  | string
  | number
  | {
      xs?: number | string
      sm?: number | string
      mobile?: number | string
      md?: number | string
      tab?: number | string
      lg?: number | string
      xl?: number | string
      laptop?: number | string
    }

interface GridProps {
  gap?: number
  rowGap?: number
  columnGap?: number
  gridColumns?: GridBreakpointsProps
}

const gridBreakpoints = (value: GridBreakpointsProps) => {
  if (typeof value === "object") {
    let bp: SerializedStyles[] = []
    const mapObj: string[] = Object.keys(value)

    mapObj.forEach((item, i) => {
      const key = value[item as keyof GridBreakpointsProps]

      const isString = typeof key === "string" && key
      const isNumber =
        typeof key === "number" && `repeat(${key}, minmax(0, 1fr))`

      if (item === "xs") {
        bp = [
          ...bp,
          css`
            grid-template-columns: ${isNumber || isString};
          `,
        ]
      }

      if (item === "sm") {
        bp = [
          ...bp,
          css`
            @media (min-width: ${theme`screens.sm`}) {
              grid-template-columns: ${isNumber || isString};
            }
          `,
        ]
      }

      if (item === "mobile") {
        bp = [
          ...bp,
          css`
            @media (min-width: ${theme`screens.mobile`}) {
              grid-template-columns: ${isNumber || isString};
            }
          `,
        ]
      }

      if (item === "md") {
        bp = [
          ...bp,
          css`
            @media (min-width: ${theme`screens.md`}) {
              grid-template-columns: ${isNumber || isString};
            }
          `,
        ]
      }

      if (item === "tab") {
        bp = [
          ...bp,
          css`
            @media (min-width: ${theme`screens.tab`}) {
              grid-template-columns: ${isNumber || isString};
            }
          `,
        ]
      }

      if (item === "lg") {
        bp = [
          ...bp,
          css`
            @media (min-width: ${theme`screens.lg`}) {
              grid-template-columns: ${isNumber || isString};
            }
          `,
        ]
      }

      if (item === "xl") {
        bp = [
          ...bp,
          css`
            @media (min-width: ${theme`screens.xl`}) {
              grid-template-columns: ${isNumber || isString};
            }
          `,
        ]
      }

      if (item === "laptop") {
        bp = [
          ...bp,
          css`
            @media (min-width: ${theme`screens.laptop`}) {
              grid-template-columns: ${isNumber || isString};
            }
          `,
        ]
      }
    })

    return bp
  }

  if (typeof value === "string") {
    return css`
      grid-template-columns: ${value};
    `
  }

  return css`
    grid-template-columns: repeat(${value}, minmax(0, 1fr));
  `
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) &&
    prop !== "gap" &&
    prop !== "rowGap" &&
    prop !== "columnGap" &&
    prop !== "gridColumns",
}

const styles = ({ gap, rowGap, columnGap, gridColumns }: GridProps) => [
  //todo: DEFAULTS
  tw`grid`,

  //todo: PROPS
  gap && css({ gap: `${8 * gap}px` }),
  rowGap && css({ rowGap: `${8 * rowGap}px` }),
  columnGap && css({ columnGap: `${8 * columnGap}px` }),

  gridColumns && gridBreakpoints(gridColumns),
]

const GridBox = styled("div", options)(styles)
export default GridBox
