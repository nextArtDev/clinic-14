import Deal from '@/components/home/Deal'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/landing/Hero'
import Carousel from '@/components/home/landing/Carousel'
import StackCards from '@/components/home/stack-cards/StackCards'
import { doctors, slider } from '@/constants'
import Slider from '@/components/home/Slider'
import DoctorCarousel from '@/components/home/Doctor/DoctorsCarousel'
import Reviews from '@/components/home/review/Reviews'

export default function Home() {
  return (
    <main className="grainy">
      <Hero />
      <Deal />
      {/* <Carousel slides={slider} /> */}
      <StackCards />
      <DoctorCarousel slides={doctors} />
      <section className="relative ">
        <Slider />
      </section>
      <Reviews />
      <Footer />
    </main>
  )
}
