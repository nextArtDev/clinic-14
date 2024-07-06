import React from 'react'

import { prisma } from '@/lib/prisma'
import IllnessForm from './components/SpecializationForm'
import SpecializationForm from './components/SpecializationForm'

const SpecializationPage = async ({
  params,
}: {
  params: { specializationId: string }
}) => {
  const specialization = await prisma.specialization.findUnique({
    where: {
      id: params.specializationId,
    },
    //Because array of images is separate model we have to include it, because we want row of url's not array of id's
    include: {
      images: true,
      // doctors: true,
      illness: true,
    },
  })

  // const illnesses = await prisma.illness.findMany({
  //   // where: {
  //   //   doctors: { some: { id: +params.doctorId } },
  //   // },
  // })
  // const doctor = await prisma.doctor.findMany({
  //   // where: {
  //   //   doctors: { some: { id: +params.doctorId } },
  //   // },
  // })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecializationForm
          initialData={specialization}
          // illnesses={illnesses}
          // doctor={doctor}
        />
        {/* <DoctorForm initialData={doctor} specialization={specialization} /> */}
      </div>
    </div>
  )
}

export default SpecializationPage
