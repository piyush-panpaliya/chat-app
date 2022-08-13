import {useContext, useEffect, useState} from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {POST} from '../apihelper'
import Wrapper from '../components/Wrapper'
import { AppContext,Context } from '../AppContext'

const Login:NextPage = () => {
  const [form,setForm]=useState({username:'',password:''})
  const router = useRouter()
  const {setjwt,setuser,state} = useContext(AppContext) as Context
  const submit: React.FormEventHandler<HTMLFormElement> = async(e: React.FormEvent<HTMLFormElement>) =>{
    console.table(form)
    e.preventDefault()
    const res:any= await POST(form,"auth/login")
    console.log(res)
    if (res.data.accessToken){
      console.log("ok")
      setjwt(res.data.accessToken)
      setuser(res.data.user)
      router.push("/")
    }
  }
  useEffect(()=>{
    if(state.jwt!==false){
      router.push("/")
    }
  },[])

  return (
    <Wrapper nav={false}>
      <div className='h-screen w-screen bg-gray-600 flex justify-center items-center'>
        <div className='w-[50vw] xl:w-[25vw] bg-gray-800 rounded-xl flex flex-col gap-4 px-4 py-6'>
          <p className='text-5xl text-center w-full mb-8'>Login</p>
          <form onSubmit={submit} className='px-2 flex flex-col items-left gap-[2rem]'>
            <div className='flex flex-col justify-center  gap-2'>
              <p className='text-xl'>Username</p>
              <input value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))}  className='input text-lg'/>
            </div>
            <div className='flex flex-col justify-center  gap-2'>
              <p className='text-xl'>Password</p>
              <input value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} className='input text-lg'/>
            </div>
            <button type='submit' className="btn btn-md btn-primary text-xl">Login</button>
          </form>
        </div>
      </div>
    </Wrapper>
  )
}

export default Login