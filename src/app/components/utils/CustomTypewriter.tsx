"use client"
import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'
import { useSidebar } from '../context/SidebarContext'

type typeWriterProps = {
    typeWriterData: string[],
}
const CustomTypewriter = ({ typeWriterData}: typeWriterProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const { isOpen } = useSidebar();
    if (isOpen) return " ";

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;
  return (
      <div className=''>
          <Typewriter
              options={{
                  strings: typeWriterData,
                  autoStart: true,
                  loop: true,
              }}
          />
          </div>
  )
}

export default CustomTypewriter
