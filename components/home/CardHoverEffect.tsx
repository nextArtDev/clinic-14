'use client'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    // description: string
    link: string
    url: string
  }[]
  className?: string
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6  py-10',
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full gradient-base   block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col  items-center justify-evenly  gap-2">
              <CardTitle className=" ">{item.title}</CardTitle>
              <figure className="relative w-10 h-10">
                <Image
                  alt={item.title}
                  fill
                  src={item.url || '/images/parallax/0000.webp'}
                  className=" object-cover"
                />
              </figure>
            </div>
            {/* <CardDescription>{item.description}</CardDescription> */}
          </Card>
        </Link>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden gradient-base border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h4 className={cn('text-primary font-bold tracking-wide mt-4', className)}>
      {children}
    </h4>
  )
}
export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p
      className={cn(
        'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
        className
      )}
    >
      {children}
    </p>
  )
}