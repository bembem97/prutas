import { useEffect, useState } from "react"

type DateTimeTypes = number

const getReturnValues = (countdown: DateTimeTypes) => {
  const days = Math.floor(countdown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

const useCountdown = (targetDate: DateTimeTypes) => {
  const countdownDate = new Date(targetDate).getTime()

  const [countdown, setCountdown] = useState<number | null>(
    // todo: WITH CONDITION
    countdownDate - new Date().getTime() > 0
      ? countdownDate - new Date().getTime()
      : null

    // ! ORIGINAL: countdownDate - new Date().getTime(). WITHOUT CONDITION
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdownDate - new Date().getTime())

      if (countdownDate - new Date().getTime() <= 0) {
        setCountdown(null)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countdownDate])

  return getReturnValues(countdown!)
}

export default useCountdown
