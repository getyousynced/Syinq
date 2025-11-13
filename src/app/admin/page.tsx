import Image from 'next/image'
import React from 'react'

const Page = () => {

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col gap-10 p-5 justify-center items-center bg-gradient-to-br from-blue-200 via-white to-blue-400 '>
      <Image
        src="/logo.png"
        alt='syinq logo'
        width={150}
        height={150}
      />
      <p className='text-6xl text-red-300 font-bold tracking-tighter'>&lsquo;Oops&lsquo;</p>
      <p className=' text-8xl text-black/30 font-bold tracking-tighter text-center'> Admin page isn&apos;t available</p>
    </div>
  )
}

export default Page