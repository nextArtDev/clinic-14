'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

interface CardProps {
  i: number
  title: string
  items: { id: string; text: string }[]
  src: string
  // url?: string
  // color: string
  progress: MotionValue<number>
  range: number[]
  targetScale: number
}
const Card = ({
  i,
  title,
  items,
  src,
  // url,
  // color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  //   const imageRotate = useTransform(scrollYProgress, [0, 1], [360, 0])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className={cn(styles.cardContainer, '')}>
      <motion.div
        style={{
          // backgroundImage: `url(/parallax-images/${src})`,
          // backgroundBlendMode: 'exclusion',
          // backgroundColor: color,
          mixBlendMode: 'multiply',
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={cn(
          styles.card,
          "relative w-full after:-z-10 after:absolute after:content-[''] after:h-full after:top-0 after:w-full after:left-0 after:opacity-70",
          i % 2 ? 'gradient-base' : 'gradient-base-r'
        )}
      >
        <h2 className="text-primary text-xl md:text-2xl -m-6">{title}</h2>
        <div
          className={cn(styles.body, 'relative flex flex-col w-full h-full')}
        >
          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <Image fill src={src} alt={title} />
              <div className="absolute inset-0 gradient-base opacity-30 backdrop-blur-sm z-[1]"></div>
            </motion.div>
          </div>
          <div
            className={cn(
              styles.description,
              'text-lg font-semibold  text-right'
            )}
          >
            <motion.ul className="   absolute top-16 left-1/2 w-full space-y-4 -translate-x-1/2 flex flex-col  justify-around items-center text-justify z-[2]">
              {items?.map((item) => (
                <motion.li
                  whileInView={{ opacity: 1 }}
                  transition={{ delayChildren: 1.5, staggerChildren: 0.5 }}
                  key={item.id}
                  className="opacity-15"
                >
                  <Badge className="px-2 py-1 flex gap-1 grainy backdrop-blur-md  rounded-full text-sm md:text-base">
                    <CheckCircle
                      className="text-primary"
                      size={16}
                      strokeWidth={2}
                    />
                    <p>{item.text}</p>
                  </Badge>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card
