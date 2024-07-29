'use client'
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

// import DoctorComment from '@/components/DoctorComment'
// import PostPage from '@/components/Post'
import { days, illness } from '@/constants'

import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, ExternalLink, ForwardIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { url } from 'inspector'
import { DateTag, Doctor, Illness, Review, User } from '@prisma/client'
import SkewedInfiniteScroll from './SkewedInfiniteScroll'
import DoctorComment from './DoctorComment'
import DoctorReviews from './DoctorReviews'
import { ReviewsWithUserAndImage } from '@/lib/queries/home'
import DoctorReservationCard from './DoctorReservationCard'
import BoxReveal from '../BoxReveal'
import { StarRating } from '../StarRating'
import MarqueeCard from '../review/MarqueeCard'
import ReviewCard from './ReviewCard'

interface pageProps {
  doctor: Doctor & { illnesses: Illness[] | null } & {
    images: { url: string | null }[]
  } & {
    reviews: ReviewsWithUserAndImage[] | null
  } & { open_time: DateTag[] | null }
  rate: number | null
  user: (User & { image: { url: string } | null }) | null
  beforeRated?: {
    rating: number
  } | null
}
function DoctorPersonalPage({ doctor, user, beforeRated, rate }: pageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  // const scrollYProgressSpring = useSpring(scrollYProgress, {
  //   stiffness: 300,
  //   damping: 40,
  // }) as MotionValue<number>
  // const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0])
  // const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`
  // const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  return (
    <>
      <div
        ref={ref}
        className=" bg-transparent py-12 pb-32 "
        // style={{
        //   backgroundImage: "url('/noise-svg/noise4.svg')",
        // }}
      >
        <motion.div className=" min-h-[20vh] w-full">
          {/* <Image
            height={128}
            width={128}
            className="h-32 w-full object-cover lg:h-48"
            src="/images/parts/omomi.webp"
            alt=""
          /> */}
          <SkewedInfiniteScroll>
            {doctor.reviews?.map((review) => (
              <ReviewCard
                key={review.id}
                rate={review.rating}
                name={review.user?.name!}
                text={review.comment}
                time={review.created_at}
              />
            ))}
          </SkewedInfiniteScroll>
        </motion.div>

        <div className="  mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 ">
            <div className="flex-col ">
              <motion.figure
                style={{ scale }}
                className="relative h-24 w-24 sm:h-32 sm:w-32 "
              >
                <Image
                  fill
                  className=" object-cover  rounded-full ring-4 ring-white "
                  src={doctor.images?.[0]?.url || '/images/1.jpg'}
                  alt=""
                />
              </motion.figure>
              <div className="mt-6 min-w-0 flex flex-col gap-2 justify-center ">
                <h1 className=" text-2xl font-bold text-blue-950">
                  دکتر {doctor.name}
                </h1>
                {!!rate && (
                  <article className="flex gap-1  ">
                    <StarRating
                      disabled
                      numStars={rate}
                      value={rate}
                      // icon={Heart}
                      iconProps={{ className: 'size-5' }}
                    />
                    <span>{`(${parseFloat(rate.toFixed(1))} از ${
                      doctor.reviews?.length
                    } نفر)`}</span>
                  </article>
                )}
              </div>
            </div>
            <div className=" mt-6  sm:min-w-0 sm:flex-1 sm:items-center sm:justify-between sm:space-x-6 sm:pb-1">
              <div className="mt-6 text-secondary flex flex-col justify-stretch space-y-3 sm:flex-row sm:justify-evenly sm:space-x-4 sm:space-y-0">
                {!!doctor?.description && (
                  <div className="grainy  inline-flex text-center justify-center items-center rounded-md bg-transparent backdrop-blur-sm px-3 py-4 text-sm font-semibold shadow-sm  ">
                    <BoxReveal boxColor="transparent">
                      <span>{doctor.description}</span>
                    </BoxReveal>
                  </div>
                )}
                {doctor?.open_time?.length ? (
                  <div className="grainy flex justify-around rounded-md bg-transparent backdrop-blur-sm px-3 py-2 text-sm font-semibold shadow-sm  ">
                    <ul
                      className={cn(
                        'font-semibold',
                        'flex flex-wrap gap-x-2 py-4  items-center '
                      )}
                    >
                      {doctor?.open_time?.map((booking) => (
                        <li
                          key={booking.id}
                          className={'text-base text-muted '}
                        >
                          <BoxReveal boxColor="transparent">
                            <time className=" !custom-box-shadow text-xs rounded-full   px-1 ">
                              {booking.time}
                            </time>
                          </BoxReveal>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {doctor?.illnesses?.length && (
            <div className="pt-8 w-full flex-auto">
              {/* <h2 className="text-xl font-bold tracking-tight  sm:text-2xl">
                موارد معالجه{' '}
              </h2> */}

              <ul
                role="list"
                className="mt-4 grid grid-cols-1 place-items-center gap-x-8 gap-y-4 text-base leading-7  sm:grid-cols-2 "
              >
                {doctor?.illnesses.map((illness) => (
                  <Link
                    key={illness.id}
                    href={`/illnesses/${illness.id}`}
                    className={cn(
                      buttonVariants(),
                      'py-8 text-center w-[60%] headGradient outline-blue-300 outline-dashed -outline-offset-3'
                    )}
                  >
                    <li className="mix-blend-multiply text-blue-900  flex  justify-start items-center gap-x-2 ">
                      <ForwardIcon
                        className="opacity-60 h-7 w-5 flex-none"
                        aria-hidden="true"
                      />
                      {illness.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
          {!beforeRated && <DoctorComment doctor={doctor} user={user} />}
          <DoctorReviews reviews={doctor.reviews} />
          {/* <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {profile.name}
            </h1>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default DoctorPersonalPage

// {
{
  /* {isFirefox && <h1 className="text-5xl">FireFox Detected</h1>} */
}
// <div
//   ref={ref}
//   className="relative  z-10 h-[200vh] overflow-clip font-farsi text-center "
// >
//   <motion.div
//     style={{ scale }}
//     className="hero-background sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr] md:origin-[90%_40%] md:pt-20"
//   >
//     <div className=" window-mask flex flex-col rounded-3xl bg-hero-gradient p-12 ">
//       <div className="flex justify-start items-center  flex-col text-center  ">
//         <h2 className="mb-5 mx-auto text-lg font-bold leading-[0.85] md:my-auto md:text-xl xl:text-2xl">
//           {/* <h2 className="mb-5 mx-auto max-w-[12vh] text-lg font-bold leading-[0.85] md:my-auto md:text-xl xl:text-2xl"> */}
//           دکتر {doctor.name}
//         </h2>
//         <p className="text-lg md:text-2xl">
//           {doctor.specialty} <br />
//           {/* زایمان طبیعی و سزارین */}
//         </p>
//       </div>
{
  /* <div className="space-y-[30px] bg-hero-gradient-reverse md:text-[30px] pb-32  "> */
}
{
  /* <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 gap-4">
              {doctor.illnessId.map((illId) => {
                return illness.map((ill) => {
                  if (illId === ill.id) {
                    return (
                      <p key={ill.id} className="pr-8 font-farsi text-white">
                        {ill.name}
                      </p>
                    )
                  }
                })
              })}
            </div> */
}

{
  /* <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[150px] min-w-[150px] rounded-full border-[4px] border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[300px] md:min-w-[300px]" />
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-2">
            <div className="col-span-2 rounded-3xl border border-white" />
            <a className="flex items-center justify-center rounded-3xl bg-orange-400 text-center text-lg font-bold text-slate-900 md:text-5xl">
              Early Access
            </a> */
}
//     </div>
//     <div className="fixed bottom-28 left-[50%] -translate-x-[50%] ">
//       <Mouse />
//     </div>
//   </motion.div>
// </div>
// <div className="mt-[-200vh] h-[200vh] overflow-clip bg-hero-gradient pb-20">
//   <motion.span
//     style={{ x: imageXCalc }}
//     className="sticky top-[42%] mx-auto block aspect-video w-[630px] max-w-[95%] rounded-[60px] bg-gray-300 shadow-2xl md:top-1/4 overflow-x-hidden "
//   >
//     <div className="flex">
//       <Image
//         width={150}
//         height={250}
//         src={'/images/1.png'}
//         className="absolute  bottom-0 -left-4 "
//         alt="doctor"
//       />
//       <div className="flex flex-col space-y-8 justify-center p-8">
//         <h2 className="">جراح و متخصص زنان</h2>
//         <h2 className="">فارغ التحصیل دانشگاه علوم پزشکی اصفهان</h2>

//         <div className="flex flex-col ">
//           {doctor?.booking?.map((book) => {
//             return days.map((day) => {
//               if (book.dayId === day.id) {
//                 return (
//                   <p key={day.id} className="pr-8 font-farsi ">
//                     {`${day.name} از ساعت ${book.hours[0]} تا ${book.hours[1]}`}
//                   </p>
//                 )
//               }
//             })
//           })}
//         </div>
//       </div>
//     </div>
//   </motion.span>
// </div>

// }
// 'use client'
// import {
//   MotionValue,
//   motion,
//   useMotionTemplate,
//   useScroll,
//   useSpring,
//   useTransform,
// } from 'framer-motion'
// // import './index.css'
// import { useRef } from 'react'

// function Landing() {
//   const ref = useRef(null)
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start start', 'end end'],
//   })
//   const scrollYProgressSpring = useSpring(scrollYProgress, {
//     stiffness: 300,
//     damping: 40,
//   }) as MotionValue<number>
//   const scale = useTransform(scrollYProgressSpring, [0, 1], [1, 12])
//   const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0])
//   const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`

//   return (
//     <main>
//       <div
//         ref={ref}
//         dir="ltr"
//         className="relative z-10 h-[200vh] overflow-clip"
//       >
//         <motion.div
//           style={{ scale }}
//           className="hero-background sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr] md:origin-[90%_40%] md:pt-20"
//         >
//           <div className="window-mask flex flex-col rounded-3xl bg-white p-12 md:flex-row">
//             <div className="flex h-full flex-col text-center  ">
//               <h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-[80px] xl:text-[128px]">
//                 دکتر توتونیان
//               </h1>
//               <p className="text-lg md:text-3xl">
//                 متخصص زنان، زایمان، نازایی <br />
//                 زایمان طبیعی و سزارین
//               </p>
//             </div>
//             <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[150px] min-w-[150px] rounded-full border-[4px] border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[300px] md:min-w-[300px]" />
//           </div>
//           <div className="grid grid-flow-row grid-cols-3 gap-2">
//             <div className="col-span-2 rounded-3xl border border-white" />
//             <a className="flex items-center justify-center rounded-3xl bg-orange-400 text-center text-lg font-bold text-slate-900 md:text-5xl">
//               Early Access
//             </a>
//           </div>
//         </motion.div>
//       </div>
//       <div className="mt-[-200vh] h-[200vh] overflow-clip bg-blue-100 pb-20">
//         <motion.span
//           style={{ x: imageXCalc }}
//           className="sticky top-1/2 mx-auto block aspect-video w-[1600px] max-w-[90%] rounded-[60px] bg-gray-300 shadow-2xl md:top-1/4"
//         />
//       </div>
//       <div className="space-y-[80px] bg-blue-100 md:text-[300px]">
//         <p>Some more content</p>
//         <p>So theres</p>
//         <p>Some room</p>
//         <p>To scroll...</p>
//       </div>
//     </main>
//   )
// }

// export default Landing
