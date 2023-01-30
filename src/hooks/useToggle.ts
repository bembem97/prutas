import React, { useState, useEffect, MutableRefObject } from "react"

const useToggle = (ref: MutableRefObject<HTMLElement | null> | null) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const endAnimation = () => setIsOpen(null)
  const target = ref?.current

  useEffect(() => {
    if (isOpen === false) {
      target?.addEventListener("animationend", endAnimation)
    }

    const onKeydownHandler = ({ key }: KeyboardEvent) => {
      if (key == "Escape" && isOpen === true) {
        setIsOpen(false)
      }
    }

    const onWindowClickHandler = (e: Event) => {
      if (isOpen && target && !target.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", onKeydownHandler)
    document.addEventListener("mousedown", onWindowClickHandler)

    return () => {
      window.removeEventListener("keydown", onKeydownHandler)
      target?.removeEventListener("animationend", endAnimation)
      document.removeEventListener("mousedown", onWindowClickHandler)
    }
  }, [target, isOpen, setIsOpen])

  return { isOpen, setIsOpen }
}

export default useToggle
