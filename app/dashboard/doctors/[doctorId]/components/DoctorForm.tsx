'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Booking, Doctor, Images, Prisma, Specialization } from '@prisma/client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { AlertModal } from './AlertModal'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import ImageUpload from '../../components/ImageUpload'

const formSchema = z.object({
  name: z.string().min(1, { message: 'این قسمت نمی‌تواند خالی باشد' }),
  phone: z
    .string()
    .regex(new RegExp('^09\\d{9}$'), {
      message: 'شماره موبایل معتبر نیست.',
    })
    .regex(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'), {
      message: 'شماره موبایل معتبر نیست.',
    })
    .optional(),
  website: z
    .string()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .url()
    .optional(),
  description: z.string().optional(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
  main_image: z
    .string()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .url()
    .optional(),
  // images: z
  //   .object({
  //     url: z.string(),
  //     imageKey: z.string(),
  //   })
  //   .array(),
  // .array()  satisfies Prisma.ImagesUncheckedCreateNestedManyWithoutDoctorInput,
  // booking: z.object({ booking_time: z.date() }).array().optional(),
  //Because we're working with Decimal, we should add "coerce"
  price: z.coerce.number().min(1, { message: 'این قسمت نمی‌تواند خالی باشد' }),
  specialization_id: z.coerce
    .number()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .optional(),
}) satisfies z.Schema<Prisma.DoctorUncheckedCreateInput>

type DoctorFormValues = z.infer<typeof formSchema>

interface DoctorFormProps {
  //because we include images, we have to extend our model
  initialData: Doctor | null
  //  & {
  // images: Images[]
  // bookings: Booking[]
  // }
  specialization: Specialization[]
}

const DoctorForm: FC<DoctorFormProps> = ({ initialData, specialization }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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
        specialization_id: parseFloat(String(initialData?.specialization_id)),
      }
    : {
        name: '',
        phone: '',
        website: '',
        description: '',
        main_image: '',
        // images: [],
        // booking: [],
        open_time: '',
        close_time: '',
        price: 0,
        specialization_id: null,
      }

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: DoctorFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/doctors/${params.doctorId}`, data)
      } else {
        await axios.post(`/api/doctors`, data)
      }
      router.refresh()
      router.push(`/doctors`)
      toast({ title: toastMessage, variant: 'default' })
    } catch (error: any) {
      toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/doctors/${params.doctorId}`)
      router.refresh()
      router.push(`/doctors`)
      toast({ title: 'دکتر حذف شد.', variant: 'default' })
    } catch (error: any) {
      toast({
        title: 'مشکلی پیش آمده.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
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
            name="main_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عکس دکتر</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field?.value?.filter(
                          (current) => current.url !== url
                        ),
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
              name="open_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ساعت حضور از </FormLabel>
                  <FormControl>
                    <Input type="string" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="close_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ساعت حضور تا </FormLabel>
                  <FormControl>
                    <Input type="string" disabled={loading} {...field} />
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
                    value={field.value}
                    defaultValue={field.value}
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
                        <SelectItem key={special.id} value={`special.id`}>
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

export default DoctorForm
