import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "src/database/mongoose"
import mongoConnect from "src/database/mongodb"
import { compare } from "bcrypt"
import User from "src/models/User"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(mongoConnect, { databaseName: "prutas" }),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          await connect()
          const user = await User.findOne({ email: credentials?.email })
          const message = "Email or Password is incorrect."

          if (!user) {
            throw new Error(message)
          }

          const isPasswordCorrect = await compare(
            credentials!.password,
            user.password
          )

          if (!isPasswordCorrect) {
            throw new Error(message)
          }

          return user
        } catch (error) {
          throw new Error(error as string)
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        // console.log(`if: ${baseUrl}${url}`)
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        // console.log(`else if: ${new URL(url).origin} :: ${baseUrl} :: ${url}`)
        return url
      }

      // console.log(`no if: ${url}`)
      return baseUrl
    },
    async session({ session, user, token }) {
      session.user.id = token.sub

      return session
    },
  },
}

export default NextAuth(authOptions)
