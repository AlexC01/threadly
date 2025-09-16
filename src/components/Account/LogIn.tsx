"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, LoaderCircle } from "lucide-react";
import { useId, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { type LogInFormData, logInSchema } from "@/lib/schemas/userSchema";
import { supabase } from "@/lib/supabase/client";

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
		if (loading) return;
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithPassword({
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
		<Card className="mt-2 px-2 xs:min-w-sm sm:px-8 sm:min-w-lg">
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
					disabled={loading}
					className="cursor-pointer w-full flex items-center gap-1 uppercase font-bold"
				>
					Submit
					{loading && <LoaderCircle className="animate-spin" />}
				</Button>
			</form>
		</Card>
	);
};

export default LogIn;
