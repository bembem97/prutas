import mongoose from "mongoose"
const { Schema, models, model } = mongoose

const ProductSchema = new Schema({
  category: String,
  imageUrl: String,
  name: String,
  nutritions: {
    calcium: Number,
    calories: Number,
    carbohydrate: {
      dietaryFiber: Number,
      sugar: Number,
      total: Number,
    },
    fat: {
      saturatedFat: Number,
      total: Number,
    },
    fiber: Number,
    iron: Number,
    magnesium: Number,
    vitaminB6: Number,
    vitaminC: Number,
    protein: Number,
  },
  price: Number,
  variety: String,
})

const Product = models.Product || model("Product", ProductSchema)
export default Product
