import { prisma } from '@/lib/prisma'

export const getAllSpecializations = async () => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

export const getSpecializationWithId = async ({ id }: { id: string }) => {
  try {
    const specialization = await prisma.specialization.findUnique({
      where: { id },
      include: {
        images: { select: { url: true } },
        doctors: {
          include: { images: { select: { url: true } } },
        },
      },
    })

    return specialization
  } catch (error) {
    console.log(error)
  }
}

export const getAllDoctors = async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        images: { select: { url: true } },
      },
    })
    return doctors
  } catch (error) {
    console.log(error)
  }
}

export const getDoctorById = async ({ id }: { id: string }) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        images: { select: { url: true } },
      },
    })
    return doctor
  } catch (error) {
    console.log(error)
  }
}

export const getAllDoctorsWithReviews = async () => {
  3
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        images: { select: { url: true } },
        reviews: true,
      },
    })
    return doctors
  } catch (error) {
    console.log(error)
  }
}

export const getAllIllnesses = async () => {
  try {
    const illnesses = await prisma.illness.findMany({
      include: {
        images: { select: { url: true } },
      },
    })
    return illnesses
  } catch (error) {
    console.log(error)
  }
}
export const getAllIllnessesWithId = async ({ id }: { id: string }) => {
  try {
    const illness = await prisma.illness.findUnique({
      where: { id },
      include: {
        images: { select: { url: true } },
      },
    })
    return illness
  } catch (error) {
    console.log(error)
  }
}
