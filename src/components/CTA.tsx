export default function CTA() {
  return (
    <section className="py-20 bg-[#ffd800]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(35,30,30)] font-[var(--font-montserrat)]">
              Projeniz mi var?
            </h2>
            <p className="text-lg text-[rgb(35,30,30)]/80 mt-4 max-w-xl">
              Birlikte çalışabileceğimiz projeleriniz için bizimle iletişime
              geçin. Sizinle işbirliği yapmaktan memnuniyet duyarız.
            </p>
          </div>

          {/* Button */}
          <button className="bg-[rgb(35,30,30)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[rgb(184,10,52)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap">
            Hemen iletişime geçiniz
          </button>
        </div>
      </div>
    </section>
  );
}
