import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from 'next/image';
import { useState } from 'react';
import SideBar from '../components/SideBar';
import Modal from '../components/Notification';
import Profile from '@/components/Profile';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import logo from '../../public/logo.png'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [sideBarOpen, setSidebar] = useState(false);

  const openSideBar = () => {
    setSidebar(!sideBarOpen);
  };

  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => {
    setShowModal(!showModal);
  };

  const [showProfile, setShowProfile] = useState(false);
  
  const openProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className="flex min-h-screen flex-col overflow-hidden">
          <div className='h-20 lg:flex flex-row bg-blue-950'>
            <button className='mx-5' onClick={openSideBar}>
              <FaBars color='white' />
            </button>
            <div className='flex pl-5 pb-3 pt-3'>
              <Image src={logo} alt='logo' height={0} width={180}></Image>
            </div>
            <div className='flex pb-3 pt-3 place-items-center gap-4 ml-auto mr-5'>
            <button className='mx-5' onClick={openModal}>
              <FaBell size={30} color='white'></FaBell>
            </button>
            <button className='flex items-center' onClick={openProfile}>
              <FaUserCircle size={50} color='white'></FaUserCircle>
              <h1 className='ml-2 text-xl text-white text-left'>Olá,<br/>Xiristian</h1>
            </button>
            </div>
          </div>
          <div className='flex flex-1 bg-white'>
            {sideBarOpen && <SideBar />}
            <Component {...pageProps} />
            {showModal && <Modal />}
            {showProfile && <Profile />}
          </div>
        </main>
      </Hydrate>
    </QueryClientProvider>)
}
