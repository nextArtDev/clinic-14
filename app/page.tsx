import Deal from '@/components/home/Deal'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/landing/Hero'
import Carousel from '@/components/home/landing/Carousel'
import StackCards from '@/components/home/stack-cards/StackCards'
import { slider } from '@/constants'

export default function Home() {
  return (
    <main className="grainy">
      <Hero />
      <Deal />
      {/* <Carousel slides={slider} /> */}
      <section className="">
        <StackCards />
      </section>

      <Footer />
    </main>
  )
}
