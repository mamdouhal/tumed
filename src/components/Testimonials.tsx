import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      country: "Suudi Arabistan",
      university: "İstanbul Üniversitesi",
      year: "2018",
      quote:
        "Türkiye'de geçirdiğim yıllar hayatımın en değerli deneyimlerinden biriydi. TUMED sayesinde bu bağımızı sürdürebiliyoruz.",
      avatar: "https://picsum.photos/150/150?random=10",
    },
    {
      id: 2,
      name: "Maria Gonzalez",
      country: "Kolombiya",
      university: "Ankara Üniversitesi",
      year: "2019",
      quote:
        "TUMED ailesinin bir parçası olmaktan gurur duyuyorum. Farklı kültürlerden insanlarla kurduğumuz dostluklar paha biçilemez.",
      avatar: "https://picsum.photos/150/150?random=11",
    },
    {
      id: 3,
      name: "Oluwaseun Adeyemi",
      country: "Nijerya",
      university: "ODTÜ",
      year: "2020",
      quote:
        "Türkiye'de aldığım eğitim kariyerime yön verdi. Şimdi ülkemde öğrendiklerimi uyguluyorum ve başarıyoruz.",
      avatar: "https://picsum.photos/150/150?random=12",
    },
    {
      id: 4,
      name: "Fatima Hassan",
      country: "Mısır",
      university: "Boğaziçi Üniversitesi",
      year: "2017",
      quote:
        "TUMED'in organizasyonları sayesinde Türkiye ile bağımız hiç kopmuyor. Bu çok özel bir duygu.",
      avatar: "https://picsum.photos/150/150?random=13",
    },
  ];

  return (
    <section id="mezunlar" className="py-20 bg-[rgb(243,243,243)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[rgb(184,10,52)] font-medium text-sm uppercase tracking-wider">
            Geri bildirimler
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(35,30,30)] mt-2 font-[var(--font-montserrat)]">
            Mezunlarımızdan
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[rgb(184,10,52)]/20">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Quote */}
                  <div className="relative">
                    <svg
                      className="absolute -top-2 -left-2 w-8 h-8 text-[rgb(184,10,52)]/20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1 0.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1 0.9-2 2-2V8z" />
                    </svg>
                    <p className="text-gray-600 leading-relaxed pl-6">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-[rgb(35,30,30)] font-[var(--font-montserrat)]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.country} • {testimonial.university},{" "}
                      {testimonial.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
