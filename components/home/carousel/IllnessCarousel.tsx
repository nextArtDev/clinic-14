'use client'

import Image from 'next/image'
// https://mixcn-ui.vercel.app/docs/custom/carousel
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from './EmbolaCarousel'

const CarouselOrientation = ({ urls }: { urls: string[] | [] }) => {
  return (
    <Carousel dir="ltr">
      <CarouselNext className="top-1/3 -translate-y-1/3" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="h-60">
        {urls.map((url, index) => (
          <SliderMainItem key={index} className="bg-transparent">
            <div
              className="relative outline outline-1 outline-border size-full flex items-center justify-center
            rounded-xl bg-background overflow-hidden"
            >
              <Image
                src={url}
                fill
                alt="disease"
                className="object-cover gradient-base"
              />
            </div>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {urls.map((url, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <div
              className="relative outline outline-1 outline-border size-full flex items-center
            justify-center rounded-xl bg-background overflow-hidden"
            >
              {/* Slide {index + 1} */}
              <Image
                src={url}
                fill
                alt="disease"
                className="object-cover gradient-base"
              />
            </div>{' '}
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  )
}

export default CarouselOrientation
