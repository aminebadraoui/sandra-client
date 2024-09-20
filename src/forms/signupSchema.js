import { z } from "zod";

const signUpSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(10, "Password should be at least 10 characters"),
    confirmPassword: z.string(),
    role: z.enum(["organizer", "serviceProvider"], {
        required_error: "Please select a role",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

export { signUpSchema };