import mongoose, { Schema, Types } from "mongoose"

type CardType = {
  cardNumber: number
  cardHolder: string
  securityCode: number
  expirationDate: Date
}

type CustomerType = {
  name: string
  contactNumber: number
  address: {
    street: string
    city: string
    zipCode: string
  }
  card: CardType
}

export interface ProductType {
  _id?: Types.ObjectId
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
  user: Types.ObjectId
  customer: CustomerType
  items: ItemsType
  createdAt: Date
}

const OrderDetailsSchema = new Schema<OrderDetailsTypes>(
  {
    status: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
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
  mongoose.models.OrderDetails ||
  mongoose.model("OrderDetails", OrderDetailsSchema)
export default OrderDetails
