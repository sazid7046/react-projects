import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

 const initialState = {
   isLoading: false,
   cart: cartItems,
   amount: 0,
   total: 0
 }
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }
  const removeItems = (id) => {
    dispatch({type: 'REMOVE_ITEM', payload: id})
  }

  const increase = (id) => {
    dispatch({type: 'INCREASE', payload: id})
  }
  const decrease = (id) => {
    dispatch({type: 'DECREASE', payload: id})
  }

  const fetchData = async () => {
    dispatch({type: 'LOADING'})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type : 'DISPLAY_ITEMS', payload: cart})
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({type: 'GET_TOTALS'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItems,
        increase,
        decrease, 
        
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
