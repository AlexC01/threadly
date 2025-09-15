"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const AccountLayout = () => {
	const [tabValue, setTabValue] = useState("login");
	return (
		<div className="flex items-center justify-center h-full">
			<Tabs value={tabValue} onValueChange={(value) => setTabValue(value)}>
				<TabsList className="px-4 py-8 space-x-2">
					<TabsTrigger
						value="login"
						className="px-4 py-5 text-lg font-bold cursor-pointer"
					>
						Log In
					</TabsTrigger>
					<TabsTrigger
						value="signup"
						className="px-4 py-5 text-lg font-bold cursor-pointer"
					>
						Sign Up
					</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<LogIn />
				</TabsContent>
				<TabsContent value="signup">
					<SignUp />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AccountLayout;
