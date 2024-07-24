import Deal from '@/components/home/Deal'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/landing/Hero'
import Carousel from '@/components/home/landing/Carousel'
import StackCards from '@/components/home/stack-cards/StackCards'
import { doctors, illness, slider } from '@/constants'
import Slider from '@/components/home/Slider'
import DoctorCarousel from '@/components/home/Doctor/DoctorsCarousel'

import IllnessCarousel from '@/components/home/illness/IllnessCarousel'
import Reviews from '@/components/home/review/Reviews'
import { getAllSpecializations } from '@/lib/queries/home'

const HomePage = async () => {
  const specializations = await getAllSpecializations({})

  return (
    <div className="grainy">
      <Hero />
      <Deal />
      {/* <Carousel slides={slider} /> */}
      <StackCards />
      <DoctorCarousel slides={doctors} />
      {specializations?.specializations?.length && (
        <section className="relative ">
          <Slider specializations={specializations.specializations} />
        </section>
      )}
      <IllnessCarousel slides={illness} />
      <Reviews />
      <Footer />
    </div>
  )
}
export default HomePage
