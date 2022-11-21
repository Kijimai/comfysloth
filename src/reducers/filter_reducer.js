import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions"

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      }
    case SET_GRIDVIEW:
      return { ...state, gridView: true }
    case SET_LISTVIEW:
      return { ...state, gridView: false }
    case UPDATE_SORT:
      return { ...state, sort: action.payload }

    case SORT_PRODUCTS:
      const { sort, filteredProducts: filtered_products } = state
      let tempProducts = [...filtered_products]
      switch (sort) {
        case "price-lowest":
          tempProducts = tempProducts.sort((curr, next) => {
            return curr.price - next.price
          })
          return { ...state, filteredProducts: tempProducts }
        case "price-highest":
          tempProducts = tempProducts.sort((curr, next) => {
            return next.price - curr.price
          })
          return { ...state, filteredProducts: tempProducts }
        case "name-a":
          tempProducts = tempProducts.sort((a, b) => {
            return a.name.localeCompare(b.name)
          })
          return { ...state, filteredProducts: tempProducts }
        case "name-z":
          tempProducts = tempProducts.sort((a, b) => {
            return b.name.localeCompare(a.name)
          })
          return { ...state, filteredProducts: tempProducts }
        default:
          return { ...state }
      }

    default:
      return { ...state }
  }
  // throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
