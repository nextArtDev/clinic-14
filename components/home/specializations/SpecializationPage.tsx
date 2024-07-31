import { DateTag, Doctor, Illness, Specialization } from '@prisma/client'
import React from 'react'

import IllnessShowCard from '../illness/IllnessShowCard'
import DoctorReservationCard from '../Doctor/DoctorReservationCard'
import Link from 'next/link'

type Props = {
  specialization: Specialization & {
    illness: (Illness & { images: { url: string | null }[] })[] | null
  } & { images: { url: string | null }[] | null } & {
    doctors: (Doctor & { images: { url: string | null }[] } & {
      open_time: DateTag[] | null
    })[]
  }
}

function SpecializationPage({ specialization }: Props) {
  return (
    <section className="mx-auto py-8 max-w-7xl w-full flex flex-col gap-12">
      <article className="flex flex-col gap-4">
        <h2 className="text-xl text-center title-color md:text-2xl mix-blend-multiply">
          دکترهای مرتبط
        </h2>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {specialization.doctors.map((doctor) => (
            <Link key={doctor.id} href={`/doctors/${doctor.id}`}>
              <DoctorReservationCard doctor={doctor} />
            </Link>
          ))}
        </div>
      </article>
      <article className="flex flex-col gap-4">
        <h2 className="text-xl text-center title-color md:text-2xl mix-blend-multiply">
          بیماری‌های مرتبط
        </h2>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {specialization?.illness?.map((illness) => (
            <IllnessShowCard illness={illness} key={illness.id} />
          ))}
        </div>
      </article>
    </section>
  )
}

export default SpecializationPage
