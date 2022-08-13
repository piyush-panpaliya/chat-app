import React,{useContext, useState} from 'react'
import { GET, POST } from '../apihelper'
import {AppContext,Context} from '../AppContext'
import  { useSWRConfig } from 'swr'


interface Idata{
  name:string,
  username:string,
  _id:string
}

const Search = () => {
  const { mutate } = useSWRConfig()
  const [search, setSearch] = useState('')
  const [data,setData] = useState([])
  const {state}=useContext(AppContext) as Context

  const submit=async(e: React.FormEvent<EventTarget>)=>{
    e.preventDefault()
    const res=await GET(`user/search?q=${search}`)
    setData(res.data.users.filter((user:Idata)=>user._id!==state.user?._id))
  }

  const handle=async(username:string)=>{
    const res=await POST({},`user/${username}`)
    if (res.status===200) {
      setSearch('')
      mutate('me')
    }
  }

  return (
    <div className='bg-gray-400 w-[30vw] min-h-[20vh] max-h-[80vh] rounded-xl flex flex-col items-center gap-4  pt-8 '>
      <form onSubmit={submit} className='flex flex-col items-center gap-4 w-full px-4'>
        <p className='text-xl  '> Search for a user</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} className='input input-primary text-lg w-[80%] mb-4'/>
      </form>
      <div className='flex flex-col gap-4 w-full mb-4 px-[8%] overflow-y-auto'>
        {data.map((a:any)=><div key={a._id} className='flex items-center  gap-3 justify-between w-full'>
          <div className='flex gap-3 items-center'>
            <div className='relative'>
              <div className='w-4 h-4 bg-green-400 rounded-full z-10 absolute bottom-0 left-0'></div>
              <img src={`https://avatars.dicebear.com/api/micah/${a._id}.svg?backgroundColor=blue`} className='bg-black rounded-full w-12 h-12 relative' />
            </div>
            <p className='text-xl'>{a.username}</p>
          </div>
          {state.user?.friends.some((e:any) => e._id === a._id)?
          <button  className="btn btn-primary">Chat</button>
          :<button onClick={()=>handle(a.username)} className="btn btn-primary">Add</button>}
        </div>)}
      </div>
    </div>
  )
}

export default Search