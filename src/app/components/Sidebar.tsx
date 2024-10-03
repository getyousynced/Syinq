"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useSidebar } from "../context/SidebarContext"


const NavLinks = [
    { label: "How it works?", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact-us" },
]

export default function Sidebar() {
    const { isOpen, toggle, close } = useSidebar()

    return (
        <div className="md:hidden">
            <div className="flex items-center p-4 bg-white">
                <button
                    className="z-50"
                    onClick={toggle}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X size={40} /> : <Menu size={40} />}
                </button>
                <div className="flex-grow flex justify-center">
                    <Link href="/">
                        <Image
                            src="/sync-logo.svg"
                            width={100}
                            height={100}
                            alt="Sync Logo"
                            priority
                        />
                    </Link>
                </div>
            </div>

            <div
                className={`
                    fixed top-0 left-0 h-full w-full bg-white shadow-lg 
                    transform transition-transform duration-300 ease-in-out 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="p-10">
                    <Link href="/" className="mb-10 flex justify-center">
                        <Image
                            src="/sync-logo.svg"
                            width={140}
                            height={140}
                            alt="Sync Logo"
                            priority
                        />
                    </Link>
                    <nav>
                        <ul className="space-y-8">
                            {NavLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="block py-4 px-6 text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in-out text-2xl font-semibold"
                                        onClick={close}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}