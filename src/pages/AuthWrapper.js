import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import ReactLoading from "react-loading"
import styled from "styled-components"

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0()

  if (isLoading) {
    return (
      <Wrapper>
        <ReactLoading
          type={"bubbles"}
          color={"green"}
          height={"20%"}
          width={"20%"}
        />
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    )
  }

  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
