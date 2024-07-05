'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { DoctorColumn, columns } from './columns'
import { Heading } from '@/components/dashboard/Heading'
import { DataTable } from '@/components/dashboard/DataTable'
// import { ApiList } from '@/components/dashboard/ApiList'

interface DoctorsClientProps {
  data: DoctorColumn[]
}

export const DoctorsClient: React.FC<DoctorsClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`پزشکان (${data.length})`}
          description="اطلاعات پزشکان را مدیریت کنید."
        />
        <Button onClick={() => router.push(`/dashboard/doctors/0`)}>
          <Plus className="ml-2 h-4 w-4" /> اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      {/* <ApiList entityName="doctors" entityIdName="doctorId" /> */}
    </>
  )
}
