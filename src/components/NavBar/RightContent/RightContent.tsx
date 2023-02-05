import React from 'react'
import AuthButtons from './AuthButtons'

type RightContentProps = {}

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <div className='flex flex-row items-center space-x-2'>
        <AuthButtons />
      </div>
    </>
  )
}

export default RightContent