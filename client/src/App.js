import React from 'react'

import { AppProvider } from './contextapi/context/AppContext'
import { Main } from './components/main/main'
import "./app.css"

export const App = () =>
  <React.StrictMode>
    <div className='App'>
      <AppProvider>
        <Main />
      </AppProvider>
    </div>
  </React.StrictMode>

