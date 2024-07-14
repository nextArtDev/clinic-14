'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
type Props = {
  imageSrc: any
}

function ImageEffect({ imageSrc }: Props) {
  const imageRef = useRef(null)
  const maskRef = useRef(null)
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true })
  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline()
      tl.from(imageRef.current, {
        scale: 2,
        duration: 1.5,
      })
        .to(
          maskRef.current,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          0
        )
        .to(maskRef.current, { scale: 0.95, duration: 2 })
      return () => {
        tl.kill() // Cleanup the timeline when the component unmounts
      }
    }
  }, [inView])
  return (
    <section
      ref={ref}
      className="ad flex justify-center items-center     grainy origin-center scale-75"
      // className="ad flex justify-center items-center w-96 h-96 rounded-t-xl grainy origin-center scale-75"
    >
      <div
        ref={maskRef}
        className="mask w-[23.5rem] h-[23.5rem]  overflow-hidden bg-slate-700"
      >
        <motion.div
          initial={{ height: 'auto' }}
          whileInView={{ height: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.7,
            ease: 'easeOut',
          }}
          className="absolute inset-0 bg-blue-900/20  backdrop-blur-sm z-[1]"
        ></motion.div>
        <Image
          fill
          ref={imageRef}
          src={imageSrc}
          alt="image"
          className="bus object-cover w-full h-full"
        />
      </div>
    </section>
  )
}

export default ImageEffect
