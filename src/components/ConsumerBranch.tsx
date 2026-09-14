import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SurveyFormValues } from "@/lib/schema";

interface Props {
  register: UseFormRegister<SurveyFormValues>;
  errors: FieldErrors<SurveyFormValues>;
}

export function ConsumerBranch({ register, errors }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <label className="block font-medium mb-2 text-gray-800">¿Por qué consumes Pumagua?</label>
        <textarea {...register("razon_consumo")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" rows={2} />
        {errors.razon_consumo && <p className="text-red-500 text-sm mt-1">{errors.razon_consumo.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-800">¿Te da confianza consumirla? ¿Por qué?</label>
        <textarea {...register("da_confianza")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" rows={2} placeholder="Sí/No, porque..." />
        {errors.da_confianza && <p className="text-red-500 text-sm mt-1">{errors.da_confianza.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-800">¿Has vivido experiencias negativas al consumir Pumagua? ¿Cuáles?</label>
        <textarea {...register("experiencias_negativas")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" rows={2} placeholder="Si no has tenido ninguna, escribe 'Ninguna'." />
        {errors.experiencias_negativas && <p className="text-red-500 text-sm mt-1">{errors.experiencias_negativas.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-800">En caso de haber tenido una experiencia negativa, ¿acudiste con alguna autoridad para comentarle la situación?</label>
        <select {...register("reporto_autoridad")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
          <option value="">Selecciona...</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-800">¿Cuáles son los aspectos que consideras se deben mejorar del servicio?</label>
        <textarea {...register("aspectos_a_mejorar")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" rows={3} />
      </div>
    </div>
  );
}