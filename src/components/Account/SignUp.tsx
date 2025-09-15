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
import { type SignUpFormData, signUpSchema } from "@/lib/schemas/userSchema";
import { supabase } from "@/lib/supabaseClient";

const SignUp = () => {
	const [loading, setLoading] = useState(false);
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

	const onSubmit: SubmitHandler<SignUpFormData> = async (values) => {
		if (loading) return;
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
				options: {
					data: {
						username: values.username,
					},
				},
			});
			if (error) {
				console.error(error);
				toast.error(error.message ?? "Error while signing up");
			} else {
				console.log(data);
				toast.success(
					"Success! Please check your email to confirm your account.",
				);
			}
		} catch (error) {
			console.error(error);
			toast.error("Error while signing up");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="mt-2 px-2 xs:min-w-sm sm:px-8 sm:min-w-lg">
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
				<Button
					type="submit"
					value="Submit"
					className="cursor-pointer w-full flex items-center gap-1 uppercase font-bold"
				>
					Submit
					{loading && <LoaderCircle className="animate-spin" />}
				</Button>
			</form>
		</Card>
	);
};

export default SignUp;
