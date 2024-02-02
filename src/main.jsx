import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { PostScreen } from './views/PostScreen.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
      <PostScreen />
    </Provider>

  </React.StrictMode>,
)
