import NavBar from '@/components/NavBar'

import React, {
  ReactElement
} from 'react'

const Layout = ({
  children
}:{
  children: ReactElement
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