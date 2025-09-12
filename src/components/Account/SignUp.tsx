"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignUp = () => {
	return (
		<Card className="min-w-xl mt-2">
			<CardHeader className="text-center">
				<CardTitle className="text-3xl">Create Account</CardTitle>
				<CardDescription className="text-muted-foreground mt-1">
					Fill the form below in order to create an account
				</CardDescription>
			</CardHeader>
			<div className="px-12">
				<Separator />
			</div>
		</Card>
	);
};

export default SignUp;
