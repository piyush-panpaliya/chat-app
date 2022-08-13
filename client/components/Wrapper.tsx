import React from 'react'
import Nav from './Nav'

interface WrapperProps {
  children: React.ReactNode;
  nav:boolean
}

const Wrapper= ({children,nav}:WrapperProps) => {
  return (
    <div className='w-screen h-screen bg-gray-700 flex flex-col items-center gap-y-[5vh] p-4 '>
     
        {nav&&<Nav/>}
        {children}
    </div>
  )
}

export default Wrapper