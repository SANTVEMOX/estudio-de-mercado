import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SurveyFormValues } from "@/lib/schema";

interface Props {
  register: UseFormRegister<SurveyFormValues>;
  errors: FieldErrors<SurveyFormValues>;
}

export function NonConsumerBranch({ register, errors }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <label className="block font-medium mb-2 text-gray-800">¿Por qué no consumes Pumagua?</label>
        <textarea {...register("razon_no_consumo")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" rows={3} />
        {errors.razon_no_consumo && <p className="text-red-500 text-sm mt-1">{errors.razon_no_consumo.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-800">¿Qué motivos o experiencias has escuchado o vivido para no consumir el servicio?</label>
        <textarea {...register("motivos_escuchados_o_vividos")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" rows={3} />
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-800">¿Qué características debería tener un bebedero para que decidieras reemplazar tu método de obtención de agua?</label>
        <textarea {...register("caracteristicas_deseadas_bebedero")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" rows={3} />
      </div>
    </div>
  );
}