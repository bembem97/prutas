import Stack from "components/shared/containers/Stack"
import Text from "components/shared/datadisplay/Text"
import React, { ComponentPropsWithRef, forwardRef } from "react"
import Input from "./Input"
import tw from "twin.macro"
import StartIcon from "components/__other__/StartIcon"
import { ErrorMessage } from "@hookform/error-message"
import { FieldErrorsImpl, UseFormRegister, Validate } from "react-hook-form"
import { CSSInterpolation } from "@emotion/css"

export type Ref = HTMLDivElement

interface SignUpTypes {
    name: string
    email: string
    password: string
    repeatPassword: string
}

type PatternTypes = {
    value: RegExp
    message: string
}

type ValidateTypes =
    | Validate<string | number, SignUpTypes>
    | Record<string, Validate<string | number, SignUpTypes>>
    | undefined

interface RulesInterface {
    pattern?: PatternTypes
    validate?: ValidateTypes
}

interface Props extends ComponentPropsWithRef<"input"> {
    register?: UseFormRegister<SignUpTypes>
    name?: string
    label: string
    startIcon?: React.ComponentType<any>
    errors?: Partial<FieldErrorsImpl<SignUpTypes>>
    tfCSS?: CSSInterpolation
    css?: CSSInterpolation
    requireMessage?: string
    rules?: RulesInterface
}

const SignupField = forwardRef<Ref, Props>(
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
                        errors?.[name as keyof SignUpTypes] &&
                            tw`bg-error-lighter border-error`,
                    ]}
                >
                    <Input
                        {...(register && {
                            ...register(name as keyof SignUpTypes, {
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
                    name={name as keyof SignUpTypes}
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

SignupField.displayName = "SignupField"

export default SignupField
