'use client'
import Image from 'next/image'
import { HoveredLink, Menu, MenuItem, ProductItem } from './NavMenu'
import { doctors, special } from '@/constants'

import sun from '@/public/icons/sun.png'
import SearchImage from '@/public/v1/images/search.svg'
// import BagImage from '@/public/v1/images/bag.svg'

import Link from 'next/link'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import StickyNav from './StickyNav'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { Search, User } from 'lucide-react'
import { DockDemo } from './Doc'
import { NavigationMenuDemo } from './NavigationMenuDemo'
import ExpandableSearch from '../search/ExpandableSearch'

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max)

function useBoundedScroll(bounds: number) {
  let { scrollY } = useScroll()
  let scrollYBounded = useMotionValue(0)
  let scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious() || 0
      let diff = current - previous
      let newScrollYBounded = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
    })
  }, [bounds, scrollY, scrollYBounded])

  return { scrollYBounded, scrollYBoundedProgress }
}

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null)
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  let [activeTab, setActiveTab] = useState(special[0].id)
  let { scrollYBoundedProgress } = useBoundedScroll(400)
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.85, 1],
    [0, 0, 1]
  )
  return (
    <>
      <motion.header
        className="fixed inset-0 h-36 py-auto w-full z-30  sm:px-10 px-5 flex justify-between items-center  "
        style={{
          height: useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            // [max , min] height
            [75, 50]
          ),
          backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [0.05, 0.3]
          )})`,
        }}
      >
        <nav className="flex flex-col justify-center w-full   md:mt-4 pt-2 screen-max-width">
          <section className="flex justify-between items-center ">
            <div className="flex justify-between items-center ">
              <Link href={'/'}>
                <motion.figure
                  style={{
                    scale: useTransform(
                      scrollYBoundedProgressThrottled,
                      [0, 1],
                      // [max , min] height
                      [1, 0.6]
                    ),
                  }}
                >
                  <Image src={sun} alt="Sun" width={48} height={48} />
                </motion.figure>
              </Link>
            </div>

            {/* <Menu
              setActive={setActive}
              className={'flex flex-1   justify-center  max-sm:hidden '}
            >
              <MenuItem setActive={setActive} active={active} item="خدمات">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/web-dev">Web Development</HoveredLink>
                  <HoveredLink href="/interface-design">
                    Interface Design
                  </HoveredLink>
                  <HoveredLink href="/seo">
                    Search Engine Optimization
                  </HoveredLink>
                  <HoveredLink href="/branding">Branding</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="دکترها">
                <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                  {doctors.map((nav) => (
                    <ProductItem
                      key={nav.id}
                      title={nav.name}
                      href={`/doctors/${nav.id}`}
                      src={nav.imageSrc}
                      description="Prepare for tech interviews like never before."
                    />
                  ))}
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="تخصصها">
                <div className="flex flex-col space-y-4 text-sm">
                  {special.map((sp) => (
                    <HoveredLink key={sp.id} href={`/specials/${sp.id}`}>
                      {sp.name}
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
            </Menu> */}
            <NavigationMenuDemo />

            <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
              <motion.figure
                style={{
                  scale: useTransform(
                    scrollYBoundedProgressThrottled,
                    [0, 1],
                    // [max , min] height
                    [1, 1.1]
                  ),
                }}
              >
                {/* <Search size={'sm'} className="w-4" /> */}
                <ExpandableSearch />
                {/* <Image src={SearchImage} alt="search" width={18} height={18} /> */}
              </motion.figure>

              <motion.figure
                style={{
                  scale: useTransform(
                    scrollYBoundedProgressThrottled,
                    [0, 1],
                    // [max , min] height
                    [1, 1.3]
                  ),
                }}
              >
                {/* <Image src={BagImage} alt="bag" width={18} height={18} /> */}
                <User size={'sm'} className="w-4" />
              </motion.figure>
            </div>
          </section>
          <motion.ul
            onMouseLeave={() => {
              setPosition((pv) => ({
                ...pv,
                opacity: 0,
              }))
            }}
            className=" flex flex-1 space-x-4 pb-2.5 justify-center  max-sm:hidden "
          >
            {special.map((nav) => (
              <motion.li
                key={nav.id}
                className=" px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
                style={{
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  opacity: useTransform(
                    scrollYBoundedProgressThrottled,
                    [0, 1],
                    [1, 0]
                  ),
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  height: useTransform(
                    scrollYBoundedProgressThrottled,
                    [0, 1],
                    // [max , min] height
                    [40, 5]
                  ),
                }}
              >
                <Link
                  href={'/'}
                  className={cn(
                    // buttonVariants({ variant: 'ghost' }),
                    'backdrop-blur-2xl hover:backdrop-blur-sm hover:bg-transparent rounded-full -mt-0.5'
                  )}
                >
                  {nav.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </motion.header>
      <div className="flex space-x-1">
        <div className=" ">
          <StickyNav>
            {/* {special.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id ? '' : 'hover:text-background'
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground bg-transparent  transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  borderRadius: 9999,
                }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-white mix-blend-difference"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.name}
              </button>
            ))} */}
            <DockDemo />
          </StickyNav>
        </div>
      </div>
    </>
  )
}

export default Navbar
