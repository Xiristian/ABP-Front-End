import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from 'next/image';
import { useState } from 'react';
import SideBar from '../components/SideBar'
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa'

export default function App({ Component, pageProps }: AppProps) {
  const [sideBarOpen, setSidebar] = useState(false);

  const openSideBar = () => {
    setSidebar(!sideBarOpen);
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <div className='h-20 lg:flex flex-row bg-green-400'>
        <button className='mx-5' onClick={openSideBar}>
          <FaBars />
        </button>
        <div className='flex pl-5 pb-3 pt-3'>
          <Image src="/logo.png" alt='logo' height={0} width={100}></Image>
        </div>
        <div className='flex pb-3 pt-3 place-items-center gap-4 ml-auto mr-5'>
          <FaBell size={30}></FaBell>
          <FaUserCircle size={50}></FaUserCircle>
          <h1 className='text-xl'>Olá, <br/>Xiristian</h1>
        </div>
      </div>
      <div className='flex flex-1'>
        {sideBarOpen && <SideBar />}
        <Component {...pageProps} />
      </div>
      <div className='w-full h-20 bottom-0 bg-green-400'>
      </div>
    </main>)
}
