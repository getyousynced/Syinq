"use client"
import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'

type typeWriterProps = {
    typeWriterData : string[]
}
const CustomTypewriter = ({ typeWriterData }: typeWriterProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
  return (
      <div>
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
