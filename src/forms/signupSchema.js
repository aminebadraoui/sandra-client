import { z } from "zod";

const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(10, "Password should be at least 10 characters"),
    confirmPassword: z.string()
}).refine(data => { return data.password === data.confirmPassword },
    {
        message: "Passwords must match",
        path: ["confirmPassword"]

    })

export { signUpSchema }