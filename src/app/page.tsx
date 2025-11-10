export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Studio Nexora
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Fotos profesionales con IA
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
          Crear Mi Sesión 🚀
        </button>
      </div>
    </div>
  );
}
