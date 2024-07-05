import { redirect } from 'next/navigation'

// import { getStoreById } from '@/lib/queries/dashboard/store'
import { auth } from '@/auth'
import Navbar from '@/components/dashboard/Navbar'

import { ModalProvider } from '@/providers/modal-provider'

// import Navbar from '@/components/navbar'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    redirect('/login')
  }

  return (
    <section>
      <Navbar />
      {/* <ModalProvider /> */}
      {children}
    </section>
  )
}
