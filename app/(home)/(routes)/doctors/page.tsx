import DoctorCard from '@/components/home/Doctor/DoctorCard'

import LocalSearchbar from '@/components/search/LocalSearchbar'
import Pagination from '@/components/search/Pagination'
import { getAllDoctors } from '@/lib/queries/home'
import SearchIcon from '@/public/icons/search.svg'

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const doctors = await getAllDoctors({
    searchQuery: searchParams.q,

    page: searchParams.page ? +searchParams.page : 1,
  })
  if (!doctors?.doctors)
    return (
      <p className="w-full h-full flex items-center justify-center text-muted text-2xl">
        هیچ دکتری اضافه نشده است.
      </p>
    )
  return (
    <div className="grainy">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">دکترها</h2>
        <div className="my-8 pt-20 flex flex-col gap-6 max-w-lg mx-auto">
          <LocalSearchbar
            route="/doctors"
            iconPosition="left"
            imgSrc={SearchIcon}
            placeholder="جست‌وجوی دکتر "
            otherClasses="flex-1 max-w-md mx-auto "
          />
        </div>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {doctors.doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
          <div className="mt-10">
            <Pagination
              pageNumber={searchParams?.page ? +searchParams.page : 1}
              isNext={doctors.isNext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page