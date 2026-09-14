"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SurveyFormValues, surveySchema } from "@/lib/schema";
import { supabase } from "@/lib/supabase";
import { ConsumerBranch } from "./ConsumerBranch";
import { NonConsumerBranch } from "./NonConsumerBranch";

export default function SurveyForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
  });

  const esConsumidor = watch("es_consumidor");

  useEffect(() => {
    let token = localStorage.getItem("pumagua_session");
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem("pumagua_session", token);
    }
    setSessionToken(token);
  }, []);

  const onSubmit = async (data: SurveyFormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const { error } = await supabase
        .from("pumagua_responses")
        .insert([{ ...data, session_token: sessionToken }]);

      if (error) {
        if (error.code === '23505') { 
          setErrorMsg("Ya hemos registrado una respuesta desde este dispositivo. ¡Gracias por participar!");
        } else {
          setErrorMsg("Hubo un error al guardar tu respuesta. Intenta de nuevo.");
        }
      } else {
        router.push("/gracias");
      }
    } catch (err) {
      setErrorMsg("Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-8 shadow-sm rounded-xl border border-gray-100">
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg font-medium">
          {errorMsg}
        </div>
      )}

      {/* SECCIÓN DEMOGRÁFICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
        <div>
          <label className="block font-medium mb-2 text-gray-800">Edad</label>
          <input type="number" {...register("edad")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" placeholder="Ej. 21" />
          {errors.edad && <p className="text-red-500 text-sm mt-1">{errors.edad.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-800">Sexo</label>
          <select {...register("sexo")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
            <option value="">Selecciona...</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
          </select>
          {errors.sexo && <p className="text-red-500 text-sm mt-1">{errors.sexo.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-800">Ocupación en la UNAM</label>
          <select {...register("ocupacion")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
            <option value="">Selecciona...</option>
            <option value="Estudiante de Licenciatura">Estudiante de Licenciatura</option>
            <option value="Estudiante de Posgrado">Estudiante de Posgrado</option>
            <option value="Académico / Profesor">Académico / Profesor</option>
            <option value="Administrativo / Trabajador">Administrativo / Trabajador</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.ocupacion && <p className="text-red-500 text-sm mt-1">{errors.ocupacion.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-800">Municipio o Alcaldía de residencia</label>
          <input type="text" {...register("municipio")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" placeholder="Ej. Coyoacán, Nezahualcóyotl..." />
          {errors.municipio && <p className="text-red-500 text-sm mt-1">{errors.municipio.message}</p>}
        </div>
      </div>

      {/* FACULTAD */}
      <div>
        <label className="block font-medium mb-2 text-gray-800">¿En qué facultad o zona de la universidad sueles moverte?</label>
        <select {...register("facultad")} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900">
          <option value="">Selecciona tu zona...</option>
          <option value="Escuela Nacional de Artes Cinematográficas (ENAC)">Escuela Nacional de Artes Cinematográficas (ENAC)</option>
          <option value="Escuela Nacional de Ciencias de la Tierra (ENCiT)">Escuela Nacional de Ciencias de la Tierra (ENCiT)</option>
          <option value="Escuela Nacional de Estudios Superiores (ENES) Juriquilla">Escuela Nacional de Estudios Superiores (ENES) Juriquilla</option>
          <option value="Escuela Nacional de Estudios Superiores (ENES) León">Escuela Nacional de Estudios Superiores (ENES) León</option>
          <option value="Escuela Nacional de Estudios Superiores (ENES) Mérida">Escuela Nacional de Estudios Superiores (ENES) Mérida</option>
          <option value="Escuela Nacional de Estudios Superiores (ENES) Morelia">Escuela Nacional de Estudios Superiores (ENES) Morelia</option>
          <option value="Escuela Nacional de Lenguas, Lingüística y Traducción (ENALLT)">Escuela Nacional de Lenguas, Lingüística y Traducción (ENALLT)</option>
          <option value="Escuela Nacional de Trabajo Social (ENTS)">Escuela Nacional de Trabajo Social (ENTS)</option>
          <option value="Facultad de Arquitectura">Facultad de Arquitectura</option>
          <option value="Facultad de Artes y Diseño (FAD)">Facultad de Artes y Diseño (FAD)</option>
          <option value="Facultad de Ciencias">Facultad de Ciencias</option>
          <option value="Facultad de Ciencias Políticas y Sociales (FCPyS)">Facultad de Ciencias Políticas y Sociales (FCPyS)</option>
          <option value="Facultad de Contaduría y Administración (FCA)">Facultad de Contaduría y Administración (FCA)</option>
          <option value="Facultad de Derecho">Facultad de Derecho</option>
          <option value="Facultad de Economía">Facultad de Economía</option>
          <option value="Facultad de Enfermería y Obstetricia (FENO)">Facultad de Enfermería y Obstetricia (FENO)</option>
          <option value="Facultad de Estudios Superiores (FES) Acatlán">Facultad de Estudios Superiores (FES) Acatlán</option>
          <option value="Facultad de Estudios Superiores (FES) Aragón">Facultad de Estudios Superiores (FES) Aragón</option>
          <option value="Facultad de Estudios Superiores (FES) Cuautitlán">Facultad de Estudios Superiores (FES) Cuautitlán</option>
          <option value="Facultad de Estudios Superiores (FES) Iztacala">Facultad de Estudios Superiores (FES) Iztacala</option>
          <option value="Facultad de Estudios Superiores (FES) Zaragoza">Facultad de Estudios Superiores (FES) Zaragoza</option>
          <option value="Facultad de Filosofía y Letras (FFyL)">Facultad de Filosofía y Letras (FFyL)</option>
          <option value="Facultad de Ingeniería (FI)">Facultad de Ingeniería (FI)</option>
          <option value="Facultad de Medicina">Facultad de Medicina</option>
          <option value="Facultad de Medicina Veterinaria y Zootecnia (FMVZ)">Facultad de Medicina Veterinaria y Zootecnia (FMVZ)</option>
          <option value="Facultad de Música (FaM)">Facultad de Música (FaM)</option>
          <option value="Facultad de Odontología">Facultad de Odontología</option>
          <option value="Facultad de Psicología">Facultad de Psicología</option>
          <option value="Facultad de Química">Facultad de Química</option>
          <option value="Instituto de Investigaciones en Matemáticas Aplicadas y en Sistemas (IIMAS)">Instituto de Investigaciones en Matemáticas Aplicadas y en Sistemas (IIMAS)</option>
          <option value="Otra zona">Otra zona</option>
        </select>
        {errors.facultad && <p className="text-red-500 text-sm mt-1">{errors.facultad.message}</p>}
      </div>

      {/* CONSUMIDOR BOOLEAN */}
      <div>
        <label className="block font-medium mb-4 text-gray-800">¿Consumes agua de los bebederos Pumagua?</label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`block border p-4 rounded-xl cursor-pointer text-center font-medium transition-all ${watch("es_consumidor") === "true" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200"}`}>
            <input type="radio" value="true" {...register("es_consumidor")} className="hidden" />
            Sí, las uso
          </label>
          <label className={`block border p-4 rounded-xl cursor-pointer text-center font-medium transition-all ${watch("es_consumidor") === "false" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200"}`}>
            <input type="radio" value="false" {...register("es_consumidor")} className="hidden" />
            No las uso
          </label>
        </div>
        {errors.es_consumidor && <p className="text-red-500 text-sm mt-1">{errors.es_consumidor.message}</p>}
      </div>

      {esConsumidor === "true" && <ConsumerBranch register={register} errors={errors} />}
      {esConsumidor === "false" && <NonConsumerBranch register={register} errors={errors} />}

      <button type="submit" disabled={isSubmitting} className="w-full bg-blue-900 text-white font-semibold p-4 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
        {isSubmitting ? "Enviando respuesta..." : "Enviar Encuesta"}
      </button>
    </form>
  );
}