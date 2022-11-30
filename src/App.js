// Package dependencies
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar, Sidebar, Footer } from "./components"
import styled from "styled-components"

// React-Toastify dependencies
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Imported Pages Components
import {
  Home,
  About,
  Cart,
  Products,
  SingleProduct,
  Checkout,
  Error,
  PrivateRoute,
  AuthWrapper,
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
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthWrapper>
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
