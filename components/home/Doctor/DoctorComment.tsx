'use client'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FC, startTransition, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// import { useMutation } from '@tanstack/react-query'
// import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { StarRating } from '../StarRating'
import { Heart } from 'lucide-react'
import { createReviewSchema } from '@/lib/schemas/rating'
import { Doctor, Review, User } from '@prisma/client'
import { createReview } from '@/lib/actions/home/rating'
import { toast } from 'sonner'

interface DoctorCommentProps {
  doctor: Doctor & { reviews: Review[] | null }

  user: (User & { image: { url: string } | null }) | null
}
const DoctorComment: FC<DoctorCommentProps> = ({ doctor, user }) => {
  const router = useRouter()
  const path = usePathname()
  const { loginToast } = useCustomToasts()

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsMounted(true)
  //   }
  // }, [])

  //inferring type of schema
  // we can destructure it too: const {register, handleSubmit, formState: { errors }}
  const form = useForm<z.infer<typeof createReviewSchema>>({
    //enforcing post validator client side
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      comment: '',
      rating: 5,
    },
  })

  // const { mutate: createPost } = useMutation({
  //   mutationFn: async ({ comment, doctorId }: z.infer<typeof FormSchema>) => {
  //     const payload: z.infer<typeof FormSchema> = { comment, doctorId }
  //     const { data } = await axios.post('/api/doctors/post/create', payload)
  //     return data
  //   },
  //   onError: (err) => {
  //     if (err instanceof AxiosError) {
  //       if (err.response?.status === 401) {
  //         return loginToast()
  //       }
  //     }
  //     return toast({
  //       title: 'مشکلی پیش آمده.',
  //       description: 'لطفا بعدا امتحان کنید.',
  //       variant: 'destructive',
  //     })
  //   },
  //   onSuccess: () => {
  //     // turn pathname /r/mycommunity/submit into /r/mycommunity
  //     // const newPathname = pathname.split('/').slice(0, -1).join('/')
  //     router.push(`${pathname}`)

  //     router.refresh()

  //     return toast({
  //       title: 'دیدگاه شما منتشر شد.',
  //       description: 'از شما متشکریم که نظر خود را با ما در میان گذاشتید.',
  //       variant: 'default',
  //     })
  //   },
  // })
  async function onSubmit(data: z.infer<typeof createReviewSchema>) {
    const formData = new FormData()

    formData.append('comment', data.comment)
    formData.append('rating', String(data.rating))
    try {
      startTransition(() => {
        createReview(formData, path, user?.id as string, doctor.id as string)
          .then((res) => {
            if (res?.errors?.comment) {
              form.setError('comment', {
                type: 'custom',
                message: res?.errors.comment?.join(' و '),
              })
            } else if (res?.errors?.rating) {
              form.setError('rating', {
                type: 'custom',
                message: res?.errors.rating?.join(' و '),
              })
            } else if (res?.errors?._form) {
              toast.error(res?.errors._form?.join(' و '))
              form.setError('root', {
                type: 'custom',
                message: res?.errors?._form?.join(' و '),
              })
            }
            // if (res?.success) {
            //    toast.success(toastMessage)
            // }
          })
          .catch(() => toast.error('مشکلی پیش آمده.'))
      })
    } catch (error) {}
  }

  return (
    <article className="flex flex-col items-center justify-center ">
      <Dialog>
        <DialogTrigger asChild className="">
          <Button className="grainy fixed  left-[50%] -translate-x-1/2 bottom-8  w-[50%] max-w-xl p-8 mb-8 shadow-2xl z-50 ">
            ثبت نظر
          </Button>
        </DialogTrigger>
        <DialogContent className="grainy max-w-[95%] rounded-xl ">
          <DialogHeader className="flex items-center justify-center space-y-4">
            <DialogTitle className=" ">ثبت نظر </DialogTitle>
            <DialogDescription className="text-black/50">
              نظر یا پیشنهاد خود راجع به دکتر {doctor.name} را بنویسد.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-12 text-center text-black/80 "
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="mx-auto">
                    <FormControl className="h-36">
                      {/* <Textarea
                        placeholder="درج دیدگاه..."
                        className="resize-none"
                        {...field}
                      /> */}
                      <TextareaAutosize
                        placeholder="درج دیدگاه..."
                        className="w-full md:w-[70%] text-blue-950 resize-none appearance-none overflow-hidden bg-white/70 p-2 border rounded-lg text-xl font-bold focus:outline-none"
                        {...field}
                        // {...rest}
                      />
                    </FormControl>
                    <FormDescription className="text-black/60">
                      دیدگاه شما در صفحه عمومی دکتر نمایش داده خواهد شد.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="w-full mx-auto">
                    <FormControl className=" ">
                      <StarRating
                        value={field.value}
                        setValue={(d) => field.onChange(d)}
                        icon={Heart}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogTrigger asChild className="">
                <Button
                  type="submit"
                  variant="default"
                  className=" w-full md:w-[50%] text-yellow-600 "
                >
                  ارسال
                </Button>
              </DialogTrigger>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </article>
  )
}

export default DoctorComment

// <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 gap-4">
//   {doctor.illnessId.map((illId) => {
//     return illness.map((ill) => {
//       if (illId === ill.id) {
//         return (
//           <p key={ill.id} className="pr-8 font-farsi text-white">
//             {ill.name}
//           </p>
//         )
//       }
//     })
//   })}
// </div>
