import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background */}
      <div className="absolute inset-4 sm:inset-8 rounded-[25px] overflow-hidden">
        <Image
          src="https://picsum.photos/1920/1080?random=1"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(35,30,30)]/80 to-[rgb(35,30,30)]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-[var(--font-montserrat)] leading-tight">
          Mezunlarımız, <br className="sm:hidden" />
          <span className="text-[rgb(239,105,104)]">Türkiye&apos;nin</span>{" "}
          <br className="hidden sm:block" />
          gönül elçileridir.
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Türkiye Mezunları Derneği olarak, ülkemizde eğitim almış tüm
          uluslararası mezunlarımızı bir araya getiriyor, güçlü bir ağ
          oluşturuyoruz.
        </p>
        <button className="bg-[#ffd800] text-[rgb(35,30,30)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffed4a] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Bende Varım
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-14 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-2 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
