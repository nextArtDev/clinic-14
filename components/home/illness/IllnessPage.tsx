import { Illness } from '@prisma/client'
import React from 'react'

type Props = {
  illness: Illness & { images: { url: string | null }[] }
}

function IllnessPage({ illness }: Props) {
  const illnessImages = illness?.images.map((image) => image?.url)

  return (
    <div>
      <div key={illness.id} className="  px-4 py-10 sm:px-6 lg:px-8  ">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
          {/* <Image
                  src={ill.imageUrl[0]}
                  width={250}
                  height={250}
                  alt={ill.name}
                  className="mx-auto"
                /> */}

          {/* <Gallery images={illnessImages} /> */}
          <div className="mt-10 flex-col items-center justify-center  px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="font-semibold pb-4 lg:text-lg text-blue-950 ">
              {illness.name}{' '}
            </div>
            <div className="text-black/60 lg:text-lg ">
              {' '}
              {illness.description}{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IllnessPage
