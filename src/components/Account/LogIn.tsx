"use client";

import { Form, SubmitHandler, useForm } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AuthFormData, authSchema } from "@/lib/schemas/userSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {zodResolver} from '@hookform/resolvers/zod';

const LogIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthFormData>({resolver: zodResolver(authSchema)});

	const onSubmit: SubmitHandler<AuthFormData> = (data) => console.log(data);

	return (
		<Card className="min-w-xl mt-2 px-8">
			<CardHeader className="text-center">
				<CardTitle className="text-3xl">Welcome Back</CardTitle>
				<CardDescription className="text-muted-foreground mt-1">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<div className="px-12">
				<Separator />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register("email")}
					className="mb-4"
				/>
				{errors.email && (
					<p className="text-xs text-red-400" role="alert">
						{errors.email.message}
					</p>
				)}
				<Input
					{...register("email")}
					className="mb-4"
				/>
				{errors.email && (
					<p className="text-xs text-red-400" role="alert">
						{errors.email.message}
					</p>
				)}
				<Input type="submit" value="Submit" />
			</form>
		</Card>
	);
};

export default LogIn;
