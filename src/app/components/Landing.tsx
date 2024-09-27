import Image from 'next/image'
import React from 'react'

const Landing = () => {
  return (
      <div className='bg-[#F5F5F5] flex p-20 '>
          <div className=' w-[50%] flex justify-center '>
              <div className='w-[75%]'>
                  <p className='text-3xl font-bold mb-10'>
                      Your Campus Commute, Simplified - <span className='text-[#AAAAAA]'>Socially
                          Connected, Sustainable Ridesharing</span>
                  </p>

                  <p className='text-xl'>
                      Welcome to Sync, the carpooling app designed by students,
                      for students! We understand the struggles of navigating
                      campus life. especially when it comes to finding affordable and
                      reliable transportation, That's where Sync comes in.
                  </p>
              </div>
        </div>
          <div className='w-[50%] flex justify-center '>
              <Image className='object-cover' src="/blue-car.png" alt="blue-car" width={400} height={400} />
        </div>
    </div>
  )
}

export default Landing
