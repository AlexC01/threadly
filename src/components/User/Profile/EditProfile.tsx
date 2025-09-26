"use client";

import { CircleX, LoaderCircle, SquarePen } from "lucide-react";
import { useActionState, useId, useState } from "react";
import updateUserProfile from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: any = { errors: null, success: false };

interface EditProfileProps {
	initialUsername: string;
	initialFirstName: string;
	initialLastName: string;
}

const EditProfile = ({
	initialUsername,
	initialFirstName,
	initialLastName,
}: EditProfileProps) => {
	const [openModal, setOpenModal] = useState(false);
	const [state, formAction, pending] = useActionState(
		updateUserProfile,
		initialState,
	);
	const firstName = useId();
	const lastName = useId();
	const username = useId();

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button size="icon" className="absolute -top-2 right-5">
					<SquarePen />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you are done.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction}>
					<div className="mb-4">
						<Label htmlFor={username}>Username</Label>
						<Input
							placeholder="johndoe"
							type="text"
							name="username"
							id={username}
							className="mb-2 mt-2 placeholder:text-gray-400"
							defaultValue={
								state.submittedData
									? state.submittedData.username
									: initialUsername
							}
						/>
						<p
							className="text-xs text-red-400 h-3 flex gap-1 font-bold"
							role="alert"
						>
							{state.errors?.fieldErrors?.username && (
								<>
									<CircleX size={15} />
									{state.errors.fieldErrors.username[0]}
								</>
							)}
						</p>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>
							<Label htmlFor={firstName}>First Name</Label>
							<Input
								placeholder="John"
								type="text"
								defaultValue={
									state.submittedData
										? state.submittedData.firstName
										: initialFirstName
								}
								name="firstName"
								id={firstName}
								className="mb-3 mt-2 placeholder:text-gray-400"
							/>
							<p
								className="text-xs text-red-400 h-3 flex gap-1 font-bold"
								role="alert"
							>
								{state.errors?.fieldErrors?.firstName && (
									<>
										<CircleX size={15} />
										{state.errors.fieldErrors.firstName[0]}
									</>
								)}
							</p>
						</div>
						<div>
							<Label htmlFor={lastName}>Last Name</Label>
							<Input
								placeholder="Doe"
								type="text"
								id={lastName}
								defaultValue={
									state.submittedData
										? state.submittedData.lastName
										: initialLastName
								}
								name="lastName"
								className="mb-3 mt-2 placeholder:text-gray-400"
							/>
							<p
								className="text-xs text-red-400 h-3 flex gap-1 font-bold"
								role="alert"
							>
								{state.errors?.fieldErrors?.lastName && (
									<>
										<CircleX size={15} />
										{state.errors.fieldErrors.lastName[0]}
									</>
								)}
							</p>
						</div>
					</div>
					<DialogFooter className="mt-3">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" disabled={pending}>
							Save Changes{" "}
							{pending && <LoaderCircle className="animate-spin" />}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfile;
