import bcrypt from "bcrypt"
import User from "src/models/User"
import connect from "src/database/mongoose"
import { EMAIL, NAME, PASSWORD } from "src/constant"
import { NextApiRequest, NextApiResponse } from "next"

interface SignUpTypes {
  name: string
  email: string
  password: string
}

//! const validateUsername = (name) => /^[a-z\s]*$/i.test(name)
const validateUsername = (name: string) => NAME.VALID.PATTERN.test(name)

//! const validateEmail = (email) => /^[a-z0-9._]+@[a-z]+\.[a-z]{2,}$/i.test(email)
const validateEmail = (email: string) => EMAIL.VALID.PATTERN.test(email)

const validateForm = async ({ name, email, password }: SignUpTypes) => {
  let errors = {}

  if (name.length < 4 || !NAME.VALID.PATTERN.test(name)) {
    errors = { ...errors, name: NAME.VALID.MESSAGE }
  }

  if (!validateUsername(name)) {
    errors = { ...errors, name: NAME.VALID.MESSAGE }
  }

  if (!validateEmail(email)) {
    errors = { ...errors, email: EMAIL.VALID.MESSAGE }
  }

  await connect()
  const userEmail = await User.findOne({ email })
  if (userEmail) {
    errors = { ...errors, email: "Email Address already exist." }
  }

  if (password.length < 7 || !PASSWORD.VALID.PATTERN.test(password)) {
    errors = { ...errors, password: PASSWORD.VALID.MESSAGE }
  }

  if (Object.keys(errors).length > 0) {
    return errors
  }

  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res
        .status(200)
        .json({ message: "This API call only accepts POST method." })
    }

    const { name, email, password } = req.body

    const withError = await validateForm({ name, email, password })

    if (withError) {
      return res.status(400).json(withError)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    return newUser
      .save()
      .then(() =>
        res.status(200).json({ message: `Account is successfully created.` })
      )
      .catch((error: string) =>
        res.status(400).json({ error: `ROUTE: /api/signup. ${error}` })
      )
  } catch (error) {
    throw new Error(`API ROUTE: /api/signup. ${error}`)
  }
}
