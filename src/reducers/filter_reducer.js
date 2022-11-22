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
      // Spread operator after using map to create new array from payload, then find max price of array
      let maxPrice = Math.max(
        ...action.payload.map((product) => {
          return product.price
        })
      )
      console.log(maxPrice)
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
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
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          price: state.filters.maxPrice,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          shipping: false,
        },
      }
    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      }
    case FILTER_PRODUCTS:
      console.log("filtering producs")

      return { ...state }
    default:
      return { ...state }
  }
  // throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
