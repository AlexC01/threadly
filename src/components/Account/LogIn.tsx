"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { useId, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type LogInFormData, logInSchema } from "@/lib/schemas/userSchema";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const LogIn = () => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LogInFormData>({ resolver: zodResolver(logInSchema) });
	const passwordInput = useId();
	const emailInput = useId();
	const emailError = useId();
	const passwordError = useId();

	const onSubmit: SubmitHandler<LogInFormData> = async (values) => {
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			});
			if (error) {
				console.error(error);
				toast.error(error.message ?? "Error while logging in");
			} else {
				toast.success("Logged In Successfully");
			}
		} catch (error) {
			console.error(error);
			toast.error("Error while logging in");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="min-w-lg mt-2 px-8">
			<CardHeader className="text-center">
				<CardTitle className="text-3xl">Welcome Back</CardTitle>
				<CardDescription className="text-muted-foreground mt-1">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>

			<div className="px-12">
				<Separator />
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="px-6 mb-4">
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
					<div className="flex items-center justify-between">
						<Label htmlFor={passwordInput}>Password</Label>
						<a href="/" className="text-xs hover:underline">
							Forgot your password?
						</a>
					</div>
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
				<Button
					type="submit"
					value="Submit"
					className="cursor-pointer w-full active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
				>
					Submit
				</Button>
			</form>
		</Card>
	);
};

export default LogIn;
