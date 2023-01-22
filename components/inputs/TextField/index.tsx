import Stack from "components/layouts/Stack"
import Text from "components/datadisplay/Text"
import React, {
  DOMAttributes,
  HTMLInputTypeAttribute,
  PropsWithChildren,
} from "react"
import Input from "./Input"
import tw, { styled } from "twin.macro"

// interface ContainerProps {
//   css?: DOMAttributes<HTMLDivElement>
// }

interface TextFieldProps {
  label: string
  type?: HTMLInputTypeAttribute
  fullWidth?: boolean
  containerProps?: DOMAttributes<HTMLDivElement>
}

const TextField = React.forwardRef<
  HTMLInputElement,
  PropsWithChildren<TextFieldProps>
>(({ label, containerProps, ...props }, ref) => {
  return (
    <Stack {...containerProps}>
      <Text variant="caption" as="label" tw="font-semibold mb-1">
        {label}
      </Text>

      <Input ref={ref} {...props} />

      <Text variant="caption" color="error">
        Error Message
      </Text>
    </Stack>
  )
})

TextField.displayName = "TextField"

export default TextField
