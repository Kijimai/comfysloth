import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions"

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((item) => {
      return item.id === id + color
    })
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      // Create a newItem object that differentiates from other items with the same id but different color
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((product) => {
      if (product.id === id) {
        if (value === "increase") {
          let newAmount = product.amount + 1
          if (newAmount > product.max) {
            newAmount = product.max
          }
          return { ...product, amount: newAmount }
        }
        if (value === "decrease") {
          let newAmount = product.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...product, amount: newAmount }
        }
      }
      return product
    })

    return { ...state, cart: tempCart }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((product) => {
      return product.id !== action.payload
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalAmount, totalItems } = state.cart.reduce(
      (total, currentItem) => {
        const { price, amount } = currentItem
        total.totalAmount += price * amount
        total.totalItems += amount

        return total
      },
      { totalItems: 0, totalAmount: 0 }
    )
    return { ...state, totalAmount, totalItems }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
