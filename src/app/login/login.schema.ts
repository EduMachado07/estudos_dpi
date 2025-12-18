import { z } from "zod";

export const SchemaLoginUser = z.object({
    email: z.string().min(1, {message: "Informe o seu email"}).email({message: "Endereço de email inválido"}),
    password: z.string().min(6, {message: "Senha deve ter no mínimo 6 caracteres"})
})

export type SchemaLoginUserType = z.infer<typeof SchemaLoginUser>