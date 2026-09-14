import SurveyForm from "@/components/SurveyForm";

export default function EncuestaPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Encuesta de Consumo</h1>
        <p className="text-gray-500 mt-2">Por favor, responde con honestidad a las siguientes preguntas.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <SurveyForm />
      </div>
    </main>
  );
}