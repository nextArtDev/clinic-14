import DoctorPersonalPage from '@/components/home/Doctor/DoctorPersonalPage'
import { getDoctorById } from '@/lib/queries/home'
import { notFound } from 'next/navigation'

const DoctorPage = async ({ params }: { params: { doctorId: string } }) => {
  const doctor = await getDoctorById({ id: params.doctorId })
  if (!doctor?.id) notFound()

  return (
    <div className="grainy min-h-screen">
      <DoctorPersonalPage doctor={doctor} />
    </div>
  )
}

export default DoctorPage
