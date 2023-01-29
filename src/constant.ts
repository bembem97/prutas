export const NAME = {
  REQUIRED: "Name is required.",
  VALID: {
    MESSAGE: "Name must contain atleast 4 or more alphabet characters.",
    PATTERN: /^[a-z\s]{4,}$/i,
  },
}

export const EMAIL = {
  REQUIRED: "Email address is required.",
  VALID: {
    MESSAGE: "Email format is invalid.",
    PATTERN: /^[a-z0-9._]+@[a-z]+\.[a-z]{2,}$/i,
  },
}

export const CONTACT = {
  REQUIRED: "Contact number is required.",
  VALID: {
    MESSAGE: "Contact number is invalid.",
    PATTERN: /^[0-9]{11,15}$/,
  },
}

export const ADDRESS = {
  REQUIRED: "Shipping address is required.",
  VALID: {
    MESSAGE:
      "Shipping address must contain alphanumeric and only accept , and . special characters.",
    PATTERN: /^[a-z0-9,.\s]*$/i,
  },
}

export const CITY = {
  REQUIRED: "City is required.",
  VALID: {
    MESSAGE: "City must contain alphabets.",
    PATTERN: /^[a-z\s]{4,}$/i,
  },
}

export const ZIPCODE = {
  REQUIRED: "Zipcode is required.",
  VALID: {
    MESSAGE: "Zipcode should only contain 4 digits.",
    PATTERN: /^[0-9]{4}$/,
  },
}

export const CARDNUMBER = {
  REQUIRED: "Card number is required.",
  VALID: {
    MESSAGE: "Card number must have 15-19 digits.",
    PATTERN: /^[0-9]{15,19}$/,
  },
}

export const CARDHOLDER = {
  REQUIRED: "Card holder is required.",
  VALID: {
    MESSAGE: "Card holder must contain atleast 4 or more alphabet characters.",
    PATTERN: /^[a-z\s]{4,}$/i,
  },
}

export const SECURITYCODE = {
  REQUIRED: "Security code is required.",
  VALID: {
    MESSAGE: "Security code is invalid.",
    PATTERN: /^[0-9]{3,4}$/,
  },
}

export const MONTH = {
  REQUIRED: "Month is required.",
  VALID: {
    MESSAGE: "Use numeric (1-12).",
    PATTERN: /^[0-9]{1,2}$/,
  },
}

export const YEAR = {
  REQUIRED: "Year is required.",
  VALID: {
    MESSAGE: "Year is invalid.",
    PATTERN: /^[0-9]*$/,
  },
}

export const PASSWORD = {
  REQUIRED: "Password is required",
  VALID: {
    MESSAGE:
      "Password must contain atleast 8 characters, 1 lowercase, 1 uppercase, and 1 number.",
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  },
}
