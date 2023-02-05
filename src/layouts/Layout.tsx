import NavBar from '@/components/NavBar'

import React, {
  ReactElement
} from 'react'

const Layout = ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <>
      <NavBar />
      <main>
        { children }
      </main>
    </>
  )
}

export default Layout