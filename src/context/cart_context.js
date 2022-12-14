import React, { useEffect, useContext, useReducer } from "react"
import reducer from "../reducers/cart_reducer"
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions"

const getLocalStorage = () => {
  let cart = localStorage.getItem("comfy-sloth-cart")
  if (cart) {
    return JSON.parse(localStorage.getItem("comfy-sloth-cart"))
  } else {
    return []
  }
}

// Initialize either with an empty array or
const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem("comfy-sloth-cart", JSON.stringify(state.cart))
    countTotals()
  }, [state.cart])

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
  }

  const removeCartItem = (id) => {
    console.log("current id", id)
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  const countTotals = () => {
    dispatch({ type: COUNT_CART_TOTALS })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeCartItem,
        toggleAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
