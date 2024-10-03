import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type NavLink = {
    label: string, 
    href: string
}

const NavLinks : NavLink[] = [
    { label: "How it works?", href: '/how-it-works' },
    { label: "About", href: '/about' },
    { label: "Blog", href: '/blog' },
    { label: "Contact us", href: '/contact-us' },
]
const Navbar = () => {

  return (
      <nav className='hidden sm:flex justify-between bg-white px-10 p-4 items-center'>
          <Link href="/">
              <Image src="/sync-logo.png" width={80} height={80} alt="Sync Logo" priority />
          </Link>
          <ul className="flex gap-14 font-bold text-xl">
              {NavLinks.map(({ label, href }) =>(
                  <li><Link className={label === "How it works?" ? 'text-blue-500' : 'text-black'} key={href} href={href}> {label}</Link></li>
        ))}
          </ul>
    </nav>
  )
}

export default Navbar
