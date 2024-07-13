import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import Carousel from '@/components/home/landing/Carousel'
import StackCards from '@/components/home/stack-cards/StackCards'
import { slider } from '@/constants'

export default function Home() {
  return (
    <main className="">
      <Hero />
      {/* <Carousel slides={slider} /> */}
      <section className="pt-[100vh] bg-white/40">
        <StackCards />
      </section>
      <Footer />
    </main>
  )
}
