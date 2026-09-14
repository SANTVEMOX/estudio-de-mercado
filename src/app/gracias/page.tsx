import Link from "next/link";

export default function GraciasPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias por participar!</h1>
        <p className="text-gray-600 mb-8">
          Tus respuestas han sido registradas exitosamente. Apreciamos mucho tu tiempo.
        </p>
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}