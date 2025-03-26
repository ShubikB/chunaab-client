import React, { Children } from "react"
import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

const DefaultLayout = ({ Children }) => {
  return (
    <>
      <Header />

      <main className='main'>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default DefaultLayout
