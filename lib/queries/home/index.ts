import { prisma } from '@/lib/prisma'

export interface GetSpecializationParams {
  page?: number
  pageSize?: number
  searchQuery?: string
}

export const getAllSpecializations = async (
  params: GetSpecializationParams
) => {
  const { searchQuery, page = 1, pageSize = 10 } = params

  const skipAmount = (page - 1) * pageSize
  const query: any = {} // This will be used to build the Prisma query

  if (searchQuery) {
    query.OR = [
      { name: { contains: searchQuery } },
      { description: { contains: searchQuery } },
    ]
  }

  try {
    const specializations = await prisma.specialization.findMany({
      where: query,
      include: {
        images: { select: { url: true } },
        doctors: {
          include: { images: { select: { url: true } } },
        },
      },
      skip: skipAmount,
      take: pageSize,
    })
    const totalSpecializations = await prisma.specialization.count({
      where: query,
    })

    // Calculate if there are more questions to be fetched
    const isNext = totalSpecializations > skipAmount + specializations.length
    return { specializations, isNext }
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

export interface GetDoctorParams {
  page?: number
  pageSize?: number
  searchQuery?: string
}

export const getAllDoctors = async (params: GetDoctorParams) => {
  try {
    const { searchQuery, page = 1, pageSize = 10 } = params

    const skipAmount = (page - 1) * pageSize
    const query: any = {}

    if (searchQuery) {
      query.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ]
    }

    const doctors = await prisma.doctor.findMany({
      where: query,
      include: {
        images: { select: { url: true } },
      },
      skip: skipAmount,
      take: pageSize,
    })

    const totalDoctors = await prisma.doctor.count({ where: query })

    // Calculate if there are more questions to be fetched
    const isNext = totalDoctors > skipAmount + doctors.length

    return { doctors, isNext }
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

export interface GetIllnessParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  filter?: string
}
export const getAllIllnesses = async (params: GetIllnessParams) => {
  try {
    const { searchQuery, page = 1, pageSize = 10 } = params
    const skipAmount = (page - 1) * pageSize
    const query: any = {} // This will be used to build the Prisma query

    if (searchQuery) {
      query.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ]
    }

    const illnesses = await prisma.illness.findMany({
      where: query,
      include: {
        images: { select: { url: true } },
      },
      skip: skipAmount,
      take: pageSize,
    })
    // Fetch the total count of questions for pagination
    const totalIllnesses = await prisma.illness.count({ where: query })

    // Calculate if there are more Illnesses to be fetched
    const isNext = totalIllnesses > skipAmount + illnesses.length

    return { illnesses, isNext }
  } catch (error) {
    console.log(error)
  }
}
export const getIllnessesWithId = async ({ id }: { id: string }) => {
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
