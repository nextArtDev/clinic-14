'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { SpecializationColumn, columns } from './columns'
import { Heading } from '@/components/Heading'
import { DataTable } from '@/components/DataTable'
import { ApiList } from '@/components/ApiList'

interface SpecializationClientProps {
  data: SpecializationColumn[]
}

export const SpecializationClient: React.FC<SpecializationClientProps> = ({
  data,
}) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`تخصص (${data.length})`}
          description="اطلاعات تخصصها را مدیریت کنید."
        />
        <Button onClick={() => router.push(`/dashboard/specialization/0`)}>
          <Plus className="ml-2 h-4 w-4" /> اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <ApiList entityName="specializations" entityIdName="specializationId" />
    </>
  )
}
