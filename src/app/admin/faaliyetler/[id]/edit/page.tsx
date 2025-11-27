// Edit Faaliyet page

import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import FaaliyetForm from "@/components/FaaliyetForm"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EditFaaliyetPage({ params }: PageProps) {
  const { id } = await params

  const faaliyet = await prisma.faaliyet.findUnique({
    where: { id },
  })

  if (!faaliyet) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Activity</h1>
        <p className="text-gray-600 mt-2">
          Update activity information
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">
        <FaaliyetForm
          initialData={{
            id: faaliyet.id,
            title: faaliyet.title,
            description: faaliyet.description,
            category: faaliyet.category,
            imageUrl: faaliyet.imageUrl,
          }}
          isEdit={true}
        />
      </div>
    </div>
  )
}
