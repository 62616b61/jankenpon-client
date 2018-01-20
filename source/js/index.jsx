import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/app'

function renderApp (RootComponent) {
  ReactDOM.render(
    <RootComponent />, document.getElementById('root')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./pages/app', () => {
    renderApp(require('./pages/app').default)
  })
}
