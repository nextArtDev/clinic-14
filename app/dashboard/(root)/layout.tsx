import Navbar from '@/components/dashboard/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body>
      <Navbar />

      {children}
    </body>
  )
}
