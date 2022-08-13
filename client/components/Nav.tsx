import React, { FunctionComponent, useContext } from 'react'
import { AppContext, Context } from '../AppContext'

const Nav: FunctionComponent= () => {
  const {state}= useContext(AppContext) as Context
  return (
    <div className='w-full bg-blue-600 flex justify-between items-center gap-[2rem] rounded-lg px-6 py-3 '>
      <p className='text-3xl'>IndiCord</p>
      <div className='flex gap-[2rem] items-center'>

      <p className='text-2xl'>{state.user?.name}</p>
      <div className='relative'>
        <div className='w-4 h-4 bg-green-400 rounded-full z-10 absolute bottom-0 left-0'></div>
        <img src={`https://avatars.dicebear.com/api/micah/${state.user?._id}.svg?backgroundColor=blue`} className='bg-black rounded-full w-12 h-12 relative' />
      </div>
      </div>
    </div>
  )
}

export default Nav