// New News Page
// Create new news/announcement

import HaberForm from "@/components/HaberForm"

export default function NewHaberPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Yeni Haber Ekle</h1>
        <p className="text-gray-600">
          Sitenin haberler bölümünde yayınlanacak yeni bir haber oluşturun.
        </p>
      </div>

      <HaberForm mode="create" />
    </div>
  )
}
