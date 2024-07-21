import { prisma } from '@/lib/prisma'

export const getAllSpecializations = async () => {
  const specializations = await prisma.specialization.findMany({
    include: {
      images: { select: { url: true } },
      doctors: {
        include: { images: { select: { url: true } } },
      },
    },
  })
  if (specializations.length === 0) return
  return specializations
}
