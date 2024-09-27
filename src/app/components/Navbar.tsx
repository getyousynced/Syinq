import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
      <div className='flex justify-between bg-white px-10 p-4 text-center items-center'>
          <Image src="/sync-logo.png" width={80} height={80} alt="X" />
          <div className="flex justify-evenly gap-14 font-bold text-xl">
              <div>How it works?</div>
              <div>About us</div>
              <div>Blog</div>
              <div>Contact us</div>
          </div>
    </div>
  )
}

export default Navbar
