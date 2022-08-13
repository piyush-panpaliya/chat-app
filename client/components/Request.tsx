import React, { useContext } from 'react'
import { useSWRConfig } from 'swr'
import { DEL,POST } from '../apihelper'
import { AppContext, Context } from '../AppContext'

const Request = () => {
  const { mutate } = useSWRConfig()
  const {state}=useContext(AppContext)as Context

  const handle=async(username:string,t:boolean)=>{
    let res
    if(t){
      res=await POST({},`user/${username}`)
    }else{
      res=await DEL(`user/${username}`)
    }
    if (res.status===200) {
      mutate('me')
    }
  }

  return (
    <div className='bg-gray-400 w-[30vw] h-[20vh] rounded-xl flex flex-col items-center gap-4 px-2 pt-4 overflow-y-auto'>
      {state.user?.friendRequests.map(({username,_id}:any)=><div key={_id} className='flex items-center  gap-3 justify-between w-full'>
          <div className='flex gap-3 items-center'>
            <div className='relative'>
              <div className='w-4 h-4 bg-green-400 rounded-full z-10 absolute bottom-0 left-0'></div>
              <img src={`https://avatars.dicebear.com/api/micah/${_id}.svg?backgroundColor=blue`} className='bg-black rounded-full w-12 h-12 relative' />
            </div>
            <p className='text-xl'>{username}</p>
          </div>
          <div className='flex gap-1 items-center'>
          <button onClick={()=>handle(username,true)} className="btn btn-primary">Y</button>
          <button onClick={()=>handle(username,false)} className="btn btn-primary">N</button>
            </div>
        </div>)}
    </div>
  )
}

export default Request