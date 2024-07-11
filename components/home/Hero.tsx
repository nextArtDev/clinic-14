'use client'

import { Button, buttonVariants } from '@/components/ui/button'
// import Herosvg from './icons/svg/Herosvg'
import Image from 'next/image'
import logoSrc from '../../public/vercel.svg'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Expo } from 'gsap/all'
// import Phone from './icons/Phone'
// import HeroWhatsApp from './icons/HeroWhatsApp'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import partOneSrcImage from '../public/images/page2.png'
import HeroSmImage from '@/public/images/header-sm.jpg'
import HeroLgImage from '@/public/images/header-lg.jpg'
import { MapPin, Phone } from 'lucide-react'
import HeroWhatsApp from './icons/HeroWhatsApp'
type Props = {}

function Hero({}: Props) {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  useEffect(() => {
    const tl = gsap.timeline({ Defaults: { ease: Expo.easeOut } })
    // const tl = gsap.timeline({ Defaults: {} })

    //    timeline.fromTo(ref.current, { opacity: 0 }, { opacity: 1 })
    tl.from(bgRef.current, {
      scale: 0.6,
      duration: 2,
      opacity: 0,
      ease: Expo.easeOut,
      delay: 0.75,
    })
      .to(
        '.text-reveal',
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          stagger: 0.3,
          duration: 0.5,
        },
        '-=2.9'
      )
      .to('.text-reveal', {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        y: -200,
        duration: 0.2,
        delay: 0.25,
      })
      .to('.text-reveal', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        stagger: 0.7,
        duration: 0.3,
        delay: 0.25,
      })
      .to('.svgLogo', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1,
        y: -200,
      })
      .to(
        '.local',
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          // xPercent: '100',
          stagger: 0.7,
          opacity: 1,
          duration: 1.2,
        },
        '-=0.7'
      )

    return () => {
      tl.kill() // Cleanup the timeline when the component unmounts
    }
  }, [])
  return (
    <section className="relative w-full h-[calc(h-screen-5rem)]">
      <div className="container absolute top-0 inset-0 grid place-items-center  ">
        <div className="content text-center z-10 ">
          <div className="flex justify-center items-center">
            <Image
              src={logoSrc}
              width={32}
              height={32}
              // className="svgLogo block m-8 top-[20%] w-16 h-16"
              className="svgLogo block w-32 h-32"
              alt="logo"
            />
          </div>
          <div className="content-inner space-y-4">
            <h1 className="text-reveal text-center text-3xl font-bold text-primary mb-0 py-1 ">
              درمانگاه آئین شفق
            </h1>
            <p className="text-reveal flex flex-col justify-center items-center gap-4 text-center text-xl text-primary/70 font-semibold">
              پذیرش بیماران درمانگاهی توسط پزشکان عمومی
            </p>
          </div>
          <div className=" text-reveal pt-8 flex gap-x-4 justify-center items-center ">
            <a href="tel:03137888561" className="flex  gap-1">
              {/* <span className=" text-lg underline underline-offset-2 decoration-red-600 decoration-1 "> */}
              <Button
                variant={'outline'}
                className={cn('text-lg  flex gap-x-2 shadow-2xl ')}
              >
                تماس
                <Phone />
              </Button>
            </a>
            <Link
              href="https://wa.me/+989386472694"
              target="_blank"
              className="flex  gap-1"
            >
              {/* <span className=" text-lg underline underline-offset-2 decoration-green-600 decoration-1 "> */}
              <Button
                variant={'ghost'}
                className={
                  ' border border-white-70 text-lg flex gap-x-2 shadow-inner '
                }
              >
                پیام
                <HeroWhatsApp className="mix-blend-multiply text-green-600 " />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="videoContainer relative w-full h-screen after:-z-10 after:absolute after:content-[''] after:h-full after:top-0 after:w-full after:left-0 after:opacity-70 ">
        <Image
          ref={bgRef}
          alt="کلینیک آیین شفق"
          src={HeroSmImage}
          fill
          className="bg md:hidden absolute top-0 left-0 w-full h-full -z-20  object-cover"
        />
        <Image
          ref={bgRef}
          alt="کلینیک آیین شفق"
          src={HeroLgImage}
          fill
          className="bg hidden md:block md:absolute md:top-0 md:left-0 md:w-full md:h-full md:-z-20  md:object-cover"
        />
        {/* <video
          ref={bgRef}
          autoPlay
          muted
          loop
          // ref={videoRef}
          className="bg absolute top-0 left-0 w-full h-full -z-20 aspect-video object-cover object-top "
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>

      <div className="location-container absolute w-full flex flex-col gap-2 top-[62%] h-[30%] -right-1  md:-right-2 text-black/50 text-right ">
        <Link
          href="/inography"
          className={cn(
            buttonVariants(),
            ' local grainy text-right text-black/50 w-[40%] h-[25%] overflow-hidden bg-[#C69B7B45]   bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-[#C69B7B55]  outline-dashed -outline-offset-2 outline-1 outline-[#C69B7B] hover:text-black hover:bg-[#C69B7B]'
          )}
        >
          {/* <Image
            src={partOneSrcImage}
            fill
            className="object-cover "
            alt="اینوگرافی بیماری‌ها"
          /> */}
          {/* <Button
            className="absolute text-black  top-[50%] left-[50%] translate-x-[-50%] box-shadow z-20"
            variant="outline"
          > */}
          <p className="text-black/70 text-right z-10">اینوگرافی بیماری‌ها</p>
          {/* </Button> */}
          {/* <span className="absolute inset-0 bg-transparent text-black text-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
           اینوگرافی
          </span  > */}
        </Link>
        {/* <div className=" local rounded-t-3xl grid place-items-center w-[33%] h-[12rem] bg-hero-parts-gradient">
          <Button
            className=" bg-transparent rounded-3xl border-black"
            variant="outline"
          >
            بیماری‌ها
          </Button>
        </div> */}
        <Link
          href="#search"
          className={cn(
            buttonVariants(),
            'local grainy bg-[#C69B7B65] scroll-smooth bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-[#C69B7B65] w-[60%] h-[25%] overflow-hidden outline-dashed -outline-offset-2 outline-1 outline-[#C69B7B] hover:text-black hover:bg-[#C69B7B]'
          )}
        >
          {/* <Image
            src={'/images/1.png'}
            fill
            className="object-cover "
            alt="جست و جوی بیماری‌ها"
          /> */}
          {/* <Button
            className="absolute text-black  top-[50%] left-[50%] translate-x-[-50%] box-shadow z-20"
            variant="outline"
          > */}
          <p className=" text-right text-black/70 z-10">
            جست‌وجوی نام دکتر و بیماری
          </p>
          {/* </Button> */}
          {/* <span className="absolute inset-0 bg-transparent text-black text-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
           اینوگرافی
          </span  > */}
        </Link>
        {/* <div className=" local rounded-t-3xl grid place-items-center w-[33%] h-[12rem] bg-hero-parts-gradient">
          <Button
            className=" bg-transparent rounded-3xl border-black"
            variant="outline"
          >
            ارتباط با ما
          </Button>
        </div> */}
        <div
          className={cn(
            buttonVariants(),
            'local grainy bg-[#C69B7B75] scroll-smooth bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-[#C69B7B85] w-[80%] h-[25%] overflow-hidden outline-dashed -outline-offset-2 outline-1 outline-[#C69B7B] hover:text-black hover:bg-[#C69B7B]'
          )}
          onClick={() =>
            window.open(
              'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d840.1737458707142!2d51.584555694442685!3d32.61431114769074!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc31589c7322eb%3A0x31ea7b3386684a83!2z2K_Yp9ix2YjYrtin2YbZhyDYr9qp2KrYsdi02KfZh9ix2LbYp9uM24w!5e0!3m2!1sen!2sus!4v1691049962745!5m2!1sen!2sus'
            )
          }
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d840.1737458707142!2d51.584555694442685!3d32.61431114769074!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc31589c7322eb%3A0x31ea7b3386684a83!2z2K_Yp9ix2YjYrtin2YbZhyDYr9qp2KrYsdi02KfZh9ix2LbYp9uM24w!5e0!3m2!1sen!2sus!4v1691049962745!5m2!1sen!2sus"
            loading="lazy"
            className="opacity-10 absolute inset-0 w-full h-full bottom-0 object-cover "
          ></iframe>
          {/* <Button
            className="absolute text-black/80 bg-opacity-30 border-black top-[50%] left-[50%] translate-x-[-50%] z-20"
            variant="outline"
          > */}
          <span className="text-right  text-black/80 flex justify-center items-center gap-2 ">
            نشانی بر روی گوگل مپ
            <MapPin className="text-red-700 animate-pulse " />
          </span>
          {/* </Button> */}
          {/* <span className="absolute inset-0 bg-transparent text-black text-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
           اینوگرافی
          </span  > */}
        </div>
      </div>
    </section>
  )
}

export default Hero
