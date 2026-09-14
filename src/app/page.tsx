import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bnpmg-gray-50 text-center">
      <div className="max-w-2xl bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-extrabold text-[#002B5C] mb-4">Pumagua</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Queremos conocer tu opinión sobre el servicio de bebederos de agua en la universidad. Tu respuesta es completamente anónima y los datos nos ayudarán a proponer mejoras reales.
        </p>
        <Link href="/encuesta" className="inline-block bg-[#D4AF37] text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-[#b5952f] transition-colors shadow-sm">
          Comenzar Encuesta
        </Link>
      </div>
    </main>
  );
}