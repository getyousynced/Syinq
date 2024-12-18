"use client"
import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'

type typeWriterProps = {
    typeWriterData: string[],
}
const CustomTypewriter = ({ typeWriterData }: typeWriterProps) => {
    const [isMounted, setIsMounted] = useState(false);
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
                    delay: 50,
                }}
            />
        </div>
    )
}

export default CustomTypewriter