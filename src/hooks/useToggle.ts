import { useState, useEffect, MutableRefObject } from "react"

const useToggle = (ref: MutableRefObject<HTMLElement | null>) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const endAnimation = () => setIsOpen(null)
  const target = ref?.current

  useEffect(() => {
    if (isOpen === false) {
      target?.addEventListener("animationend", endAnimation)
    }

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key == "Escape" && isOpen === true) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", upHandler)

    return () => {
      window.removeEventListener("keydown", upHandler)
      target?.removeEventListener("animationend", endAnimation)
    }
  }, [target, isOpen, setIsOpen])

  return { isOpen, setIsOpen }
}

export default useToggle
