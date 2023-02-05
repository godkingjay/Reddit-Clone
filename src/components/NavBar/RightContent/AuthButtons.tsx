import React from 'react'

type AuthButtonsProps = {}

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  return (
    <>
      <button className='auth-button border-brand-100 text-brand-100 hover:bg-brand-100 hover:text-white active:bg-brand-100 active:text-white focus:bg-brand-100 focus:text-white' type='button' title='Log In'>Log In</button>
      <button className='auth-button  border-blue-500 bg-blue-500 text-white hover:text-blue-500 hover:bg-transparent active:text-blue-500 active:bg-transparent focus:text-blue-500 focus:bg-transparent' type='button' title='Sign Up'>Sign Up</button>
    </>
  )
}

export default AuthButtons;