import mongoose from "mongoose"

const DB_URI = process.env.MONGODB_URI

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  )
}

mongoose.set("strictQuery", false)

const connectMongo = async () => {
  const connect = await mongoose
    .connect(DB_URI)
    .catch((err) => console.log(`Database Connection Error: ${err}`))
  // .then((mongoose) => mongoose)

  return connect
}
export default connectMongo
