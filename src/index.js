import { ConnectedRouter } from "connected-react-router"
import { Provider } from "react-redux"
import App from "./app/layout/App"
import React from "react"
import ReactDOM from "react-dom"

import * as serviceWorker from "./serviceWorker"
import { configureStore, history } from "./app/store/configureStore"
import ScrollToTop from "./app/layout/ScrollToTop"
import { MyProvider } from "./myProvider"

import "semantic-ui-css/semantic.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "react-calendar/dist/Calendar.css"
import "./app/layout/styles.css"
import "@blueprintjs/core/lib/css/blueprint.css"

const store = configureStore()

const rootEl = document.getElementById("root")

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <MyProvider>
          <App />
        </MyProvider>
      </ConnectedRouter>
    </Provider>,
    rootEl
  )
}

if (module.hot) {
  module.hot.accept("./app/layout/App", function () {
    setTimeout(render)
  })
}

render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
