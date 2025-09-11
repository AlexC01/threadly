"use client";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import type { ThreadCommentsType } from "@/lib/Models/BaseModels";
import { TiptapEditor } from "../RichTextEditor";
import { Button } from "../ui/button";

interface ThreadCommentsProps {
	comment_count: number;
	comments: ThreadCommentsType[];
}

const ThreadComments = ({ comments, comment_count }: ThreadCommentsProps) => {
	const [content, setContent] = useState("");

	return (
		<div className="mt-20">
			<div className="flex flex-col gap-4">
				<TiptapEditor
					content={content}
					limit={3000}
					onChange={(newContent: string) => setContent(newContent)}
				/>
				<Button onClick={() => {}} className="self-end">
					Submit Reply
				</Button>
			</div>
			<Separator className="mt-20" />
			<h2 className="mt-4 text-xl font-bold">Replies ({comment_count})</h2>
			{comment_count === 0 && (
				<div className="mt-4 flex justify-center items-center flex-col">
					<h3 className="text-2xl font-semibold text-muted-foreground">
						Be the first to comment
					</h3>
					<p className="mt-4 max-w-md text-center text-muted-foreground">
						Nobody's responded to this post yet. Add your thoughts and get the
						conversation going.
					</p>
				</div>
			)}
		</div>
	);
};

export default ThreadComments;
