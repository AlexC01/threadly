"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
	description: string;
	loading: boolean;
	onClick: () => void;
}

const DeleteModal = ({ description, loading, onClick }: DeleteModalProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="icon">
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle className="text-xl font-bold">
					Are you absolutely sure?
				</AlertDialogTitle>
				<AlertDialogDescription className="text-md text-muted-foreground">
					{description}
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel className="uppercase font-semibold">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onClick}
						className="uppercase font-bold transition-all duration-200"
					>
						Continue
						{loading && <LoaderCircle className="animate-spin" />}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteModal;
