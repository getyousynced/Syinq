import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    const navLinks = ["How it works", "About", "Blog", "Contact us"];

    return (
        <div className='bg-black max-w-full text-white items-center text-center'>
            <div className="parent-container max-w-[90%] mx-auto flex justify-start items-center">
                
                <div className="w-1/2">
                    <Image src="/assets/white-sync.png" width={100} height={50} alt='Sync Logo' />
                </div>
                <div className="w-1/2">
                <div className="w-fit py-3 px-4 border-2 border-white rounded-full">
                    <ul className="flex gap-20 justify-center">
                        {navLinks.map((navLink, index) => (
                            <li key={index}>{navLink}</li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
