import CarouselOrientation from '@/components/home/carousel/IllnessCarousel'
import IllnessPage from '@/components/home/illness/IllnessPage'
import { getIllnessesById } from '@/lib/queries/home'
import { notFound } from 'next/navigation'

const page = async ({ params }: { params: { illnessId: string } }) => {
  const illness = await getIllnessesById({ id: params.illnessId })
  if (!illness?.id) notFound()
  return (
    <div className="min-h-screen">
      {/* <section className="w-full h-full relative">
       
      </section> */}
      <IllnessPage illness={illness} />
    </div>
  )
}

export default page
