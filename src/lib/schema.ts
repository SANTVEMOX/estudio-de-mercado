import { z } from "zod";

export const surveySchema = z.object({
  // Demográficos
  edad: z.string().min(1, "Ingresa tu edad"),
  sexo: z.string().min(1, "Selecciona una opción"),
  ocupacion: z.string().min(1, "Ingresa tu ocupación"),
  municipio: z.string().min(1, "Ingresa tu municipio o alcaldía"),

  facultad: z.string().min(1, "Selecciona tu facultad o zona"),
  es_consumidor: z.enum(["true", "false"], {
    message: "Selecciona una opción",
  }),
  
  // Consumidores
  razon_consumo: z.string().optional(),
  da_confianza: z.string().optional(),
  experiencias_negativas: z.string().optional(),
  reporto_autoridad: z.enum(["true", "false", ""]).optional(),
  aspectos_a_mejorar: z.string().optional(),
  
  // No consumidores
  razon_no_consumo: z.string().optional(),
  motivos_escuchados_o_vividos: z.string().optional(),
  caracteristicas_deseadas_bebedero: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.es_consumidor === "true") {
    if (!data.razon_consumo) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["razon_consumo"], message: "Este campo es requerido" });
    }
    if (!data.da_confianza) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["da_confianza"], message: "Por favor, cuéntanos el motivo" });
    }
    if (!data.experiencias_negativas) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["experiencias_negativas"], message: "Por favor, detalla tu respuesta (o escribe 'Ninguna')" });
    }
  } else if (data.es_consumidor === "false") {
    if (!data.razon_no_consumo) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["razon_no_consumo"], message: "Este campo es requerido" });
    }
  }
});

export type SurveyFormValues = z.infer<typeof surveySchema>;