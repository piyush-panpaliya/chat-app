import React from 'react'

const Msg = () => {
  return (
    <div className='w-full h-[15%]  bg-gray-600 rounded-lg flex justify-between items-center gap-4 py-3 px-3'>
        <p className="bg-gray-900 rounded-lg align-middle text-lg overflow-y-auto break-all min-h-12 max-h-24 flex-grow px-3 " placeholder="Chat here">dawwwwwwwwwwwwwww</p>
        <button className="btn btn-square ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    </div>
  )
}

export default Msg