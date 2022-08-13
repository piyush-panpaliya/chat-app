import React from 'react'
import Msg from './Msg'

const Chat = () => {
  const data=[111,222,333,444,555,666,777,888,999]
  return (
    <div className='bg-gray-400 w-full h-[80vh] rounded-xl overflow-hidden flex flex-col items-center  justify-between  pb-3 '>
      <div className='w-full h-[12%] flex bg-primary px-6 py-4 gap-[2rem] items-center justify-between'>
        <p className='text-2xl'>Username</p>
        <div className='relative'>
          <div className='w-4 h-4 bg-green-400 rounded-full z-10 absolute bottom-0 left-0'></div>
          <img className='bg-black rounded-full w-12 h-12 relative' />
        </div>
      </div>
      <div className='w-full h-[85%] flex flex-col items-center gap-4 justify-between px-4 py-6 pt-0'>
        <div className='w-full flex flex-col gap-4 overflow-y-auto'>
          {data.map(a=><div key={a} className='w-full flex  px-2'>
            <div className='bg-primary p-3 wounded-xl w-[20vw] min-w-16'>
              {"message hai ye"}
            </div>
          </div>)}
        </div>
        <Msg/>
      </div>
    </div>
  )
}

export default Chat