'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctor, Illness, Image, Prisma, Specialization } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { number, z } from 'zod'
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
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ImageUpload from '@/app/dashboard/doctors/components/ImageUpload'
import { AlertModal } from '@/app/dashboard/doctors/[doctorId]/components/AlertModal'

const formSchema = z.object({
  name: z.string().min(1, { message: 'این قسمت نمی‌تواند خالی باشد' }),
  description: z.string(),
  // open_time: z.string().optional(),
  // close_time: z.string().optional(),
  //   main_image: z
  //     .string()
  //     .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
  //     .url()
  //     .optional(),
  images: z.object({ url: z.string() }).array(),
  // .array()  satisfies Prisma.ImagesUncheckedCreateNestedManyWithoutDoctorInput,
  // booking: z.object({ booking_time: z.date() }).array().optional(),
  //Because we're working with Decimal, we should add "coerce"
  // illnessId: z.coerce
  //   .number()
  //   .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
  //   .optional(),
  doctorId: z.coerce
    .number()
    .min(1, { message: 'این قسمت نمی‌تواند خالی باشد' })
    .optional(),
}) satisfies z.Schema<Prisma.SpecializationUncheckedCreateInput>

type SpecializationFormValues = z.infer<typeof formSchema>

interface SpecializationFormProps {
  initialData:
    | (Specialization & {
        images: Image[]
      })
    | null
  // illness: Illness[]
  doctor: Doctor[]
}

const SpecializationForm: FC<SpecializationFormProps> = ({
  initialData,
  // illness,
  doctor,
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  // console.log(specialization)

  const title = initialData ? 'ویرایش ' : 'ایجاد تخصص جدید'
  const description = initialData
    ? 'ویرایش اطلاعات تخصص'
    : 'اضافه کردن تخصص جدید'
  const toastMessage = initialData ? 'اطلاعات تخصص آپدیت شد.' : 'تخصص ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'

  const defaultValues = initialData
    ? {
        ...initialData,
        name: initialData.name!,
        description: initialData?.description!,
        // illnessId: initialData?.illness_id,
        doctorId: parseFloat(String(initialData?.doctorId)),
      }
    : {
        name: '',
        description: '',
        images: [],
        // illnessId: 0,
        doctorId: 0,
      }

  const form = useForm<SpecializationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: SpecializationFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/specializations/${params.specializationId}`,
          data
        )
      } else {
        console.log(data)
        await axios.post(`/api/specializations`, data)
      }
      router.refresh()
      router.push(`/dashboard/specialization`)
      toast({ title: toastMessage, variant: 'default' })
    } catch (error: any) {
      toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }
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
                  <FormLabel>نام تخصص </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="نام تخصص"
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
                  <FormLabel>توضیحات تخصص</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="توضیحات تخصص"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="illnessId"
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
            /> */}
            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> دکتر معالج </FormLabel>
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
                          placeholder="انتخاب دکتر معالج"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctor.map((special) => (
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

export default SpecializationForm
