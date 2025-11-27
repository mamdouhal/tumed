// Edit News Page
// Edit existing news/announcement

import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HaberForm from "@/components/HaberForm"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EditHaberPage({ params }: PageProps) {
  const { id } = await params

  const haber = await prisma.haber.findUnique({
    where: { id },
  })

  if (!haber) {
    notFound()
  }

  const initialData = {
    title: haber.title,
    content: haber.content,
    category: haber.category,
    imageUrl: haber.imageUrl,
    publishDate: haber.publishDate.toISOString().split("T")[0],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Haber Düzenle</h1>
        <p className="text-gray-600">
          Mevcut haberi güncelleyin.
        </p>
      </div>

      <HaberForm mode="edit" haberId={id} initialData={initialData} />
    </div>
  )
}
