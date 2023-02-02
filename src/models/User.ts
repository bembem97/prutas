import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: String,
    default: "/images/avatar/1.png",
  },

  password: {
    type: String,
    required: true,
    minlength: 7,
  },
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
