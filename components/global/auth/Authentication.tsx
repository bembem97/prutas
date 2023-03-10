import SignInLayout from "./SignInLayout"
import Close from "components/shared/icons/Close"
import Button from "components/shared/inputs/Button"
import React, { Dispatch, SetStateAction } from "react"
import tw from "twin.macro"

interface Props {
    setIsOpen: Dispatch<SetStateAction<boolean | null>>
    // isOpen: boolean | null
    // authRef?: React.MutableRefObject<null>
}

const Authentication: React.FC<Props> = ({ setIsOpen }) => {
    return (
        <>
            <Button
                buttonType="icon"
                tw="absolute top-6 right-3"
                color="error"
                onClick={() => setIsOpen(false)}
            >
                <Close width={3} height={3} fill="white" />
            </Button>

            <SignInLayout />
        </>
    )
}

export default Authentication
