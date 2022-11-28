import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Navbar, Sidebar, Footer } from "./components"
import styled from "styled-components"
// React-Toastify dependencies
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  Home,
  About,
  Cart,
  Products,
  SingleProduct,
  Checkout,
  Error,
  PrivateRoute,
} from "./pages/index"

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable={false}
      />
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:id" children={<SingleProduct />} />
        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

const Button = styled.button``

const Container = styled.div`
  background-color: red;
  color: white;
`

export default App
