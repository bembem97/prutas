import { configureStore, combineReducers } from "@reduxjs/toolkit"
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query"
import { productApi } from "src/redux/slices/product"
import { orderDetailsApi } from "src/redux/slices/orderDetails"
import cartReducer from "src/redux/slices/cart"
import {
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const reducers = combineReducers({ cart: cartReducer })
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    })
      .concat(productApi.middleware)
      .concat(orderDetailsApi.middleware),

  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productApi.reducerPath]: productApi.reducer,
    [orderDetailsApi.reducerPath]: orderDetailsApi.reducer,
    slices: persistedReducer,
  },
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
