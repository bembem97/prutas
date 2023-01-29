import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: ReactNode
  open: boolean | null
}

export function Portal({ children, open }: PortalProps) {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState<boolean | null>(null)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#box")

    setMounted(open)
  }, [open, mounted])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}
