export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Animated gradient orbs in background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="relative text-center animate-slide-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight font-extrabold">
            <span className="block text-white mb-2">Hoş Geldiniz</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Premium Platform
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
            Modern bir eğitim platformu. Udemy tarzında{' '}
            <span className="text-purple-400 font-semibold">kurs satın alma</span> ve
            Uber tarzında{' '}
            <span className="text-pink-400 font-semibold">canlı ders eşleştirme</span> sistemleri.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/courses"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                📚 Eğitimleri İncele
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </a>

            <a
              href="/live-request"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-purple-400/50 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              🎯 Canlı Ders İste
            </a>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-2">Modern Teknoloji</h3>
              <p className="text-gray-400 text-sm">Next.js 16, TypeScript ve Tailwind CSS ile geliştirildi</p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="text-lg font-semibold text-white mb-2">Ödeme Simülasyonu</h3>
              <p className="text-gray-400 text-sm">Gerçekçi ödeme akışı ve hata senaryoları</p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">Akıllı Eşleştirme</h3>
              <p className="text-gray-400 text-sm">Otomatik eğitmen-öğrenci eşleştirme sistemi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
