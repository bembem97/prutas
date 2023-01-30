// const MONTHS = [
//     { short: "jan", full: "january", numeric: 1 },
//     { short: "feb", full: "february", numeric: 2 },
//     { short: "mar", full: "march", numeric: 3 },
//     { short: "apr", full: "april", numeric: 4 },
//     { short: "may", full: "may", numeric: 5 },
//     { short: "jun", full: "june", numeric: 6 },
//     { short: "jul", full: "july", numeric: 7 },
//     { short: "aug", full: "august", numeric: 8 },
//     { short: "sep", full: "september", numeric: 9 },
//     { short: "oct", full: "october", numeric: 10 },
//     { short: "nov", full: "november", numeric: 11 },
//     { short: "dec", full: "december", numeric: 12 },
//   ]

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]

const useGetDate = (date: Date) => {
  const DATE = new Date(date)
  const year = DATE.getFullYear()
  const day = DATE.getDate()

  const MONTH = DATE.getMonth()
  const month = MONTHS[MONTH]

  return { year, month, day }
}

export default useGetDate
