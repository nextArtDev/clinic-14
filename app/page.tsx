import Hero from '@/components/home/Hero'
import StackCards from '@/components/home/stack-cards/StackCards'

export default function Home() {
  return (
    <main className="">
      <Hero />
      <section className="bg-white/40">
        <StackCards />
      </section>
    </main>
  )
}
