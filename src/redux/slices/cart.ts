import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataProduct } from "src/utils/parseApi"

type ItemsType = {
  product: DataProduct
  amount: {
    quantity: number
    subtotal: number
  }
}

export interface CartItemsState {
  items: ItemsType[]
  total: number
  quantity: number
}

const initialState: CartItemsState = {
  items: [],
  total: 0,
  quantity: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<DataProduct>) => {
      const item = state.items?.find(
        ({ product: { _id } }) => _id === action.payload._id
      )

      // todo: INCREASE QUANTITY IF ITEM IS ALREADY IN THE CART.
      if (item) {
        item.amount.quantity++
        item.amount.subtotal += action.payload.price
        state.total += action.payload.price
        state.quantity++
        return
      }

      // todo: ADD ITEM FOR THE FIRST TIME IF NOT YET ADDED IN THE CART
      state.items.unshift({
        product: { ...action.payload },
        amount: { quantity: 1, subtotal: action.payload.price },
      })
      state.total += action.payload.price
      state.quantity++
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        ({ product }) => product._id !== action.payload
      )

      let quantity = 0
      let total = 0

      state.items.forEach(({ product, amount }) => {
        quantity += amount.quantity
        total += amount.quantity * product.price
        amount.subtotal = amount.quantity * product.price
      })

      state.quantity = quantity
      state.total = total
    },

    increaseAmount: (state, action: PayloadAction<DataProduct>) => {
      const item = state.items.find(
        ({ product }) => product._id === action.payload._id
      )
      item!.amount.quantity++
      item!.amount.subtotal += action.payload.price
      state.total += action.payload.price
      state.quantity++
    },

    decreaseAmount: (state, action: PayloadAction<DataProduct>) => {
      const item = state.items.find(
        ({ product }) => product._id === action.payload._id
      )

      if (item!.amount.quantity === 1) {
        state.items = state.items.filter(
          ({ product }) => product._id !== action.payload._id
        )
      }
      item!.amount.quantity--
      item!.amount.subtotal -= action.payload.price
      state.total -= action.payload.price
      state.quantity--
    },

    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.quantity = 0
    },
  },
})

export const {
  addToCart,
  clearCart,
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} = cartSlice.actions

export default cartSlice.reducer
