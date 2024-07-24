import DoctorPersonalPage from '@/components/home/Doctor/DoctorPersonalPage'
import { getDoctorById } from '@/lib/queries/home'
import { notFound } from 'next/navigation'

const DoctorPage = async ({ params }: { params: { doctorId: string } }) => {
  const doctor = await getDoctorById({ id: params.doctorId })
  if (!doctor?.id) notFound()

  return (
    <div className="">
      {/* <DoctorPersonalPage doctor={doctor} /> */}
      <div className="pt-40">{doctor.name}</div>
    </div>
  )
}

export default DoctorPage
