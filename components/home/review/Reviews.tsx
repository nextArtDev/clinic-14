import React from 'react'
import MarqueeCard, { marquees } from './MarqueeCard'
import Marquee from '../Marquee'

type Props = {}

function Reviews({}: Props) {
  return (
    <div
      dir="ltr"
      className=" relative flex h-[400px]  w-full flex-col items-center justify-center overflow-hidden rounded-lg border   md:shadow-xl"
    >
      <h2 className="mb-4 text-center font-bold  md:mb-8 lg:text-3xl xl:mb-12">
        نظرات
      </h2>
      <Marquee pauseOnHover className="[--duration:20s]">
        {marquees.map((marquee) => (
          <MarqueeCard key={marquee.id} {...marquee} />
        ))}
      </Marquee>
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}

export default Reviews
