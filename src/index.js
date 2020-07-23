import React from 'react'
import { render } from 'react-dom'
import App from './App'

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
