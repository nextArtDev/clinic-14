import { FC } from 'react'
import fullStar from '../public/icons/full-star.png'
import halfStar from '../public/icons/half-star.png'
import emptyStar from '../public/icons/empty-star.png'
import Image from 'next/image'
import { Review } from '@prisma/client'
import { calculateReviewRatingAverage } from '@/lib/utils/calculateReviewRatingAverage'

interface StarsProps {
  reviews: Review[]
  rating?: number
}

const Stars: FC<StarsProps> = ({ reviews, rating }) => {
  const reviewRating = rating || calculateReviewRatingAverage(reviews)

  const renderStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1))
      if (difference >= 1) stars.push(fullStar)
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar)
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar)
        else stars.push(fullStar)
      } else stars.push(emptyStar)
    }
    return stars.map((star, i) => {
      return (
        <Image
          width={16}
          height={16}
          src={star}
          className="w-4 h-4 mr-1"
          key={i}
          alt={''}
        />
      )
    })
  }

  return (
    <div dir="ltr" className="flex items-center ">
      {renderStars()}
    </div>
  )
}

export default Stars
