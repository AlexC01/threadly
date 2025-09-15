"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { useId } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { type SignUpFormData, signUpSchema } from "@/lib/schemas/userSchema";

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });
	const userNameInput = useId();
	const userNameError = useId();
	const passwordInput = useId();
	const emailInput = useId();
	const emailError = useId();
	const passwordError = useId();

	const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
		console.log("entro");
		console.log(data);
	};

	return (
		<Card className="min-w-lg mt-2 px-8">
			<CardHeader className="text-center">
				<CardTitle className="text-3xl">Create Account</CardTitle>
				<CardDescription className="text-muted-foreground mt-1">
					Fill the form below in order to create an account
				</CardDescription>
			</CardHeader>

			<div className="px-12">
				<Separator />
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="px-6 mb-4">
				<div className="mb-3">
					<Label htmlFor={userNameInput}>Username</Label>
					<Input
						placeholder="johndoe"
						type="string"
						id={userNameInput}
						className="mb-3 mt-2 placeholder:text-gray-400"
						{...register("username")}
						aria-describedby={userNameError}
					/>
					<p
						className="text-xs text-red-400 h-3 flex gap-1 font-bold"
						role="alert"
						id={userNameError}
					>
						{errors.username && (
							<>
								<CircleX size={15} />
								{errors.username.message}
							</>
						)}
					</p>
				</div>
				<div className="mb-3">
					<Label htmlFor={emailInput}>Email</Label>
					<Input
						placeholder="loremipsum@example.com"
						type="email"
						id={emailInput}
						className="mb-3 mt-2 placeholder:text-gray-400"
						{...register("email")}
						aria-describedby={emailError}
					/>
					<p
						className="text-xs text-red-400 h-3 flex gap-1 font-bold"
						role="alert"
						id={emailError}
					>
						{errors.email && (
							<>
								<CircleX size={15} />
								{errors.email.message}
							</>
						)}
					</p>
				</div>
				<div className="mb-3">
					<Label htmlFor={passwordInput}>Password</Label>
					<Input
						type="password"
						placeholder="test123"
						id={passwordInput}
						className="mb-3 mt-2 placeholder:text-gray-400"
						{...register("password")}
						aria-describedby={passwordError}
					/>
					<p
						className="text-xs text-red-400 h-3 flex gap-1 font-bold"
						role="alert"
						id={passwordError}
					>
						{errors.password && (
							<>
								<CircleX size={15} />
								{errors.password.message}
							</>
						)}
					</p>
				</div>
				<Input
					type="submit"
					value="Submit"
					className="cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
				/>
			</form>
		</Card>
	);
};

export default SignUp;
