'use client'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import style from '../Doctor/DoctorsCarousel.module.css'

import AutoScroll from 'embla-carousel-auto-scroll'

import IllnessShowCard from './IllnessShowCard'

type PropType = {
  slides: any
  options?: EmblaOptionsType
}

const IllnessCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({}),
  ])
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  //   const {
  //     prevBtnDisabled,
  //     nextBtnDisabled,
  //     onPrevButtonClick,
  //     onNextButtonClick,
  //   } = usePrevNextButtons(emblaApi)

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll
      if (!autoScroll) return

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop

      resetOrStop()
      callback()
    },
    [emblaApi]
  )
  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div dir="ltr" className={`${style.embla} cursor-grab`}>
      <div className={`${style.embla__controls}`}>
        {/* <div className={`${style.embla__buttons}`}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}
        <h2 className="text-2xl text-center font-bold text-pretty text-primary">
          {' '}
          بیماری‌ها
        </h2>
        <div className={`${style.embla__progress} grainy mb-6 `}>
          <div
            className={`${style.embla__progress__bar} !gradient-base `}
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
      <div className={`${style.embla__viewport}`} ref={emblaRef}>
        <div className={`${style.embla__container}`}>
          {slides?.map((illness: any) => (
            <div className={`${style.embla__slide}`} key={illness.id}>
              <div className={`${style.embla__slide__number}`}>
                {/* <IllnessCard illness={illness} /> */}
                <IllnessShowCard illness={illness} isVertical={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IllnessCarousel
