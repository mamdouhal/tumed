import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function News() {
  // Fetch real news from database
  let newsItems;
  
  try {
    newsItems = await prisma.haber.findMany({
      orderBy: {
        publishDate: "desc",
      },
      take: 3,
    });
  } catch (error) {
    console.error("Failed to fetch news:", error);
    newsItems = [];
  }

  // Fallback to placeholders if no news exist
  if (newsItems.length === 0) {
    newsItems = [
      {
        id: "1",
        category: "Etkinlik",
        title: "2024 Mezunlar Buluşması Başarıyla Gerçekleştirildi",
        content:
          "Dünya genelinden 500'den fazla mezunumuzun katılımıyla gerçekleştirilen buluşmamızda...",
        imageUrl: "https://picsum.photos/600/400?random=6",
        publishDate: new Date("2024-11-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        category: "Duyuru",
        title: "Yeni İşbirliği Anlaşması İmzalandı",
        content:
          "Türkiye'nin önde gelen üniversiteleriyle yeni işbirliği protokolleri imzalandı...",
        imageUrl: "https://picsum.photos/600/400?random=7",
        publishDate: new Date("2024-11-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        category: "Haber",
        title: "Mezunlarımızdan Başarı Hikayeleri",
        content:
          "Farklı ülkelerden mezunlarımızın ilham verici başarı hikayelerini sizlerle paylaşıyoruz...",
        imageUrl: "https://picsum.photos/600/400?random=8",
        publishDate: new Date("2024-11-05"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get first 150 characters of content as excerpt
  const getExcerpt = (content: string) => {
    return content.length > 150 ? content.substring(0, 150) + "..." : content;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Etkinlik":
        return "bg-[rgb(184,10,52)]";
      case "Duyuru":
        return "bg-[rgb(13,79,140)]";
      case "Haber":
        return "bg-[rgb(239,105,104)]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <section id="haberler" className="py-20 bg-[rgb(243,243,243)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(35,30,30)] font-[var(--font-montserrat)]">
            Haberler / Duyurular
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.imageUrl || "https://picsum.photos/600/400?random=6"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <span
                  className={`absolute top-4 left-4 ${getCategoryColor(
                    item.category
                  )} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-sm text-gray-500">{formatDate(item.publishDate)}</span>
                <h3 className="text-lg font-bold text-[rgb(35,30,30)] mt-2 mb-3 font-[var(--font-montserrat)] line-clamp-2 group-hover:text-[rgb(184,10,52)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {getExcerpt(item.content)}
                </p>
                <button className="flex items-center gap-2 text-[rgb(184,10,52)] font-medium text-sm hover:text-[rgb(239,105,104)] transition-colors">
                  Devamını Oku
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-[rgb(184,10,52)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[rgb(239,105,104)] transition-colors inline-flex items-center gap-2">
            Tüm Haberleri Gör
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    </section>
  );
}
