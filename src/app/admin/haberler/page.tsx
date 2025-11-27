// Admin Haberler (News) List Page
// Display all news with pagination, edit, and delete

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Haber = {
  id: string
  title: string
  content: string
  category: string
  imageUrl?: string | null
  publishDate: string
  createdAt: string
}

export default function HaberlerPage() {
  const router = useRouter()
  const [haberler, setHaberler] = useState<Haber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchHaberler = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/haberler?page=${page}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch news")
      }

      const data = await response.json()
      setHaberler(data.haberler)
      setTotalPages(Math.ceil(data.total / 10))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHaberler()
  }, [page])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" haberini silmek istediğinize emin misiniz?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/haberler/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete news")
      }

      fetchHaberler()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Haber silinemedi")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Haberler</h1>
        <Link
          href="/admin/haberler/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Yeni Haber Ekle
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {haberler.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">Henüz haber eklenmemiş.</p>
          <Link
            href="/admin/haberler/new"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
          >
            İlk haberi ekleyin →
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {haberler.map((haber) => (
              <div
                key={haber.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {haber.title}
                      </h2>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {haber.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {haber.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📅 {formatDate(haber.publishDate)}</span>
                      {haber.imageUrl && (
                        <span className="text-green-600">🖼️ Görselli</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/admin/haberler/${haber.id}/edit`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(haber.id, haber.title)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Önceki
              </button>

              <span className="px-4 py-2">
                Sayfa {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sonraki
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
