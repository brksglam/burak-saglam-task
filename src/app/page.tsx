export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Hoş Geldiniz</span>{' '}
        <span className="block text-indigo-600 xl:inline">Demo Platform</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Bu proje, basit bir eğitim satın alma (Udemy benzeri) ve canlı ders eğitmen eşleştirme (Uber benzeri) akışlarını simüle eder.
      </p>
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow">
          <a
            href="/courses"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Eğitimleri İncele
          </a>
        </div>
        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
          <a
            href="/live-request"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
          >
            Canlı Ders İste
          </a>
        </div>
      </div>
    </div>
  );
}
