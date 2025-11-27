// New Faaliyet page

import FaaliyetForm from "@/components/FaaliyetForm"

export default function NewFaaliyetPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Activity</h1>
        <p className="text-gray-600 mt-2">
          Create a new faaliyet for TUMED
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">
        <FaaliyetForm />
      </div>
    </div>
  )
}
