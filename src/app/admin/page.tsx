// Admin dashboard home page

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const session = await auth()

  // Get statistics
  const totalFaaliyetler = await prisma.faaliyet.count()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Faaliyetler
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {totalFaaliyetler}
              </p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Admin Role
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {session?.user?.role}
              </p>
            </div>
            <div className="text-4xl">👤</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                System Status
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                Active
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/faaliyetler"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition border border-blue-200"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-medium text-gray-900">Manage Faaliyetler</p>
              <p className="text-sm text-gray-600">View and edit activities</p>
            </div>
          </a>

          <a
            href="/admin/faaliyetler/new"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition border border-green-200"
          >
            <span className="text-2xl">➕</span>
            <div>
              <p className="font-medium text-gray-900">Add New Activity</p>
              <p className="text-sm text-gray-600">Create a new faaliyet</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
