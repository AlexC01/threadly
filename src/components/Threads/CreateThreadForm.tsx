"use client";

import type { User } from "@supabase/supabase-js";
import { CircleQuestionMark, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import routes from "@/lib/routes";
import { supabase } from "@/lib/supabase/client";
import { TiptapEditor } from "../RichTextEditor";

interface CreateThreadFormProps {
	currentUser: User | null;
}

const CreateThreadForm = ({ currentUser }: CreateThreadFormProps) => {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [content, setContent] = useState("");
	const titleId = useId();
	const isAnonymousId = useId();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (title === "" || content.replace(/<.+?>/g, "").trim() === "") return;

		setLoading(true);

		const slug = title
			.toLowerCase()
			.trim()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]+/g, "");

		const data: {
			title: string;
			content: string;
			user_id: string | null;
			slug: string;
		} = {
			title,
			content,
			slug,
			user_id: null,
		};

		if (!isAnonymous && currentUser) data.user_id = currentUser.id;

		try {
			await supabase.from("threads").insert(data);
			toast.success("Thread posted successfully");
			router.replace(`${routes.thread}/${slug}`);
		} catch (err) {
			console.error(err);
			toast.error("Error posting the tread, please try again later");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="px-2 md:px-12 pb-10">
			<div className="flex justify-between items-center flex-wrap">
				<h2 className="font-bold text-xl">New Thread</h2>
				{currentUser && (
					<div className="flex items-center space-x-2">
						<Label htmlFor={isAnonymousId}>Post Anonymously</Label>
						<Switch
							id={isAnonymousId}
							checked={isAnonymous}
							className="cursor-pointer"
							onCheckedChange={() => setIsAnonymous((prevValue) => !prevValue)}
						/>
						<Tooltip>
							<TooltipTrigger>
								<CircleQuestionMark />
							</TooltipTrigger>
							<TooltipContent className="max-w-xs text-wrap text-center">
								<p>
									Posting anonymously means this thread will not be linked to
									your account or appear in your post history.
								</p>
							</TooltipContent>
						</Tooltip>
					</div>
				)}
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<Label htmlFor={titleId} className="text-lg font-bold">
						Title
					</Label>
					<Input
						placeholder="An interesting title..."
						type="string"
						id={titleId}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="mb-3 mt-2 placeholder:text-gray-400"
					/>
				</div>
				<div className="mt-6">
					<Label className="text-lg font-bold mb-2">Content</Label>
					<TiptapEditor
						content={content}
						limit={8000}
						big
						onChange={(newContent: string) => setContent(newContent)}
					/>
				</div>
				<Button
					className="uppercase font-bold text-xl flex items-center space-x-2 mt-4 w-full"
					size="lg"
					type="submit"
					disabled={
						content.replace(/<.+?>/g, "").trim() === "" ||
						title.trim() === "" ||
						loading
					}
				>
					Post Thread
					{loading && <LoaderCircle className="animate-spin" />}
				</Button>
			</form>
		</Card>
	);
};

export default CreateThreadForm;
