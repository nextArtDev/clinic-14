'use client'
import { FC } from 'react'

import { Separator } from '@/components/ui/separator'

import { Review, User } from '@prisma/client'

import { Dot, Heart } from 'lucide-react'

import { formatTimeToNow } from '@/lib/utils/date-utils'
import { ReviewsWithUserAndImage } from '@/lib/queries/home'
import { StarRating } from '../StarRating'
import TestimonialCarousel from '../Testemonial'
interface DoctorReviewsProps {
  reviews: ReviewsWithUserAndImage[] | null
}

const DoctorReviews: FC<DoctorReviewsProps> = ({ reviews }) => {
  const testimonials = reviews?.map((review) => {
    return {
      text: review.comment,
      author: review.user!.name!,
      rating: review.rating,
      created_time: review.created_at,
    }
  })
  if (!testimonials?.length) return <div></div>
  return (
    <section className="pb-36 ">
      <h2 className=" py-8  text-xl font-semibold">نظرات</h2>
      <section className="flex flex-col gap-4 justify-center items-center col-span-2">
        {testimonials?.length > 0 ? (
          <TestimonialCarousel testimonials={testimonials} />
        ) : null}
      </section>
    </section>
  )
}

export default DoctorReviews
