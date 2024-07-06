'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctor, Image, Prisma, Specialization } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AlertModal } from './AlertModal'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ImageUpload from '../../components/ImageUpload'
import { createDoctorSchema } from '@/lib/schemas/dashboard'


type DoctorFormValues = z.infer<typeof createDoctorSchema>

interface DoctorForm1Props {
  initialData:
    | (Doctor & {
        images: Image[]
      })
    | null
  specialization: Specialization[]
}

const DoctorForm1: FC<DoctorForm1Props> = ({ initialData, specialization }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(specialization)

  const title = initialData ? 'ویرایش ' : 'ایجاد دکتر جدید'
  const description = initialData
    ? 'ویرایش اطلاعات دکتر'
    : 'اضافه کردن دکتر جدید'
  const toastMessage = initialData ? 'اطلاعات دکتر آپدیت شد.' : 'دکتر ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'

  const defaultValues = initialData
    ? {
        ...initialData,
        //In prisma mysql price is Decimal but here it has to be a float
        price: parseFloat(String(initialData?.price)),
        phone: initialData.phone!,
        website: initialData.website!,
        main_image: initialData.main_image!,
        description: initialData.description!,
        specialization_id: parseFloat(String(initialData?.specialization_id)),
      }
    : {
        name: '',
        phone: undefined,
        website: undefined,
        description: undefined,
        main_image: undefined,
        images: [],
        // booking: [],
        // open_time: '',
        // close_time: '',
        price: 0,
        specialization_id: undefined,
      }

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: DoctorFormValues) => {
    try {
    //   setLoading(true)
    //   if (initialData) {
    //     await axios.patch(`/api/doctors/${params.doctorId}`, data)
    //   } else {
    //     console.log(data)
    //     await axios.post(`/api/doctors`, data)
    //   }
    //   router.refresh()
    //   router.push(`/dashboard/doctors`)
    //   toast({ title: toastMessage, variant: 'default' })
    // } catch (error: any) {
    //   toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
    // } finally {
    //   setLoading(false)
    // }
  // }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        // onConfirm={onDelete}
        onConfirm={() => {}}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عکس‌</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی دکتر </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="نام و نام خانوادگی "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="شماره تماس"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس وبسایت</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="آدرس وبسایت"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="توضیحات"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>قیمت ویزیت</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialization_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تخصص</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={`${field.value}`}
                    defaultValue={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="انتخاب تخصص"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialization.map((special) => (
                        <SelectItem key={special.id} value={`${special.id}`}>
                          {special.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default DoctorForm1
