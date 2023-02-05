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
    <main className='flex flex-col max-h-screen h-screen'>
      <NavBar />
      <div className='bg-gray-100 flex-1'>
        { children }
      </div>
    </main>
  )
}

export default Layout