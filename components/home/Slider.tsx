'use client'

import { useRef } from 'react'
import DoctorImage from '@/public/images/1.jpg'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import ImageEffect from './ImageEffect'
import { special } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'

const items = [
  {
    id: 1,
    title: 'React Commerce',
    img: '/images/parallax/0015.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 2,
    title: 'Next.js Blog',
    img: '/images/parallax/0016.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 3,
    title: 'Vanilla JS App',
    img: '/images/parallax/0014.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 4,
    title: 'Music App',
    img: '/images/parallax/0013.webp',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
]

interface SingleProps {
  item: {
    id: number
    title: string
    imgUrl: string
    description: string
    doctorId: number[]
  }
}
const Single = ({ item }: SingleProps) => {
  // Its container is image section, not the whole section, imageRef
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
  })

  // the bigger numbers, the faster response to reference point (here img)
  const y = useTransform(scrollYProgress, [0, 1], [-170, 170])
  const y0 = useTransform(scrollYProgress, [0, 1], [-120, 120])
  const y1 = useTransform(scrollYProgress, [0, 1], [-120, 120])
  const ImageScale = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section>
      <div className="container flex items-center justify-center w-full h-full overflow-hidden">
        <div className="wrapper relative max-w-[1366px] m-auto flex items-center justify-center gap-12 ">
          <div
            className="imageContainer max-sm:absolute max-sm:inset-0 h-1/2 p-4 md:block md:flex-1 md:h-full md:shrink-0"
            ref={ref}
          >
            {/* <img
              src={item.img}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className=""
            /> */}
            <ImageEffect
              imageSrc={item.imgUrl || '/images/parallax/0003.webp'}
            />
            {/* <img
              src={item.img}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className=""
            /> */}
          </div>
          <motion.div
            className="textContainer min-h-[400px] md:flex md:flex-1 md:flex-col md:gap-6"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.4, delay: 0.4 },
              },
            }}
            style={{
              y,
              backgroundImage: item.imgUrl,
            }}
          >
            <motion.h2
              className="opacity-0 scale-0 text-2xl text-primary font-bold"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
            >
              {item.title}
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="opacity-0 scale-0 text-muted-foreground text-lg "
              style={{ y: y0 }}
            >
              {item.description}
            </motion.p>
            <motion.div
              // variants={{
              //   hidden: { opacity: 0 },
              //   visible: { opacity: 1, scale: 1 },
              // }}
              className=" relative w-32 h-32  border-none   cursor-pointer overflow-hidden aspect-square shrink-0 after:content-[''] after:absolute after:-bottom-6 after:w-32 after:h-12 after:bg-red-500"
              style={{
                y: y1,
                scale: ImageScale,
              }}
            >
              <Image
                fill
                alt="dr"
                src={DoctorImage.src}
                className="object-contain after:content-[''] after:absolute after:bottom-0 after:w-12 after:h-4 after:bg-red-500 "
              />
              {/* after:-z-10 after:absolute after:content-[''] after:h-full
              after:top-0 after:w-full after:left-0 after:opacity-70 */}
              {/* <Avatar
                className={`w-[${ImageWidth}px]`}
                style={{
                  width: `${ImageWidth}px`,
                }}
              >
                <AvatarImage src="/images/1.jpg" alt="@shadcn" />
                <AvatarFallback>Doctor</AvatarFallback>
              </Avatar> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Slider = () => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // the line at the beginning is 100%: end end, and at the end is 0%
    offset: ['end end', 'start start'],
  })

  // Its like useTransform, but for spring behavior
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  })

  return (
    <div
      className="portfolio relative "
      ref={ref}
      style={{ position: 'relative' }}
    >
      <div className="progress z-30 sticky top-0 left-0 p-0.5 pt-12 text-center text-orange-400  ">
        <h1>کلینیک‌ها</h1>
        <motion.div
          style={{ scaleX }}
          className="progressBar rounded-full grainy h-1.5"
        ></motion.div>
      </div>
      {special.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  )
}

export default Slider
