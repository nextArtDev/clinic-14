import Deal from '@/components/home/Deal'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/landing/Hero'
import Carousel from '@/components/home/landing/Carousel'
import StackCards from '@/components/home/stack-cards/StackCards'
import { illness, slider } from '@/constants'
import Slider from '@/components/home/Slider'
import DoctorCarousel from '@/components/home/Doctor/DoctorsCarousel'

import IllnessCarousel from '@/components/home/illness/IllnessCarousel'
import Reviews from '@/components/home/review/Reviews'
import {
  getAllDoctors,
  getAllIllnesses,
  getAllSpecializations,
} from '@/lib/queries/home'

const HomePage = async () => {
  const specializations = await getAllSpecializations({})
  const doctors = await getAllDoctors({})
  const illnesses = await getAllIllnesses({})

  return (
    <div className="grainy">
      <Hero />
      <Deal />
      {/* <Carousel slides={slider} /> */}
      <StackCards />
      {doctors?.doctors?.length && (
        <section className="relative ">
          <DoctorCarousel slides={doctors.doctors} />
        </section>
      )}
      {/* <DoctorCarousel slides={doctors} /> */}
      <IllnessCarousel slides={illnesses?.illnesses} />
      <Reviews />
      <Footer />
    </div>
  )
}
export default HomePage
