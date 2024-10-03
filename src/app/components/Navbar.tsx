import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { NavLinks } from '../data/navLinks'

const Navbar = () => {

  return (
      <nav className='hidden sm:flex sm:sticky sm:top-0 justify-between bg-white px-10 p-4 items-center shadow-lg backdrop-blur-md z-30'>
          <Link href="/">
              <Image src="/sync-logo.svg" width={80} height={80} alt="Sync Logo" priority />
          </Link>
          <ul className="flex gap-14 font-bold text-xl">
              {NavLinks.map(({ label, href }) =>(
                  <li key= {href}><Link className={label === "How it works?" ? 'text-blue-500' : 'text-black'} key={href} href={href}> {label}</Link></li>
        ))}
          </ul>
    </nav>
  )
}

export default Navbar