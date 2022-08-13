import type { NextPage } from 'next'
import Head from 'next/head'
import Search from '../components/Search'
import Chat from '../components/Chat'
import Wrapper from '../components/Wrapper'
import { useEffect ,useContext} from 'react'
import { GET } from '../apihelper'
import { AppContext,Context } from '../AppContext'
import useSWR from 'swr'
import Request from '../components/Request'

const Home: NextPage = () => {
  const {setuser}=useContext(AppContext) as Context
  const f=async()=>{
    const res=await GET(`user/me`)
    if (res.data.user) {
      setuser(res.data.user)
    }
  }
  useSWR('me',f)

  return (
    <Wrapper nav>
      <Head>
        <title>IndiCord</title>
        <meta name="description" content="chat app hai kharab wala" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='w-full flex justify-between px-4 gap-8'>
        <div className='flex flex-col gap-4 '>
          <div className='w-full h-[50vh]'>
          <Search/>
          </div>
          <Request/>
        </div>
        <div className='flex-grow'>
        <Chat/>
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
