import React, { createContext, useReducer } from "react"

import { AppReducer } from "../reducer/AppReducer"

export const AppContext = createContext({
  appState: {},
  appDispatch: () => {},
})

export const AppProvider = (props) => {
  const appInitialState = {
    root: { id: 1 }, //  to get countries in Admin component
    regions: {}, //  to store all regions comes from server
    countries: [], //  to store all countries witch parent is root
    states: [], //  to store states of selected country
    cities: [], //  to store cities of slected state
    country: {}, //  to store the selected country
    state: {}, //  to store the selected state
    city: {}, //  to store the selected city
  }

  const [appState, appDispatch] = useReducer(AppReducer, appInitialState)

  return (
    <AppContext.Provider
      value={{
        appState,
        appDispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
