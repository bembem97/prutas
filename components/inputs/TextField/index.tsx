import Stack from "components/layouts/Stack"
import Text from "components/datadisplay/Text"
import React, { ComponentPropsWithRef, forwardRef } from "react"
import Input from "./Input"
import tw from "twin.macro"
import StartIcon from "components/__other__/StartIcon"
import { ErrorMessage } from "@hookform/error-message"
import { FormTypes } from "pages/checkout"
import { FieldErrorsImpl, UseFormRegister, Validate } from "react-hook-form"
import { CSSInterpolation } from "@emotion/css"

export type Ref = HTMLDivElement

type PatternTypes = {
  value: RegExp
  message: string
}

type ValidateTypes =
  | Validate<string | number, FormTypes>
  | Record<string, Validate<string | number, FormTypes>>
  | undefined

interface RulesInterface {
  pattern?: PatternTypes
  validate?: ValidateTypes
}

interface Props extends ComponentPropsWithRef<"input"> {
  register?: UseFormRegister<FormTypes>
  name?: string
  label: string
  startIcon?: React.ComponentType<any>
  errors?: Partial<FieldErrorsImpl<FormTypes>>
  tfCSS?: CSSInterpolation
  css?: CSSInterpolation
  requireMessage?: string
  rules?: RulesInterface
}

const TextField = forwardRef<Ref, Props>(
  (
    { label, name, register, startIcon, errors, tfCSS, rules, ...props },
    ref
  ) => {
    return (
      <Stack ref={ref} css={tfCSS}>
        <Text variant="caption" as="label" tw="font-semibold mb-1">
          {label}
        </Text>

        <StartIcon
          icon={startIcon}
          tw="border-b-2 border-b-gray-400 focus-within:bg-white focus-within:border-b-primary flex-row transition-colors rounded-tl rounded-tr"
          css={[
            errors?.[name as keyof FormTypes] &&
              tw`bg-error-lighter border-error`,
          ]}
        >
          <Input
            {...(register && {
              ...register(name as keyof FormTypes, {
                required: props.requireMessage,
                ...rules,
              }),
            })}
            css={props.css}
            {...props}
          />
        </StartIcon>

        <ErrorMessage
          errors={errors}
          name={name as keyof FormTypes}
          render={({ message }) => (
            <Text variant="caption" color="error">
              {message}
            </Text>
          )}
        />
      </Stack>
    )
  }
)

TextField.displayName = "TextField"

export default TextField
