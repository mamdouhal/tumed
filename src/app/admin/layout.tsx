// Admin layout with sidebar navigation

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Double-check authentication
  if (!session?.user || session.user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
