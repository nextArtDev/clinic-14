'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  i: number
  title: string
  description?: string
  src: string
  url?: string
  // color: string
  progress: MotionValue<number>
  range: number[]
  targetScale: number
}
const Card = ({
  i,
  title,
  description,
  src,
  url,
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
          "  grainy relative w-full after:-z-10 after:absolute after:content-[''] after:h-full after:top-0 after:w-full after:left-0 after:opacity-70   "
        )}
      >
        <h2 className="text-primary">{title}</h2>
        <div className={styles.body}>
          {/* <div className={styles.description}>
            <p>{description}</p>
            <span>
              <a href={url} target="_blank">
                See more
              </a>
              <svg
                className="rotate-180"
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div> */}

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <Image fill src={src} alt="image" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card
