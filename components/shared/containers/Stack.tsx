import tw, { styled, css, theme } from "twin.macro"
import isPropValid from "@emotion/is-prop-valid"

interface StackProps {
  direction?: string
  gap?: number
  rowGap?: number
  columnGap?: number
  justifyContent?: "start" | "end" | "center" | "between"
  alignItems?: "start" | "end" | "center" | "stretch"
}

const options = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) &&
    prop !== "direction" &&
    prop !== "gap" &&
    prop !== "rowGap" &&
    prop !== "columnGap" &&
    prop !== "justifyContent" &&
    prop !== "alignItems",
}

const styles = ({
  direction,
  gap,
  rowGap,
  columnGap,
  justifyContent,
  alignItems,
}: StackProps) => [
  //todo: DEFAULTS
  tw`flex flex-col`,

  //todo: PROPS
  direction === "row" && tw`flex-row`,
  direction === "column" && tw`flex-col`,

  justifyContent === "center" && tw`justify-center`,
  justifyContent === "start" && tw`justify-start`,
  justifyContent === "end" && tw`justify-end`,
  justifyContent === "between" && tw`justify-between`,

  alignItems === "center" && tw`items-center`,
  alignItems === "start" && tw`items-start`,
  alignItems === "end" && tw`items-end`,
  alignItems === "stretch" && tw`items-stretch`,

  gap && css({ gap: `${8 * gap}px` }),
  rowGap && css({ rowGap: `${8 * rowGap}px` }),
  columnGap && css({ columnGap: `${8 * columnGap}px` }),
]

const Stack = styled("div", options)(styles)
export default Stack
