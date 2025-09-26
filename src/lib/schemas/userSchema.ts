import * as z from "zod";

export const signUpSchema = z.object({
	firstName: z.string().nonempty("First name is required"),
	lastName: z.string().nonempty("Last name is required"),
	email: z.email("Please enter a valid email address"),
	username: z.string().min(3, "Username must be at least 3 characters long"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
});

export const logInSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
});

export const profileSchema = z.object({
	firstName: z.string().nonempty("First name is required"),
	lastName: z.string().nonempty("Last name is required"),
	username: z.string().min(3, "Username must be at least 3 characters long"),
});
export type EditUserData = z.infer<typeof profileSchema>;

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LogInFormData = z.infer<typeof logInSchema>;
