import { redirect } from 'next/navigation'

// import { getStoreById } from '@/lib/queries/dashboard/store'
import { auth } from '@/auth'
import Navbar from '@/components/dashboard/Navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    redirect('/login')
  }

  return (
    <body>
      <Navbar />

      {children}
    </body>
  )
}
