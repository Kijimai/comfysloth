import React, { useEffect, useContext, useReducer } from "react"
import reducer from "../reducers/filter_reducer"
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions"
import { useProductsContext } from "./products_context"

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])
  // products, state.filteredProducts
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (e) => {
    const { name, value } = e.target
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  const updateFilters = (e) => {
    let { name, value } = e.target
    // If the target name is "category" it is a button and we grab the button's text content instead
    if (name === "category") {
      value = e.target.textContent
    }

    if (name === "color") {
      value = e.target.dataset.color
    }

    dispatch({ type: UPDATE_FILTERS, payload: { value, name } })
  }

  const clearFilters = () => {
    dispatch()
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setListView,
        setGridView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
