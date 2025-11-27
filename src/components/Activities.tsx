import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Activities() {
  // Fetch real activities from database
  const faaliyetler = await prisma.faaliyet.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  // Use fetched activities or fallback to placeholder
  const activities = faaliyetler.length > 0 ? faaliyetler.map((f, idx) => ({
    id: f.id,
    title: f.title,
    description: f.description,
    category: f.category,
    image: f.imageUrl || "https://picsum.photos/800/600?random=" + idx,
    large: idx % 3 === 0,
  })) : [
    {
      id: "1",
      title: "Kurumsal Ziyaretler",
      description: "Kurumsal ziyaretler ve işbirlikleri",
      category: "Kurumsal",
      image: "https://picsum.photos/800/600?random=2",
      large: true,
    },
    {
      id: "2",
      title: "Akademik İşbirlikleri",
      description: "Üniversiteler arası işbirliği",
      category: "Akademik",
      image: "https://picsum.photos/600/600?random=3",
      large: false,
    },
    {
      id: "3",
      title: "Kültürel Etkinlikler",
      description: "Kültürel ve sosyal etkinlikler",
      category: "Kültürel",
      image: "https://picsum.photos/600/600?random=4",
      large: false,
    },
  ];

  return (
    <section id="faaliyetler" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[rgb(184,10,52)] font-medium text-sm uppercase tracking-wider">
            Faaliyetler
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(35,30,30)] mt-2 font-[var(--font-montserrat)]">
            Kurumsal Ziyaretler
          </h2>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                activity.large && index === 0
                  ? "lg:col-span-2 lg:row-span-2"
                  : activity.large
                  ? "lg:col-span-2"
                  : ""
              }`}
              style={{ minHeight: activity.large ? "400px" : "300px" }}
            >
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(35,30,30)] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-xl sm:text-2xl font-[var(--font-montserrat)] group-hover:text-[rgb(239,105,104)] transition-colors">
                  {activity.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Daha fazla</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
