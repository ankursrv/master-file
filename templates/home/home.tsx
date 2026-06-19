import { cn } from '@/lib/utils'
import React from 'react'

const HomeTemplate = () => {
  return (
    <div className='bg-gray-400'>
      This Is Home Page
      <div className={cn("text-black bg-red-500")}>
        Using Cn Classes 
      </div>
    </div>
  )
}

export default HomeTemplate
