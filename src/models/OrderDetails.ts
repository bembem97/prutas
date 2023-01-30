import mongoose from "mongoose"
const { Schema, models, model, Types } = mongoose

type CustomerType = {
  name: string
  contactNumber: number
  address: {
    street: string
    city: string
    zipCode: string
  }
}

type CardType = {
  cardNumber: number
  cardHolder: string
  securityCode: number
  expirationDate: Date
}

export interface ProductType {
  _id?: string
  name: string
  price: number
}

export type ItemsType = {
  quantity: number
  total: number
  products: Array<{
    _id: boolean
    product: string | ProductType
    amount: {
      subtotal: number
      quantity: number
    }
  }>
}

export interface OrderDetailsTypes {
  _id: string
  status: number
  customer: CustomerType
  card: CardType
  items: ItemsType
  createdAt: Date
}

const OrderDetailsSchema = new Schema<OrderDetailsTypes>(
  {
    status: {
      type: Number,
      default: 0,
    },
    customer: {
      name: String,
      contactNumber: Number,
      address: {
        street: String,
        city: String,
        zipCode: String,
      },
      card: {
        cardNumber: Number,
        cardHolder: String,
        securityCode: Number,
        expirationDate: Date,
      },
    },
    items: {
      quantity: Number,
      total: Number,
      products: [
        {
          _id: false,
          product: { type: Types.ObjectId, ref: "Product" },
          amount: {
            subtotal: Number,
            quantity: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
)

const OrderDetails =
  models.OrderDetails || model("OrderDetails", OrderDetailsSchema)
export default OrderDetails
