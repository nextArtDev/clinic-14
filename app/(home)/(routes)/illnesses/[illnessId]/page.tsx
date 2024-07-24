import IllnessPage from '@/components/home/illness/IllnessPage'
import { getIllnessesById } from '@/lib/queries/home'
import { notFound } from 'next/navigation'

const page = async ({ params }: { params: { illnessId: string } }) => {
  const illness = await getIllnessesById({ id: params.illnessId })
  if (!illness?.id) notFound()
  return (
    <div className="">
      <IllnessPage illness={illness} />
      <div>{illness.name}</div>
    </div>
  )
}

export default page
