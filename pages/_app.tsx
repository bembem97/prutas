import { cache } from "@emotion/css"
import { CacheProvider } from "@emotion/react"
import type { AppProps } from "next/app"
import GlobalStyles from "styles/GlobalStyles"
import NextNProgress from "nextjs-progressbar"

// todo: REDUX
import { Provider } from "react-redux"
import { store } from "src/redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

let persistor = persistStore(store)

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <NextNProgress color="#fff" />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </CacheProvider>
)

export default App
